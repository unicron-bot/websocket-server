const { Sequelize, DataTypes } = require('sequelize');
/**
 * @param {Sequelize} sequelize
 * @param {DataTypes} DataType
 */
module.exports = (sequelize, DataType) => {
    return sequelize.define('settings', {
        guild_id: {
            type: DataType.STRING,
            unique: true,
            primaryKey: true,
        },
        prefix: {
            type: DataType.STRING,
            allowNull: false,
            defaultValue: '?',
        },
        premium: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        data: {
            type: DataType.JSON,
            allowNull: false,
            defaultValue: {},
        }
    }, {
        timestamps: false,
    });
}