'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        email: 'demo@user.io',
        firstName: 'John',
        lastName: 'Doe',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        id: 2,
        email: 'user1@user.io',
        firstName: 'Jan',
        lastName: 'Dah',
        hashedPassword: bcrypt.hashSync('password2'),
      },
      {
        id: 3,
        email: 'user2@user.io',
        firstName: 'Foo',
        lastName: 'Bar',
        hashedPassword: bcrypt.hashSync('password3'),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Users', {
      email: { [Op.in]: ['demo@user.io', 'user1@user.io', 'user2@user.io'], },
    }, {});
  },
};
