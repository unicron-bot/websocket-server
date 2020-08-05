const { DataTypes } = require('sequelize');

/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 */
function user(sequelize) {
    return sequelize.define('user', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
        },
        data: { 
            type: DataTypes.JSON, 
            allowNull: false,
            defaultValue: {},
        },
        inventory: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: [],
        },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        experience: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }, 
        multiplier: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        marriage_id: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        }
    }, {
        timestamps: false,
    })
}

module.exports = user;