class Command {
    /**
     * 
     * @param {import('./Server')} server
     * @param {string} commandName 
     * @param {{}} options 
     */
    constructor(server, commandName, options) {
        this.server = server
        this.commandName = commandName;
        this.options = options;
    }
    /**
     * 
     * @param {Array<string>} args 
     */
    async run(args) {}
}
module.exports = Command;