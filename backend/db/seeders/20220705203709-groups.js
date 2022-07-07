'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      'SELECT id from "Users" ORDER BY id;'
    );
    const userRows = users[0]
    await queryInterface.bulkInsert('Groups', [
      {
        name: 'Test Group 1',
        organizerId: userRows[0].id,
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        type: 'In Person',
        private: false,
        city: 'New York',
        state: 'NY',
      },
      {
        name: 'Test Group 2',
        organizerId: userRows[1].id,
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        type: 'Online',
        private: true,
        city: 'New York',
        state: 'NY',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Groups', null, {});
  },
};
