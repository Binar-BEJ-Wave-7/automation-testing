'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      email: {
          type: DataTypes.STRING
      },
      password: {
          type: DataTypes.STRING
      },
      full_name: {
          type: DataTypes.STRING
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: Date.now()
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: Date.now()
      },
      deleted_at: {
        type: DataTypes.DATE,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
