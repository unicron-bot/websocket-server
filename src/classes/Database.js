
const { Sequelize } = require('sequelize');

class Database extends Sequelize {
    /**
     * 
     * @param {Object} options 
     * @param {string} options.name
     * @param {string} options.username
     * @param {string} options.password
     * @param {string} options.file
     */
    constructor(options) {
        super('database', options.username, options.password, {
            host: 'localhost',
            dialect: 'sqlite',
            transactionType: 'IMMEDIATE',
            logging: false,
            storage: `./database/${options.file}.sqlite`,
            retry: {
                max: 10,
            }
        });
    }
}

module.exports = Database;