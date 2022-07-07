'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const groups = await queryInterface.sequelize.query(
      'SELECT id from "Groups" ORDER BY id;'
    );
    const groupRows = groups[0]
    await queryInterface.bulkInsert('Venues', [
      {
        groupId: groupRows[0].id,
        address: '123 Disney Lane',
        city: 'New York',
        state: 'NY',
        lat: 37.7645358,
        lng: -122.4730327,
      }
    ], {});
  },
  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Venues', {
      address: { [Op.in]: ['123 Disney Lane'], },
    }, {});
  },
};
