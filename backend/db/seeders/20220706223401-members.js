'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const groups = await queryInterface.sequelize.query(
      'SELECT id from "Groups" ORDER BY id;'
    );
    const groupRows = groups[0]
    const users = await queryInterface.sequelize.query(
      'SELECT id from "Users" ORDER BY id;'
    );
    const userRows = users[0]
    await queryInterface.bulkInsert('Members', [
      {
        groupId: groupRows[0].id,
        userId: userRows[1].id,
        status: 'member',
      },
      {
        groupId: groupRows[0].id,
        userId: userRows[2].id,
        status: 'pending',
      },
      {
        groupId: groupRows[0].id,
        userId: userRows[3].id,
        status: 'co-host',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Members', null, {});
  },
};
