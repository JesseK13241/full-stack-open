const jwt = require("jsonwebtoken");
const router = require("express").Router();
const { SECRET } = require("../util/config");
const User = require("../models/user");
const Session = require("../models/session");

router.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findOne({
    where: {
      username: body.username
    }
  });

  const passwordCorrect = body.password === "salainen";

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password"
    });
  }

  if (user.disabled) {
    return response
      .status(401)
      .json({ error: "account disabled, please contact admin" });
  }

  const token = jwt.sign({ username: user.username, id: user.id }, SECRET, {
    expiresIn: "1h"
  });

  await Session.create({
    userId: user.id,
    token: token,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000)
  });
  
  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = router;
