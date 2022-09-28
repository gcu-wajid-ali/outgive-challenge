var express = require("express");
const { body, param } = require("express-validator");
var router = express.Router();

var task = require("../controllers/task.controller");
var validate = require("../util/validateSchema");

/* GET tasks listing. */
router.get("/", task.findAll);

/* Create a task */
router.post(
  "/create",
  validate([
    body("title").isString().notEmpty(), //parameter validation
    body("details").isString(),
    body("completed").isBoolean(),
    body("subTasks").isArray(),
  ]),
  task.create
);

/* Retrieve a single task by Id */
router.get(
  "/:taskId",
  validate([param("taskId").isUUID().notEmpty()]), //parameter validation
  task.findById
);

/* Update a task with Id */
router.put(
  "/:taskId",
  validate([
    param("taskId").isUUID().notEmpty(), //parameter validation
    body("title").isString().notEmpty(),
    body("details").isString(),
    body("completed").isBoolean(),
    body("subTasks").isArray(),
  ]),
  task.update
);

/* Delete a task with Id */
router.delete(
  "/:taskId",
  validate([param("taskId").isUUID().notEmpty()]), //parameter validation
  task.delete
);


module.exports = router;