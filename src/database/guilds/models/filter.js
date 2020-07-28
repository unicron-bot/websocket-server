const { Sequelize, DataTypes } = require('sequelize');
/**
 * @param {Sequelize} sequelize
 * @param {DataTypes} DataType
 */
module.exports = (sequelize, DataType) => {
    return sequelize.define('filter', {
        guild_id: {
            type: DataType.STRING,
            primaryKey: true,
            unique: true,
        },
        inviteFilter: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        swearFilter: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        mentionSpamFilter: {
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