const { Sequelize, DataTypes } = require('sequelize');
/**
 * @param {Sequelize} sequelize
 * @param {DataTypes} DataType
 */
module.exports = (sequelize, DataType) => {
    return sequelize.define('user_inventory', {
        user_id: DataType.STRING,
        item_id: DataType.STRING,
        amount: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    }, {
        timestamps: false,
    })
}