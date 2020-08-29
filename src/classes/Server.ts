const { EventEmitter } = require('events');
const Logger = require('../utils/Logger');
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const http = require('http');
const io = require('socket.io');
const Route = require('./Route');
const Database = require('../database/');
const User = require('./User');
const Guild = require('./Guild');
const GuildMember = require('./Member');

class Server extends EventEmitter {
    constructor() {
        super();
        this.logger = Logger;
        this.app = express();
        this.db = Database;
        this.managers = {
            /**
             * @returns {Promise<User>}
             * @param {string} id
             */
            user: (id: string): Promise<typeof User> => {
                return new Promise(async (resolve, reject) => {
                    const user = new User(this, id);
                    await user.fetch().catch(reject);
                    resolve(user);
                });
            },
            /**
             * @returns {Promise<Guild>}
             * @param {string} id
             */
            guild: (id: string): Promise<typeof Guild> => {
                return new Promise(async (resolve, reject) => {
                    const guild = new Guild(this, id);
                    await guild.fetch().catch(reject);
                    resolve(guild);
                });
            },
            /**
             * @returns {Promise<GuildMember>}
             * @param {string} guild_id
             * @param {string} member_id
             */
            member: (guild_id: string, member_id: string): Promise<typeof GuildMember> => {
                return new Promise(async (resolve, reject) => {
                    const member = new GuildMember(this, { guild_id, member_id });
                    await member.fetch().catch(reject);
                    resolve(member);
                });
            },
        }
    }
    async registerRoutes() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use((req: { ip: string; method: any; path: any; }, res: any, next: () => void) => {
            this.logger.info(`${req.ip.replace('::ffff:', '')} ${req.method} ${req.path}`, 'Client');
            next();
        });
        this.app.get('/', (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; status: number; }): void; new(): any; }; }; }) => {
            res.status(200).json({ message: 'Hello World', status: 200 });
        });
        const filePath = path.join(__dirname, '..', 'routes');
        const files = await fs.readdir(filePath);
        for await (const file of files) {
            if (file.endsWith('.js')) {
                const route = require(path.join(filePath, file));
                if (route.prototype instanceof Route) {
                    const instance = new route(this);
                    this.logger.info(`Route ${instance.path}`, 'Server');
                    this.app.use(instance.path, instance.createRoute());
                }
            }
        }
        this.app.use((req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; status: number; }): void; new(): any; }; }; }) => {
            res.status(404).json({ message: 'Not found :P', status: 404 });
        });
    }
    websocketInit() {
        this.http = http.createServer(this.app);
        this.ws = io(this.http);
        this.ws.on('connection', (socket: { id: any; emit: (arg0: string, arg1: string) => void; on: (arg0: string, arg1: { (): void; (err: any): void; }) => void; }) => {
            this.logger.info(`[Client ${socket.id}] connected!`, 'Client');
            socket.emit('raw', 'ready');
            socket.on('disconnect', () => {
                this.logger.info(`[${socket.id}] disconnected`, 'Client');
            });
            socket.on('error', (err: any) => {
                this.logger.error(err, 'Client');
            });
        });
    }
    async listen(port: any) {
        this.websocketInit();
        await this.registerRoutes();
        this.http.listen(port, () => {
            this.logger.info(`WebSocket Database Running on PORT ${port}`);
        });
    }
}

module.exports = Server;