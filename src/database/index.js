const { Sequelize } = require('sequelize');
const Logger = require('../utils/Logger');

const db = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: './database/db.sqlite',
    transactionType: 'IMMEDIATE',
    retry: { max: 10 },
});

const { guild, tag, member } = require('./models/guild');

const User = require('./models/user')(db);
const Guild = guild(db);
const GuildTag = tag(db);
const GuildMember = member(db);

(async function () {
    if (process.argv.includes('--dbInit')) {
        await db.sync({ force: true }).then(() => {
            Logger.info('Database has been dropped!');
        }).catch(Logger.error);
    }
    await db.authenticate().catch((e) => {
        Logger.error(e);
        process.exit(1);
    });
})();

module.exports = {
    db,
    models: {
        User, Guild, GuildTag, GuildMember
    }
}