import { EventEmitter } from 'events';
import { promises as fs } from 'fs';
import path from 'path';
import http from 'http';
import io from 'socket.io';
import Logger from '../utils/Logger';
import express from 'express';
import Database from '../database';
import User from './User';
import Guild from './Guild';
import GuildMember from './Member';

export default class Server extends EventEmitter {
    private http: http.Server;
    public app: express.Application;
    public logger: typeof Logger;
    public db: typeof Database;
    public ws: io.Server;
    public managers: {
        user: (id: string) => Promise<User>;
        guild: (id: string) => Promise<Guild>;
        member: (guild_id: string, member_id: string) => Promise<GuildMember>;
    };
    public constructor() {
        super();
        this.app = express();
        this.logger = Logger;
        this.db = Database;
        this.managers = {
            user: (id: string): Promise<User> => {
                return new Promise(async (resolve, reject) => {
                    const user = new User(this, id);
                    await user.fetch().catch(reject);
                    resolve(user);
                });
            },
            guild: (id: string): Promise<Guild> => {
                return new Promise(async (resolve, reject) => {
                    const guild = new Guild(this, id);
                    await guild.fetch().catch(reject);
                    resolve(guild);
                });
            },
            member: (guild_id: string, member_id: string): Promise<GuildMember> => {
                return new Promise(async (resolve, reject) => {
                    const member = new GuildMember(this, { guild_id, member_id });
                    await member.fetch().catch(reject);
                    resolve(member);
                });
            },
        };
    }
    private async registerRoutes() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use((req, _res, next) => {
            this.logger.info(`${req.method} ${req.path}`);
            if (req.body && Object.keys(req.body).length) this.logger.info(req.body);
            next();
        });
        this.app.get('/', (_req, res) => {
            res.sendStatus(200);
        });
        const filePath = path.join(__dirname, '..', 'routes');
        const files = await fs.readdir(filePath);
        for await (const file of files) {
            if (file.endsWith('.js')) {
                const route = require(path.join(filePath, file));
                const instance = new route.default(this);
                this.logger.info(`Route ${instance.path}`);
                this.app.use(instance.path, instance.createRoute());
            }
        }
        this.app.use((_req, res) => {
            res.sendStatus(404);
        });
    }
    private websocketInit() {
        this.http = http.createServer(this.app);
        this.ws = io(this.http);
        this.ws.on('connection', (socket) => {
            this.logger.info(`[Client ${socket.id}] connected!`);
            socket.emit('raw', 'ready');
            socket.on('disconnect', () => {
                this.logger.info(`[${socket.id}] disconnected`);
            });
        });
    }
    public async listen(port: number) {
        this.websocketInit();
        await this.registerRoutes();
        this.http.listen(port, () => {
            this.logger.info(`WebSocket Database Running on PORT ${port}`);
        });
    }
}