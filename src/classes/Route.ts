import Server from './Server';
import { Router } from 'express';

export default class Route {
    server: Server;
    router: Router;
    path: string;
    constructor(server: Server, path: string) {
        this.path = path;
        this.server = server;
        this.router = Router();
    }
    createRoute() {
        return this.router;
    }
}