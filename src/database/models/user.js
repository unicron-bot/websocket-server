const mongoose = require('mongoose');

const inventory = new mongoose.Schema({
    item_id: {
        type: String,
    },
    amount: {
        type: Number,
        default: 0,
    }
})

const user = new mongoose.Schema({
    id: {
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
    balance: {
        type: Number,
        default: 0,
    },
    multiplier: {
        type: Number,
        default: 0,
    },
    experience: {
        type: Number,
        default: 0,
    },
    married_id: {
        type: String,
        default: '',
    },
    multiplier: {
        type: Number,
        default: 0,
    },
    inventory: [inventory],
});

module.exports = mongoose.model('User', user);