import { Sequelize, DataTypes } from 'sequelize';

function member(sequelize: Sequelize) {
    return sequelize.define('guild_member', {
        guild_id: DataTypes.STRING,
        member_id: DataTypes.STRING,
        data: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: {},
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
        prefix: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '-',
        },
        premium: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        modLogChannel: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        autoModeration: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        autoModAction: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'MUTE',
        },
        autoModDuration: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        warnThreshold: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        warnThresholdAction: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'MUTE',
        },
        warnActionDuration: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        welcomeChannel: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        welcomeMessage: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '{user} has joined the server!',
        },
        welcomeEnabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        farewellChannel: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        farewellMessage: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '{user} has left the server.',
        },
        farewellEnabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        verificationChannel: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        verificationType: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'discrim',
        },
        verificationRole: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        verificationEnabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        ticketCategory: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        ticketEnabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        dynamicCategory: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        dynamicRoom: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        dynamicEnabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        inviteFilter: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        swearFilter: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        mentionSpamFilter: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        timestamps: false,
    })
}

export default {
    member,
    guild,
}