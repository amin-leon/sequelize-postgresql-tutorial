'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert('users', [{
      name: 'John Doe',
      email: "leon@gmail.com",
      uuid: "67b16ee0-3b2d-4635-955e-3d25520c186f",
      role: "Admin",
      createdAt: "2024-04-18T20:09:01.670Z",
      updatedAt: "2024-04-18T20:09:01.670Z"
      },
      {
        name: 'NP Leon',
        email: "holla@gmail.com",
        uuid: "67b16ee0-3b2d-4635-955e-3d25520c886f",
        role: "user",
        createdAt: "2024-04-18T20:09:01.670Z",
        updatedAt: "2024-04-18T20:09:01.670Z"
        },
        {
          name: 'Kingsley',
          email: "Kingsley@gmail.com",
          uuid: "67b16ee0-3b2d-4635-955e-3d25520c109f",
          role: "user",
          createdAt: "2024-04-18T20:09:01.670Z",
          updatedAt: "2024-04-18T20:09:01.670Z"
          }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // delete all users
     await queryInterface.bulkDelete('users', null, {});
     
  }
};
