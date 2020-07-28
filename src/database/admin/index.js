const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize('database', process.env.UNICRON_DATABASE_USERNAME, process.env.UNICRON_DATABASE_PASSWORD, {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    transactionType: 'IMMEDIATE',
    storage: `./database/${process.env.UNICRON_DATABASE_FILE}.sqlite`,
    retry: { max: 10 }
});

const Admin = require('./model')(db, DataTypes);

module.exports = {
    db,
    models: {
        Admin,
    }
}