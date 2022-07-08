'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendee extends Model {
    static associate(models) {
      Attendee.belongsTo(
        models.User,
        { foreignKey: 'userId', as: 'user', }
      )
      Attendee.belongsTo(
        models.Event,
        { foreignKey: 'eventId', as: 'event', }
      )
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
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    },
  });
  return Attendee;
};