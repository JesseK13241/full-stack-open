const usersRouter = require("express").Router()
const User = require("../models/user")

const bcrypt = require("bcrypt")

usersRouter.get("/", async (request, response) => {
    const users = await User.find({}).populate("blogs")
    response.json(users)
})

usersRouter.post("/", async (request, response) => {
    const { username, name, password } = request.body

    if (!username || !password) {
        return response.status(400).json({ error: "empty username or password" })
    }

    if (username.length < 3 || password.length < 3) {
        return response.status(400).json({ error: "username and password must be longer than 3 characters" })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter