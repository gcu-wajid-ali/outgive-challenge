'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('Task', {
      taskId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      details: Sequelize.STRING,
      completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('Task');
  }
};