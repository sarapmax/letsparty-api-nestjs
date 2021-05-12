const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        // ID: 1
        email: 'johndoe@example.com',
        password: bcrypt.hashSync('password', 8),
        full_name: 'John Doe',
        avatar_url: 'https://letsparty-bucket.s3-ap-southeast-1.amazonaws.com/John_Doe%2C_born_John_Nommensen_Duchac.jpeg',
        avatar_key: 'John_Doe%2C_born_John_Nommensen_Duchac.jpeg',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface) => await queryInterface.bulkDelete('users', null, {}),
};
