import { Sequelize, DataTypes } from 'sequelize';

export default function user(sequelize: Sequelize) {
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
    }, {
        timestamps: false,
    });
}