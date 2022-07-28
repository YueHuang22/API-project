'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const events = await queryInterface.sequelize.query(
      'SELECT id from "Events" ORDER BY id;'
    );
    const eventRows = events[0]
    const users = await queryInterface.sequelize.query(
      'SELECT id from "Users" ORDER BY id;'
    );
    const userRows = users[0]

    await queryInterface.bulkInsert('Attendees', [
      {
        eventId: eventRows[0].id,
        userId: userRows[1].id,
        status: 'member',
      },
      {
        eventId: eventRows[0].id,
        userId: userRows[2].id,
        status: 'member',
      },
      {
        eventId: eventRows[0].id,
        userId: userRows[3].id,
        status: 'member',
      },
      {
        eventId: eventRows[0].id,
        userId: userRows[4].id,
        status: 'member',
      },
      {
        eventId: eventRows[0].id,
        userId: userRows[5].id,
        status: 'member',
      },
      {
        eventId: eventRows[1].id,
        userId: userRows[1].id,
        status: 'member',
      },
      {
        eventId: eventRows[1].id,
        userId: userRows[2].id,
        status: 'member',
      },
      {
        eventId: eventRows[1].id,
        userId: userRows[3].id,
        status: 'member',
      },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Attendees', null, {});
  },
};
