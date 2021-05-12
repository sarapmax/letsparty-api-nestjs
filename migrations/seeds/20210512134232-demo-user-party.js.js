'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_parties', [
      {
        user_id: 1,
        party_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        party_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface) => await queryInterface.bulkDelete('user_parties', null, {}),
};
