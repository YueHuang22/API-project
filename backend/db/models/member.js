'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Member.belongsTo(
        models.Group,
        { foreignKey: 'groupId', onDelete: 'CASCADE', hooks: true, }
      )
      Member.belongsTo(
        models.User,
        { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true, }
      )
    }
  }
  Member.init({
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
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
  });
  return Member;
};