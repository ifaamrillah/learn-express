const express = require("express");
const TaskController = require("./taskController");

const taskRouter = express();
const taskController = new TaskController();

taskRouter.get("/", taskController.getAll);
taskRouter.post("/", taskController.create);
taskRouter.put("/:taskId", taskController.update);
taskRouter.delete("/:taskId", taskController.remove);

module.exports = taskRouter;
