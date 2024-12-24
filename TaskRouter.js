const express = require("express");

const { TaskRepository } = require("./TaskModel");
const { TaskController } = require("./taskController");

const taskRepository = new TaskRepository();
const taskController = new TaskController(taskRepository);

const taskRouter = express.Router();

taskRouter.get("/", taskController.getAll);
taskRouter.post("/", taskController.create);
taskRouter.put("/:taskId", taskController.update);
taskRouter.delete("/:taskId", taskController.remove);

module.exports = taskRouter;
