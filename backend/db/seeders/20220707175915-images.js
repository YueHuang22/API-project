'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const events = await queryInterface.sequelize.query(
      'SELECT id from Events ORDER BY id;'
    );
    const eventRows = events[0]
    await queryInterface.bulkInsert('Images', [
      {
        groupId: null,
        eventId: eventRows[0].id,
        url: 'image_url',
      },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Images', null, {});
  },
};
