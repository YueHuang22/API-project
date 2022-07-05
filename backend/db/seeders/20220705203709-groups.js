'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Groups', [
      {
        name: 'Test Group',
        organizerId: 1,
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        type: 'In Person',
        private: false,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Groups', {
      name: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'], },
    }, {});
  },
};
