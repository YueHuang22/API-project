'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Groups', [
      {
        id: 1,
        name: 'Test Group',
        organizerId: 1,
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        type: 'In Person',
        private: false,
        city: 'New York',
        state: 'NY',
      },
      {
        id: 2,
        name: 'Test Group',
        organizerId: 2,
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        type: 'In Person',
        private: false,
        city: 'New York',
        state: 'NY',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Groups', {
      name: { [Op.in]: ['Test Group'], },
    }, {});
  },
};
