import chalk from 'chalk';
import moment from 'moment';

function timestamp(thread: string, type: any) {
    return `[${moment().format('YYYY-MM-DD HH:mm:ss')}] [${thread} Thread |${type}]`;
}

export default {
    info: function (contents: any, thread: "Server" | "Client" = 'Server') {
        console.log(`${timestamp(thread, chalk.black.bgWhite('INFO'))} : ${contents}`);
    },
    error: function (contents: any, thread: "Server" | "Client" = 'Server') {
        console.log(`${timestamp(thread, chalk.black.bgRed('ERROR'))} : ${contents}`);
    },
    warn: function (contents: any, thread: "Server" | "Client" = 'Server') {
        console.log(`${timestamp(thread, chalk.black.bgYellow('WARNING'))} : ${contents}`);
    },
    debug: function (contents: any, thread: "Server" | "Client" = 'Server') {
        console.log(`${timestamp(thread, chalk.black.bgGreen('DEBUG'))} : ${contents}`);
    }
}