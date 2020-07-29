const mongoose = require('mongoose');

const tag = new mongoose.Schema({
    tag_name: String,
    tag_value: String,
});

const member = new mongoose.Schema({
    member_id: String,
    data: {
        type: String,
        get: (data) => {
            try {
                return JSON.parse(data);
            } catch (err) {
                return data;
            }
        },
        set: (data) => {
            return JSON.stringify(data);
        }
    }
});

const guild = new mongoose.Schema({
    guild_id: {
        type: String,
        unique: true,
    },
    data: {
        type: String,
        get: (data) => {
            try {
                return JSON.parse(data);
            } catch (err) {
                return data;
            }
        },
        set: (data) => {
            return JSON.stringify(data);
        }
    },
    members: [member],
    tags: [tag],
    prefix: {
        type: String,
        default: '-',
    },
    premium: {
        type: Boolean,
        default: false,
    },
    modLogChannel: {
        type: String,
        default: '',
    },
    autoModeration: {
        type: Boolean,
        default: false,
    },
    autoModAction: {
        type: String,
        default: 'MUTE',
    },
    autoModActionExpiresOn: {
        type: Number,
        default: 0,
    },
    maxWarnThreshold: {
        type: Number,
        default: 0,
    },
    warnThresholdAction: {
        type: String,
        default: 'MUTE',
    },
    warnActionExpiresOn: {
        type: Number,
        default: 0,
    },
    welcomeChannel: {
        type: String,
        default: '',
    },
    welcomeMessage: {
        type: String,
        default: '{user} has joined the server!',
    },
    welcomeEnabled: {
        type: Boolean,
        default: false,
    },
    farewellChannel: {
        type: String,
        default: '',
    },
    farewellMessage: {
        type: String,
        default: '{user} has left the server.',
    },
    farewellEnabled: {
        type: Boolean,
        default: false,
    },
    verificationChannel: {
        type: String,
        default: '',
    },
    verificationRole: {
        type: String,
        default: '',
    },
    verificationType: {
        type: String,
        default: 'discrim'
    },
    verificationEnabled: {
        type: Boolean,
        default: false,
    },
    ticketCategory: {
        type: String,
        default: '',
    },
    ticketEnabled: {
        type: Boolean,
        default: false,
    },
    dynamicCategory: {
        type: String,
        default: '',
    },
    dynamicRoom: {
        type: String,
        default: '',
    },
    dynamicEnabled: {
        type: Boolean,
        default: false,
    },
    inviteFilter: {
        type: Boolean,
        default: false,
    },
    swearFilter: {
        type: Boolean,
        default: false,
    },
    mentionSpamFilter: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('Guild', guild);