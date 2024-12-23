const express = require("express");
const TaskController = require("./taskController");

const app = express();

const taskController = new TaskController();

app.use(express.json());

app.get("/api/v1/tasks", taskController.getAll);
app.post("/api/v1/tasks", taskController.create);
app.put("/api/v1/tasks", taskController.update);
app.delete("/api/v1/tasks", taskController.remove);

const port = process.env.PORT ?? 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
