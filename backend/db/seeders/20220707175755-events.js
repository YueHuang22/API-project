'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Events', [
      {
        id: 1,
        groupId: 1,
        venueId: null,
        name: 'Tennis Group First Meet and Greet',
        type: 'Online',
        startDate: '2021-11-19 20:00:00',
        previewImage: 'image url',
      },
      {
        id: 2,
        groupId: 1,
        venueId: 1,
        name: 'Tennis Single',
        type: 'In Person',
        startDate: '2021-11-19 20:00:00',
        previewImage: 'image url',
      }
    ], {});
  },
  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Events', {
      id: { [Op.in]: [1, 2], },
    }, {});
  },
};
