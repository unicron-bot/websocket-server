const { EventEmitter } = require('events');
const Logger = require('../utils/Logger');
const express = require('express');
const helmet = require('helmet');
const fs = require('fs').promises;
const path = require('path');
const http = require('http');
const io = require('socket.io');
const Authorization = require('../middlewares/Authorization');
const Terminal = require('./Terminal');
const Route = require('./Route');
const BaseEvent = require('./Event');

class Server extends EventEmitter {
    constructor() {
        super();
        this.logger = Logger;
        this.terminal = new Terminal(this);
        this.app = express();
        this.http = http.createServer(app);
    }
    async registerRoutes() {
        this.app.use(helmet());
        this.app.use(Authorization.API);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.get('/', (req, res) => {
            res.status(200).json({ message: 'Hello World', status: 200 });
        });
        const filePath = path.join(__dirname, '..', 'routes');
        const files = await fs.readdir(filePath);
        for await (const file of files) {
            if (file.endsWith('.js')) {
                const route = require(path.join(filePath, file));
                if (route.prototype instanceof Route) {
                    const instance = new route(this);
                    this.logger.info(`Route - ${instance.path}`, 'Server');
                    this.app.use(instance.path, instance.createRoute());
                }
            }
        }
        this.app.use((req, res) => {
            res.status(404).json({ message: 'Not found :P', status: 404 });
        });
    }
    async registerEvents() {
        const filePath = path.join(__dirname, '..', 'events');
        const files = await fs.readdir(filePath);
        for await (const file of files) {
            if (file.endsWith('.js')) {
                const Event = require(path.join(filePath, file));
                if (route.prototype instanceof BaseEvent) {
                    const instance = new Event(this);
                    this.logger.info(`Event - ${instance.eventName}`, 'Server');
                    this.on(instance.eventName, (...args) => instance.emit(...args));
                }
                delete require.cache[require.resolve(path.join(filePath, file))];
            }
        }
    }
    websocketInit() {
        this.ws = io(http);
        this.ws.use(Authorization.WebSocket);
        this.ws.on('connection', (socket) => {
            this.logger.info(`[Client ${socket.id}] connected!`, 'Client');
            require('../helper/client')(this, socket);
        });
    }
    async listen(port) {
        this.websocketInit();
        await this.registerRoutes();
        await this.registerEvents();
        await this.terminal.initiate();
        this.http.listen(port);
    }
}

module.exports = Server;