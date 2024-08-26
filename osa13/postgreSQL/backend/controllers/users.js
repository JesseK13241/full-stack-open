const router = require("express").Router();

const { User, Blog } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog
    }
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.post("/:username", async (req, res) => {
  const { username } = req.params;
  const { newName } = req.body;
  const user = await User.findOne({ where: { username } });

  if (user) {
    user.set({ name: newName });
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
