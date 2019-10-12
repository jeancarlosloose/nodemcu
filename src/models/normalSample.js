'use strict';
module.exports = (sequelize, DataTypes) => {
  const normalSample = sequelize.define('normalSample', {
    temperature: DataTypes.FLOAT,
    gas: DataTypes.INTEGER
  }, {});
  normalSample.associate = function(models) {
    // associations can be defined here
  };
  return normalSample;
};