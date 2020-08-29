class Manager {
    protected server: import('./Server');
    /**
     * @param {import('./Server')} server
     */
    constructor(server: import('./Server')) {
        this.server = server;
    }
}

module.exports = Manager;