const express = require("express");
const morgan = require("morgan");

const logger = morgan(
  `:method :url :status content_length=:res[content-length] content_type=:res[content-type] - :response-time ms`
);

const taskRouter = require("./TaskRouter");

const app = express();
app.use(express.json());
app.use(logger);

app.use("/api/v1/tasks", taskRouter);

const port = process.env.PORT ?? 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
