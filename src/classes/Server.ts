import { EventEmitter } from 'events';
import { promises as fs } from 'fs';
import path from 'path';
import http from 'http';
import io from 'socket.io';
import Logger from '../utils/Logger';
import express from 'express';

export default class Server extends EventEmitter {
    private http: http.Server;
    public app: express.Application;
    public logger: typeof Logger;
    public ws: io.Server;
    private sessions: string[];
    public constructor() {
        super();
        this.app = express();
        this.logger = Logger;
        this.sessions = [];
    }
    private async registerRoutes() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.get('/', (_req, res) => {
            res.sendStatus(200);
        });
        this.app.use((req, res, next) => {
            const Authorization = req.headers.authorization;
            if (Authorization && this.sessions.includes(Authorization)) return next();
            res.status(403).json({
                MESSAGE: 'FORBIDDEN ENTRY',
                STATUS: 403,
            });
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
            this.logger.info(`[${socket.id}] connected!`);
            this.sessions.push(socket.id);
            socket.emit('raw', { EVENT: 'READY', data: { session: socket.id } });
            socket.on('disconnect', () => {
                this.logger.info(`[${socket.id}] disconnected`);
                this.sessions = this.sessions.filter(s => s !== socket.id);
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