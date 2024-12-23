const { randomUUID } = require("crypto");
const { STATUS_CODES } = require("http");

class TaskController {
  #tasks = [
    {
      id: randomUUID(),
      title: "Task 1",
      status: "todo",
    },
    {
      id: randomUUID(),
      title: "Task 2",
      status: "todo",
    },
    {
      id: randomUUID(),
      title: "Task 3",
      status: "onprogress",
    },
  ];

  getAll = (req, res) => {
    res.status(200).json(this.#tasks);
  };

  create = (req, res) => {
    const { title } = req.body;

    if (title === undefined || title.length < 3) {
      res.status(400).json({
        status: STATUS_CODES[400],
        message: `title is required and must greater than 3 characters`,
      });
      return;
    }

    const newTask = {
      id: randomUUID(),
      title,
      status: "todo",
    };
    this.#tasks.push(newTask);
    res.status(201).json(newTask);
  };

  update = (req, res) => {
    const { taskId: id } = req.params;
    const { status } = req.body;

    if (id === undefined) {
      res.status(400).json({
        status: STATUS_CODES[400],
        message: `id is required`,
      });
      return;
    }

    if (status === undefined) {
      res.status(400).json({
        status: STATUS_CODES[400],
        message: `status is required`,
      });
      return;
    }

    const index = this.#tasks.findIndex((task) => task.id === id);
    if (index < 0) {
      res.status(400).json({
        status: STATUS_CODES[400],
        message: `task not found`,
      });
      return;
    }

    this.#tasks[index].status = status;
    res.status(200).json(this.#tasks[index]);
  };

  remove = (req, res) => {
    const { taskId: id } = req.params;

    if (id === undefined) {
      res.status(400).json({
        status: STATUS_CODES[400],
        message: `id is required`,
      });
      return;
    }

    const deletedTask = this.#tasks.find((task) => task.id === id);
    if (deletedTask === undefined) {
      res.json.status(400).json({
        status: STATUS_CODES[400],
        message: `task not found`,
      });
      return;
    }

    this.#tasks = this.#tasks.filter((task) => task.id !== deletedTask.id);
    res.status(200).json(deletedTask);
  };
}

module.exports = TaskController;
