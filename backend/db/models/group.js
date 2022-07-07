'use strict';
const { Model, } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      Group.belongsTo(
        models.User,
        { foreignKey: 'organizerId', hooks: true, as: 'organizer', }
      )
      Group.belongsToMany(
        models.User,
        { through: 'Members', as: 'members', }
      )
      Group.hasMany(
        models.Member,
        { foreignKey: 'groupId', onDelete: 'CASCADE', hooks: true, as: 'memberships', }
      )
      Group.hasMany(
        models.Image,
        { foreignKey: 'groupId', onDelete: 'CASCADE', hooks: true, as: 'images', }
      )
    }
  }
  Group.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 60],
      },
    },
    organizerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    about: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 50,
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['In Person', 'Online']],
      },
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    previewImage: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};