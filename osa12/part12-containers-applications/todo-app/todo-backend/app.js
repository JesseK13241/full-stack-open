const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const visitCounter = require("./routes/visitCounter");
const indexRouter = require("./routes/index");
const todosRouter = require("./routes/todos");

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());

app.use(visitCounter);
app.use("/", indexRouter);
app.use("/todos", todosRouter);

module.exports = app;
