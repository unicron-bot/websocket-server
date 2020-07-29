class Manager {
    /**
     * @param {import('./Server')} server
     */
    constructor(server) {
        this.server = server;
    }
}

module.exports = Manager;