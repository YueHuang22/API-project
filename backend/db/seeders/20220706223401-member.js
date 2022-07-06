'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Members', [
      {
        groupId: 1,
        userId: 2,
        status: 'member',
      },
      {
        groupId: 1,
        userId: 3,
        status: 'pending',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Members', {
      groupId: { [Op.in]: [1], },
    }, {});
  },
};
