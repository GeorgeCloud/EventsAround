'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rsvp extends Model {
    static associate(models) {
      Rsvp.associate = function(models) {
        Rsvp.belongsTo(models.Event);
        Rsvp.belongsTo(models.User);
      };
    }
  }
  Rsvp.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    event_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rsvp',
  });
  return Rsvp;
};
