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
const Database = require('../database/');
const UserManager = require('../managers/UserManager');
const GuildManager = require('../managers/GuildManager');

class Server extends EventEmitter {
    constructor() {
        super();
        this.logger = Logger;
        this.terminal = new Terminal(this);
        this.app = express();
        this.http = http.createServer(this.app);
        this.db = Database;
        this.users = new UserManager(this);
        this.guilds = new GuildManager(this);
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
        await this.terminal.initiate();
        this.http.listen(port);
    }
}

module.exports = Server;