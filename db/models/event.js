'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.associate = function(models) {
        Event.hasMany(models.Rsvp);
      };
    }
  }
  Event.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    image_url: DataTypes.TEXT,
    organization_name: DataTypes.STRING,
    date: DataTypes.STRING,
    time: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
