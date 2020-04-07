'use strict';
module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('Record', {
    name: DataTypes.STRING,
    merchant: DataTypes.STRING,
    category: DataTypes.STRING,
    date: DataTypes.DATE,
    amount: DataTypes.INTEGER
  }, {});
  Record.associate = function(models) {
    // associations can be defined here
  };
  return Record;
};