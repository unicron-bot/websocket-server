const Logger = require('../utils/Logger');
const mongoose = require('mongoose');
const Table = require('./models/table');
const User = require('./models/user');
const Guild = require('./models/guild');

mongoose.connect(process.env.DATABASE_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsAllowInvalidCertificates: true,
}, (err) => {
    if (err) {
        Logger.error(err, 'Server');
        process.exit(1);
    }
});

mongoose.connection.on('disconnected', () => {
    Logger.warn(`Database Disconnection`, 'Server');
});

mongoose.connection.on('reconnect', () => {
    Logger.info(`Database Reconnecting...`, 'Server');
});

mongoose.connection.on('connected', () => {
    Logger.info(`Database Connection Establised!`, 'Server');
});

mongoose.connection.on('reconnectFailed', () => {
    Logger.error(`Database Reconnection failed`, 'Server');
    process.exit(1);
})

module.exports = {
    Table,
    User,
    Guild,
}