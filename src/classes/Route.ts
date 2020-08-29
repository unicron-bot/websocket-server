const Router = require('express').Router;
class Route {
    server: import('./Server');
    router: import('express').Router;
    path: string;
    /**
     * 
     * @param {import('./Server')} server 
     * @param {string} path 
     */
    constructor(server: import('./Server'), path: string) {
        this.path = path;
        this.server = server;
        this.router = Router();
    }
    createRoute() {
        return this.router;
    }
}

module.exports = Route;