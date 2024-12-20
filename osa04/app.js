const config = require("./utils/config")
const express = require("express")
const app = express()
const cors = require("cors")
require("express-async-errors")
const middleware = require("./utils/middleware")
const blogsRouter = require("./controllers/blog")
const usersRouter = require("./controllers/user")
const loginRouter = require("./controllers/login")
const logger = require("./utils/logger")
const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

logger.info("connecting to", config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use(middleware.tokenExtractor)

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app