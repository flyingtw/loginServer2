'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt:{
      type: DataTypes.STRING
    },
  },{
    underscored: true,
    freezeTableName: true,
    tableName: "users",
    timestamps: false
  });

  return user;
};