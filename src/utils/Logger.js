const chalk = require('chalk');
const moment = require('moment');

function timestamp(thread, type) {
    return `[${moment().format('YYYY-MM-DD HH:mm:ss')}] [${thread} Thread/${type}]`;
}

module.exports = {
    /**
     * 
     * @param {any} contents 
     * @param {"Server"|"Client"} thread 
     */
    info: function (contents, thread = 'Server') {
        console.log(`${timestamp(thread, chalk.black.bgWhite('INFO'))} : ${contents}`);
    },
    /**
     * 
     * @param {any} contents 
     * @param {"Server"|"Client"} thread 
     */
    error: function (contents, thread = 'Server') {
        console.log(`${timestamp(thread, chalk.black.bgRed('ERROR'))} : `);
        console.log(contents);
    },
    /**
     * 
     * @param {any} contents 
     * @param {"Server"|"Client"} thread 
     */
    warn: function (contents, thread = 'Server') {
        console.log(`${timestamp(thread, chalk.black.bgYellow('WARNING'))} : `);
        console.log(contents);
    },
    /**
     * 
     * @param {any} contents 
     * @param {"Server"|"Client"} thread 
     */
    debug: function (content, thread = 'Server') {
        console.log(`${timestamp(thread, chalk.black.bgGreen('DEBUG'))} : ${contents}`);
    }
}