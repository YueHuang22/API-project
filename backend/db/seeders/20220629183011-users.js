'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        firstName: 'Yue',
        lastName: 'huang',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'garry@user.io',
        firstName: 'Garry',
        lastName: 'Liu',
        hashedPassword: bcrypt.hashSync('passwordgarry'),
      },
      {
        email: 'evan@user.io',
        firstName: 'Evan',
        lastName: 'Law',
        hashedPassword: bcrypt.hashSync('passwordevan'),
      },
      {
        email: 'jin@user.io',
        firstName: 'Jin',
        lastName: 'Tian',
        hashedPassword: bcrypt.hashSync('passwordjin'),
      },
      {
        email: 'luke@user.io',
        firstName: 'Luke',
        lastName: 'Ye',
        hashedPassword: bcrypt.hashSync('passwordluke'),
      },
      {
        email: 'ying@user.io',
        firstName: 'Ying',
        lastName: 'Lu',
        hashedPassword: bcrypt.hashSync('passwordying'),
      },
      {
        email: 'yifei@user.io',
        firstName: 'Yifei',
        lastName: 'Wu',
        hashedPassword: bcrypt.hashSync('passwordyifei'),
      },
      {
        email: 'eden@user.io',
        firstName: 'Eden',
        lastName: 'Lu',
        hashedPassword: bcrypt.hashSync('passwordeden'),
      },
      {
        email: 'meiling@user.io',
        firstName: 'Meiling',
        lastName: 'Zhao',
        hashedPassword: bcrypt.hashSync('passwordmeiling'),
      },
      {
        email: 'kevin@user.io',
        firstName: 'Kevin',
        lastName: 'Wang',
        hashedPassword: bcrypt.hashSync('passwordkevin'),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Users', null, {});
  },
};
