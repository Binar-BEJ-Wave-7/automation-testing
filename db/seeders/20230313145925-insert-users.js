'use strict';
const bcrypt = require('bcryptjs')
const uuid = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      id: uuid.v4(),
      full_name: 'John Doe',
      email: 'saefulloh@email.com',
      password: bcrypt.hashSync('12345678', 10)
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
