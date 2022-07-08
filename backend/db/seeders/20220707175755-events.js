'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const groups = await queryInterface.sequelize.query(
      'SELECT id from "Groups" ORDER BY id;'
    );
    const groupRows = groups[0]
    const venues = await queryInterface.sequelize.query(
      'SELECT id from "Venues" ORDER BY id;'
    );
    const venueRows = venues[0]
    await queryInterface.bulkInsert('Events', [
      {
        groupId: groupRows[0].id,
        venueId: null,
        name: 'Tennis Group First Meet and Greet',
        type: 'Online',
        startDate: new Date('2021-11-19 20:00:00'),
        previewImage: 'image url',
      },
      {
        groupId: groupRows[0].id,
        venueId: venueRows[0].id,
        name: 'Tennis Single',
        type: 'In Person',
        startDate: new Date('2021-11-12 20:00:00'),
        previewImage: 'image url',
      }
    ], {});
  },
  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Events', null, {});
  },
};
