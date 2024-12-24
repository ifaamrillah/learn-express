const { randomUUID } = require("crypto");
const { STATUS_CODES } = require("http");

const { TaskRepository } = require("./TaskModel");

class TaskController {
  #repo;

  /**
   * constructor for TaskController
   * @param taskRepository {TaskRepository}
   */
  constructor(taskRepository) {
    this.#repo = taskRepository;
  }

  getAll = (req, res) => {
    res.status(200).json(this.#repo.all());
  };

  create = (req, res) => {
    const { title } = req.body;

    res.status(201).json(this.#repo.add(title));
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

    const { ok, data } = this.#repo.updateById(id, status);
    if (!ok) {
      res.status(400).json({
        status: STATUS_CODES[400],
        message: `task not found`,
      });
      return;
    }

    res.status(200).json(data);
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

    const { ok, data } = this.#repo.removeById(id);
    if (!ok) {
      res.json.status(400).json({
        status: STATUS_CODES[400],
        message: `task not found`,
      });
      return;
    }

    res.status(200).json(data);
  };
}

module.exports = {
  TaskController,
};
