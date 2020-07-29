
const mongoose = require('mongoose');

const table = new mongoose.Schema({
    table: {
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
    }
});

module.exports = mongoose.model('Table', table);