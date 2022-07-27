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
      //group 1
      {
        groupId: groupRows[0].id,
        userId: userRows[1].id,
        status: 'member',
      },
      {
        groupId: groupRows[0].id,
        userId: userRows[2].id,
        status: 'member',
      },
      {
        groupId: groupRows[0].id,
        userId: userRows[3].id,
        status: 'member',
      },
      {
        groupId: groupRows[0].id,
        userId: userRows[4].id,
        status: 'member',
      },
      {
        groupId: groupRows[0].id,
        userId: userRows[5].id,
        status: 'member',
      },
      //group 2
      {
        groupId: groupRows[1].id,
        userId: userRows[0].id,
        status: 'co-host',
      },
      {
        groupId: groupRows[1].id,
        userId: userRows[2].id,
        status: 'member',
      },
      {
        groupId: groupRows[1].id,
        userId: userRows[3].id,
        status: 'member',
      },
      {
        groupId: groupRows[1].id,
        userId: userRows[4].id,
        status: 'member',
      },
      {
        groupId: groupRows[1].id,
        userId: userRows[5].id,
        status: 'pending',
      },
      //group 3
      {
        groupId: groupRows[2].id,
        userId: userRows[0].id,
        status: 'co-host',
      },
      {
        groupId: groupRows[2].id,
        userId: userRows[1].id,
        status: 'member',
      },
      {
        groupId: groupRows[2].id,
        userId: userRows[3].id,
        status: 'member',
      },
      {
        groupId: groupRows[2].id,
        userId: userRows[4].id,
        status: 'member',
      },
      {
        groupId: groupRows[2].id,
        userId: userRows[5].id,
        status: 'member',
      },
      //group 4
      {
        groupId: groupRows[3].id,
        userId: userRows[0].id,
        status: 'co-host',
      },
      {
        groupId: groupRows[3].id,
        userId: userRows[1].id,
        status: 'member',
      },
      {
        groupId: groupRows[3].id,
        userId: userRows[2].id,
        status: 'member',
      },
      {
        groupId: groupRows[3].id,
        userId: userRows[4].id,
        status: 'member',
      },
      {
        groupId: groupRows[3].id,
        userId: userRows[5].id,
        status: 'member',
      },
      //group 5
      {
        groupId: groupRows[4].id,
        userId: userRows[0].id,
        status: 'co-host',
      },
      {
        groupId: groupRows[4].id,
        userId: userRows[1].id,
        status: 'member',
      },
      {
        groupId: groupRows[4].id,
        userId: userRows[2].id,
        status: 'member',
      },
      {
        groupId: groupRows[4].id,
        userId: userRows[3].id,
        status: 'member',
      },
      {
        groupId: groupRows[4].id,
        userId: userRows[5].id,
        status: 'member',
      },
      //group 6
      {
        groupId: groupRows[5].id,
        userId: userRows[0].id,
        status: 'co-host',
      },
      {
        groupId: groupRows[5].id,
        userId: userRows[1].id,
        status: 'member',
      },
      {
        groupId: groupRows[5].id,
        userId: userRows[2].id,
        status: 'member',
      },
      {
        groupId: groupRows[5].id,
        userId: userRows[3].id,
        status: 'member',
      },
      {
        groupId: groupRows[5].id,
        userId: userRows[4].id,
        status: 'member',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Members', null, {});
  },
};
