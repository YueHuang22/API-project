'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        firstName: 'John',
        lastName: 'Test',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'user1@user.io',
        firstName: 'Jan',
        lastName: 'Test',
        hashedPassword: bcrypt.hashSync('password2'),
      },
      {
        email: 'user2@user.io',
        firstName: 'Foo',
        lastName: 'Test',
        hashedPassword: bcrypt.hashSync('password3'),
      },
      {
        email: '4@user.io',
        firstName: 'John4',
        lastName: 'Test',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: '5@user.io',
        firstName: 'John5',
        lastName: 'Test',
        hashedPassword: bcrypt.hashSync('password'),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Users', null, {});
  },
};
