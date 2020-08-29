import { Sequelize, Transaction } from 'sequelize';
import Logger from '../utils/Logger';

const db = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: './database/db.sqlite',
    transactionType: Transaction.TYPES.IMMEDIATE,
    retry: { max: 10 },
});

import g from './models/guild';
import user from './models/user';

const User = user(db);
const Guild = g.guild(db);
const GuildMember = g.member(db);

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

export default {
    db,
    models: {
        User, Guild, GuildMember
    }
}