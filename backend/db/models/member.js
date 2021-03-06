'use strict';
const { Model, } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate(models) {
      Member.belongsTo(
        models.Group,
        { foreignKey: 'groupId', as: 'group', }
      )
      Member.belongsTo(
        models.User,
        { foreignKey: 'userId', as: 'user', }
      )
    }
  }
  Member.init({
    groupId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Group',
        key: 'id',
      },
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['co-host', 'member', 'pending']],
      },
    },
  }, {
    sequelize,
    modelName: 'Member',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    },
  });
  return Member;
};