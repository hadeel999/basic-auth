'use strict';

const users = (sequelize, DataTypes) =>
    sequelize.define("users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique : true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
          },
              
    },{ 
        sequelize,
        tableName: 'users',
        timestamps: false,
        });

module.exports = users;
