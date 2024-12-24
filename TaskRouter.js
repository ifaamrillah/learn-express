const express = require("express");
const { ZodError } = require("zod");

const {
  TaskRepository,
  SchemaAddTask,
  SchemaUpdateTask,
  SchemaTaskId,
} = require("./TaskModel");
const { TaskController } = require("./taskController");

const taskRepository = new TaskRepository();
const taskController = new TaskController(taskRepository);

const taskRouter = express.Router();

taskRouter.get("/", taskController.getAll);
taskRouter.post("/", withValidator(SchemaAddTask), taskController.create);
taskRouter.put(
  "/:taskId",
  withValidator(SchemaTaskId, true),
  withValidator(SchemaUpdateTask),
  taskController.update
);
taskRouter.delete(
  "/:taskId",
  withValidator(SchemaTaskId, true),
  taskController.remove
);

function withValidator(schema, isParams = false) {
  return (req, res, next) => {
    try {
      if (isParams) {
        schema.parse(req.params);
      } else {
        schema.parse(req.body);
      }
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const issues = err.errors.map(({ path, message }) => ({
          path,
          message,
        }));
        res.status(400).json({ code: "validation_error", issues });
      } else {
        next(err);
      }
    }
  };
}

module.exports = taskRouter;
