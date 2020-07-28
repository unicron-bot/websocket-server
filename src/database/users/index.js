const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize('database', process.env.USER_DATABASE_USERNAME, process.env.USER_DATABASE_PASSWORD, {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    transactionType: 'IMMEDIATE',
    storage: `./database/${process.env.USER_DATABASE_FILE}.sqlite`,
    retry: { max: 10 }
});

const UserProfile = require('./models/profile')(db, DataTypes);
const UserInventory = require('./models/inventory')(db, DataTypes);

module.exports = {
    db,
    models: {
        UserProfile,
        UserInventory,
    }
}