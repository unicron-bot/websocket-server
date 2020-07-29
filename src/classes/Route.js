const Router = require('express').Router;
class Route {
    /**
     * 
     * @param {import('./Server')} server 
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