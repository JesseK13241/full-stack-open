const express = require("express");
const app = express();

const errorHandler = require("./util/errorHandler");

app.use(express.json());
require("express-async-errors");

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const blogRouter = require("./controllers/blogs");
const authorRouter = require("./controllers/authors");
const readinglistRouter = require("./controllers/readinglistRouter");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

app.use("/api/blogs", blogRouter);
app.use("/api/authors", authorRouter);
app.use("/api/readinglist", readinglistRouter)
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
