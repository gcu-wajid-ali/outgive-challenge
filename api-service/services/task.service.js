const db = require("../config/db.config");
const globalMessages = require("../global_variables/messages");


const taskModel = db.task;
const subtaskModel = db.subtask;

/**
 * Get all tasks from database
 * @return {Promise<array<User>>}
 */

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    taskModel
      .findAll({
        include: [{ model: subtaskModel, as: "SubTasks" }],
      })
      .then((tasks) => {
        resolve(tasks);
      })
      .catch((error) => reject(error));
  });
};

/**
 * Create a task in database
 * @param {object} req - request body with parameters
 * @return {Promise<string>}
 */

exports.create = (req) => {
  const { title, details, completed, subTasks } = req.body;

  return new Promise((resolve, reject) => {
    resolve(
      taskModel.create({
        title,
        details,
        completed,
        SubTasks: subTasks
      }, {
        include: [{
          model: subtaskModel,
          as: "SubTasks",
        }],
      })
    )
      .catch((error) => reject(error));
  });
};

/**
 * Find a task in database by Id
 * @param {number} id - id
 * @return {Promise<string>}
 */

exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    taskModel
      .findAll({
        where: {
          '$Task.taskId$': id
        },
        include: [{ model: subtaskModel, as: "SubTasks" }],
      })
      .then((task) => {
        if (task) {
          resolve(task);
        } else {
          reject("Task Not Exist");
        }
      })
      .catch((error) => reject(error));
  });
};

/**
 * Update a task in database
 * @param {object} req - request body with parameters
 * @return {Promise<string>}
 */
exports.update = async (req) => {
  const { title, details, completed, subTasks } = req.body;
  const id = req.params.taskId;

  const SubTasks = subTasks.map(subTask => subTask = { ...subTask, taskId: id }); //adding taskId for bulk create

  return new Promise((resolve, reject) => {
    taskModel
      .findOne({
        where: { "taskId": id },
        include: [{ model: subtaskModel, as: "SubTasks" }],
      })
      .then(async (task) => {
        if (task) {
          await subtaskModel.destroy({
            where: { "taskId": id }
          });

          await subtaskModel.bulkCreate(SubTasks);
          await task.update({ title, details, completed });

          const result = await this.findById(id);
          resolve(result);
        } else {
          reject("Task Not Exist");
        }
      })
      .catch((error) => reject(error));
  });
};

/**
 * Delete a task in database by Id
 * @param {number} id - id
 * @return {Promise<string>}
 */
exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    taskModel
      .destroy({
        where: { taskId: id },
      })
      .then((result) => {
        if (!result) {
          reject("Task Not Exist");
        } else {
          resolve(`Task ${globalMessages.Deleted}`);
        }
      })
      .catch((error) => reject(error));
  });
};
