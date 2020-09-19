import { Sequelize, DataTypes } from 'sequelize';

function member(sequelize: Sequelize) {
    return sequelize.define('guild_members', {
        guild_id: DataTypes.STRING,
        data: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: [],
        },
    }, {
        timestamps: false,
    })
}

function guild(sequelize: Sequelize) {
    return sequelize.define('guild', {
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
    }, {
        timestamps: false,
    })
}

export default {
    member,
    guild,
}