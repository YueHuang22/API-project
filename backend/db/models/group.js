'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.belongsTo(
        models.User,
        { foreignKey: 'organizerId', onDelete: 'CASCADE', hooks: true, as: 'organizer', }
      )
      Group.belongsToMany(
        models.User,
        { through: models.Member, as: 'members', }
      )
      // define association here
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
    previewImage: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};