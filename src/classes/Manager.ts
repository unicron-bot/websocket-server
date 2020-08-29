import Server from './Server';
export default class Manager {
    protected server: Server;
    constructor(server: Server) {
        this.server = server;
    }
}