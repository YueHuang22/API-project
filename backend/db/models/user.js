'use strict';
const { Model, Validator, } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      // context will be the User instance
      const { id, email, firstName, lastName, } = this;
      return { id, email, firstName, lastName, };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static getCurrentUserById(id) {
      return User.scope('currentUser').findByPk(id);
    }

    static async login({ email, password, }) {
      const { Op, } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: { email, },
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup({ email, password, firstName, lastName, }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        email,
        firstName,
        lastName,
        hashedPassword,
      });
      return await User.scope('currentUser').findByPk(user.id);
    }


    static associate(models) {
      User.hasMany(
        models.Group,
        { foreignKey: 'organizerId', onDelete: 'CASCADE', hooks: true, as: 'organizedGroups', }
      )
      User.belongsToMany(
        models.Group,
        { through: 'Members', as: 'groups', }
      )
      User.hasMany(
        models.Attendee,
        { foreignKey: 'userId', as: 'attendances', }
      )
    }
  }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60],
      },
    },
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword', 'createdAt', 'updatedAt'], },
      },
      loginUser: {
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
    },
  });
  return User;
};