const express = require("express");
const taskRouter = require("./TaskRouter");

const app = express();
app.use(express.json());

app.use("/api/v1/tasks", taskRouter);

const port = process.env.PORT ?? 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
