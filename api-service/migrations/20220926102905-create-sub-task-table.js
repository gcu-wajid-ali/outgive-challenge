"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
      await queryInterface.createTable("SubTask", {
        subTaskId: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          autoIncrement: false,
          allowNull: false,
          primaryKey: true,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        completed: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        taskId: {
          type: Sequelize.UUID,
          references: {
            model: "Task",
            key: "taskId",
            as: "taskId",
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("SubTask");
  },
};