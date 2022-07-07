'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendee extends Model {
    static associate(models) {
    }
  }
  Attendee.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['member', 'waitlist', 'pending']],
      },
    },
  }, {
    sequelize,
    modelName: 'Attendee',
  });
  return Attendee;
};