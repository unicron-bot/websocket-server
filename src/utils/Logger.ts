const chalk = require('chalk');
const moment = require('moment');

/**
 * 
 * @param {string} thread 
 * @param {string} type 
 */
function timestamp(thread: string, type: any) {
    return `[${moment().format('YYYY-MM-DD HH:mm:ss')}] [${thread} Thread |${type}]`;
}

module.exports = {
    /**
     * 
     * @param {any} contents 
     * @param {"Server"|"Client"} thread 
     */
    info: function (contents: any, thread: "Server" | "Client" = 'Server') {
        console.log(`${timestamp(thread, chalk.black.bgWhite('INFO'))} : ${contents}`);
    },
    /**
     * 
     * @param {any} contents 
     * @param {"Server"|"Client"} thread 
     */
    error: function (contents: any, thread: "Server" | "Client" = 'Server') {
        console.log(`${timestamp(thread, chalk.black.bgRed('ERROR'))} : ${contents}`);
    },
    /**
     * 
     * @param {any} contents 
     * @param {"Server"|"Client"} thread 
     */
    warn: function (contents: any, thread: "Server" | "Client" = 'Server') {
        console.log(`${timestamp(thread, chalk.black.bgYellow('WARNING'))} : ${contents}`);
    },
    /**
     * 
     * @param {any} contents 
     * @param {"Server"|"Client"} thread 
     */
    debug: function (contents: any, thread: "Server" | "Client" = 'Server') {
        console.log(`${timestamp(thread, chalk.black.bgGreen('DEBUG'))} : ${contents}`);
    }
}