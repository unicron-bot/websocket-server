const Command = require('../classes/Command');

class Auth extends Command {
    constructor(server) {
        super(server, 'auth', {});
    }
    /**
     * @param {Array<string>} args 
     */
    run(args) {
        
    }
}

module.exports = Auth;