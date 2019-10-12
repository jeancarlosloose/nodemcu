'use strict';
module.exports = (sequelize, DataTypes) => {
  const unNormalSample = sequelize.define('unNormalSample', {
    temperature: DataTypes.FLOAT,
    gas: DataTypes.INTEGER
  }, {});
  unNormalSample.associate = function(models) {
    // associations can be defined here
  };
  return unNormalSample;
};