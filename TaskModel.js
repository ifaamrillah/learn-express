const { randomUUID } = require("crypto");

class TaskRepository {
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

  all = () => {
    console.log("INI jaan");
    return this.#tasks;
  };

  add = (title) => {
    const newTask = {
      id: randomUUID(),
      title,
      status: "todo",
    };
    this.#tasks.push(newTask);
    return newTask;
  };

  updateById = (id, status) => {
    const index = this.#tasks.findIndex((task) => task.id === id);
    if (index < 0) {
      return {
        ok: false,
        data: null,
      };
    }

    this.#tasks[index].status = status;
    return {
      ok: true,
      data: this.#tasks[index],
    };
  };

  removeById = (id) => {
    const target = this.#tasks.find((task) => task.id === id);
    if (target === undefined) {
      return {
        ok: false,
        data: null,
      };
    }

    this.#tasks = this.#tasks.filter((task) => task.id !== target.id);
    return {
      ok: true,
      data: target,
    };
  };
}

module.exports = {
  TaskRepository,
};
