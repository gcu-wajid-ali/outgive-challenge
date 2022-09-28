const apiStatusCode = require("../global_variables/statusCode");
const globalMessages = require("../global_variables/messages");
const taskService = require("../services/task.service");

/**
 * Get All Database tasks
 */
exports.findAll = (req, res) => {
  taskService
    .findAll()
    .then((tasks) => {
      res.status(apiStatusCode.Ok).send(tasks);
    })
    .catch((error) =>
      res.status(apiStatusCode.Conflict).json({
        error: error,
        message: globalMessages.Conflict,
      })
    );
};

/**
 * Create task in Database
 */
exports.create = (req, res) => {
  taskService
    .create(req)
    .then((newTask) => {
      res.status(apiStatusCode.Created).json({
        message: `Task ${globalMessages.Created}`,
        task: newTask,
      });
    })
    .catch((error) =>
      res.status(apiStatusCode.Conflict).json({
        error: error,
        message: globalMessages.Conflict,
      })
    );
};

/**
 * Get a task by Id
 */
exports.findById = (req, res) => {
  const id = req.params.taskId;
  taskService
    .findById(id)
    .then((task) => {
      res.status(apiStatusCode.Ok).send(task);
    })
    .catch((err) =>
      res.status(apiStatusCode.Conflict).json({
        error: err,
        message: globalMessages.Conflict,
      })
    );
};

/**
 * Update a task by Id
 */
exports.update = (req, res) => {
  taskService
    .update(req)
    .then((updatedTask) => {
      res.status(apiStatusCode.Ok).json({
        message: `Task ${globalMessages.Updated}`,
        task: updatedTask,
      });
    })
    .catch((error) =>
      res.status(apiStatusCode.Conflict).json({
        error: error,
        message: globalMessages.Conflict,
      })
    );
};

/**
 * Delete a task by Id
 */
exports.delete = (req, res) => {
  const id = req.params.taskId;
  taskService
    .delete(id)
    .then((result) => {
      res.status(apiStatusCode.Ok).send(result);
    })
    .catch((error) => {
      res.status(apiStatusCode.Conflict).json({
        error: error,
        message: globalMessages.Conflict,
      });
    });
};

