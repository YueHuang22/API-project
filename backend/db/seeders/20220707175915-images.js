'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        id: 1,
        groupId: null,
        eventId: 1,
        url: 'image_url',
      },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Images', {
      id: { [Op.in]: [1, 2], },
    }, {});
  },
};
