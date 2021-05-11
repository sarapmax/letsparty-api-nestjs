module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        email: 'johndoe@example.com',
        first_name: 'John',
        last_name: 'Doe',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface) => await queryInterface.bulkDelete('users', null, {}),
};
