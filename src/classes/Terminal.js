const Server = require('./Server');
const Command = require('./Command');
const fs = require('fs').promises;
const path = require('path');

class Terminal {
    /**
     * 
     * @param {Server} server 
     */
    constructor(server) {
        this.server = server;
        /**
         * @type {Map<string, Command>}
         */
        this.commands = new Map();
    }
    async registerCommands() {
        const filePath = path.join(__dirname, '..', 'commands');
        const files = await fs.readdir(filePath);
        for await (const file of files) {
            if (file.endsWith('.js')) {
                const cmd = require(path.join(filePath, file));
                if (cmd.prototype instanceof Command) {
                    const instance = new cmd(this);
                    this.server.logger.info(`Command - ${instance.commandName}`, 'Server');
                    this.commands.set(instance.commandName, instance);
                }
            }
        }
    }
    async initiate() {
        await this.registerCommands();
        this.cli = readline.createInterface({ input: process.stdin, output: process.stdout });
        this.cli.on('line', async (message) => {
            const args = message.split(/ +/g);
            const commandName = args.shift().toLowerCase();
            const command = this.commands.get(commandName);
            if (!command) return this.server.logger.error(`Command not found!`, 'Server');
            await command.run(args).catch((e) => {
                this.server.logger.error(e, 'Server');
            });
        });
    }
}

module.exports = Terminal;