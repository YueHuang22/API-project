'use strict';
const { Model, } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.belongsTo(
        models.Group,
        { foreignKey: 'groupId', as: 'Group', }
      )
      Event.belongsTo(
        models.Venue,
        { foreignKey: 'venueId', as: 'Venue', }
      )
      Event.hasMany(
        models.Image,
        { foreignKey: 'eventId', as: 'Images', }
      )
      Event.hasMany(
        models.Attendee,
        { foreignKey: 'eventId', onDelete: 'CASCADE', hooks: true, as: 'attendees', }
      )
    }
  }
  Event.init({
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['In Person', 'Online']],
      },
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    previewImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};