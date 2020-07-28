const Router = require('express').Router;
const Server = require('./Server');
class Route {
    /**
     * 
     * @param {Server} server 
     * @param {string} path 
     */
    constructor(server, path) {
        this.path = path;
        this.server = server;
        this.router = Router();
    }
    createRoute() {
        return this.router;
    }
}

module.exports = Route;