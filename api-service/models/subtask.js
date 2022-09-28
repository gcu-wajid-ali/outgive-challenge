module.exports = (sequelize, DataTypes) => {
  const SubTask = sequelize.define(
    "SubTask",
    {
      subTaskId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      taskId: {
        type: DataTypes.UUID,
        references: {
          model: "Task",
          key: "taskId",
        },
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "SubTask",
    }
  );

  SubTask.associate = (models) => {
  };

  return SubTask;
};