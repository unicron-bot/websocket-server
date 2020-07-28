const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize('database', process.env.GUILD_DATABASE_USERNAME, process.env.GUILD_DATABASE_PASSWORD, {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    transactionType: 'IMMEDIATE',
    storage: `./database/${process.env.GUILD_DATABASE_FILE}.sqlite`,
    retry: { max: 10 }
});

const GuildSettings = require('./models/settings')(db, DataTypes);
const GuildModeration = require('./models/moderation')(db, DataTypes);
const GuildWelcome = require('./models/welcome')(db, DataTypes);
const GuildLeave = require('./models/leave')(db, DataTypes);
const GuildFilter = require('./models/filter')(db, DataTypes);
const GuildTags = require('./models/tags')(db, DataTypes);
const GuildVerification = require('./models/verification')(db, DataTypes);
const GuildTicket = require('./models/ticket')(db, DataTypes);
const GuildDynamicVoice = require('./models/dynamicVoice')(db, DataTypes);
const GuildMember = require('./models/member')(db, DataTypes);


module.exports = {
    db,
    models: {
        GuildSettings,
        GuildModeration,
        GuildWelcome,
        GuildLeave,
        GuildFilter,
        GuildTags,
        GuildVerification,
        GuildTicket,
        GuildDynamicVoice,
        GuildMember,
    }
}