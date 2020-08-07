const { EventEmitter } = require('events');
const Logger = require('../utils/Logger');
const express = require('express');
const helmet = require('helmet');
const fs = require('fs').promises;
const path = require('path');
const http = require('http');
const io = require('socket.io');
const Route = require('./Route');
const Database = require('../database/');

const User = require('./User');
const Guild = require('./Guild');
const GuildMember = require('./Member');
const GuildTag = require('./Tag');

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
            user: (id) => {
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
            guild: (id) => {
                return new Promise(async (resolve, reject) => {
                    const guild = new Guild(this, id);
                    await guild.fetch().catch(reject);
                    resolve(guild);
                });
            },
            /**
             * @returns {Promise<GuildMember>}
             * @param {string} guild_id
             * @param {string} guild_id
             */
            member: (guild_id, member_id) => {
                return new Promise(async (resolve, reject) => {
                    const member = new GuildMember(this, { guild_id, member_id });
                    await member.fetch().catch(reject);
                    resolve(member);
                });
            },
            /**
             * @returns {Promise<GuildTag>}
             * @param {string} guild_id
             * @param {string} tag_name
             * @param {boolean} createIfNotExist
             */
            tag: (guild_id, tag_name, createIfNotExist) => {
                return new Promise(async (resolve, reject) => {
                    const tag = new GuildTag(this, { guild_id, tag_name });
                    await tag.fetch(createIfNotExist).catch(reject);
                    resolve(tag);
                });
            }
        }
    }
    async registerRoutes() {
        this.app.use(helmet());
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
                    this.logger.info(`Route ${instance.path}`, 'Server');
                    this.app.use(instance.path, instance.createRoute());
                }
            }
        }
        this.app.use((req, res) => {
            res.status(404).json({ message: 'Not found :P', status: 404 });
        });
    }
    websocketInit() {
        this.http = http.createServer(this.app);
        this.ws = io(this.http, {
            transports: ['websocket'],
        });
        this.ws.on('connection', (socket) => {
            require('../helper/client')(this, socket);
        });
    }
    async listen(port) {
        this.websocketInit();
        await this.registerRoutes();
        this.http.listen(port, () => {
            this.logger.info(`WebSocket Database Running on PORT ${port}`);
        });
    }
}

module.exports = Server;