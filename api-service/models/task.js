module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      taskId: {
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
      details: DataTypes.STRING,
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "Task",
    }
  );

  Task.associate = (models) => {
  };

  return Task;
};