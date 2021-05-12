'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('parties', [
      {
        // ID: 1
        image_url: 'https://letsparty-bucket.s3.amazonaws.com/412fd4219f2511e8911101117567899b.png',
        image_key: '412fd4219f2511e8911101117567899b.png',
        name: 'Epic pool party',
        max_members: 20,
        created_by_id: 1,
        updated_by_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        // ID: 2
        image_url: 'https://letsparty-bucket.s3.ap-southeast-1.amazonaws.com/d5481223935b22252c850d501d5d4a4f.jpeg',
        image_key: 'd5481223935b22252c850d501d5d4a4f.jpeg',
        name: 'Fullmoon extreme party',
        max_members: 10,
        created_by_id: 1,
        updated_by_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        // ID: 3
        image_url: 'https://letsparty-bucket.s3.ap-southeast-1.amazonaws.com/fd2ece30bf77cc47768424361726b9f9.jpeg',
        image_key: 'fd2ece30bf77cc47768424361726b9f9.jpeg',
        name: 'Santa party',
        max_members: 5,
        created_by_id: 1,
        updated_by_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface) => await queryInterface.bulkDelete('parties', null, {}),
};
