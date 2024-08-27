const router = require("express").Router();
const { User, Session, Blog } = require("../models");
const tokenExtractor = require("../util/tokenExtractor.js");

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user.admin) {
    return res.status(401).json({ error: "operation not permitted" });
  }
  next();
};

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
  const where = {};

  if (req.query.read) {
    where.readStatus = req.query.read === "true";
  }

  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        attributes: ["title", "id"]
      },
      {
        model: Blog,
        as: "markedBlogs",
        attributes: { exclude: ["userId"] },
        through: { attributes: ["readStatus", "id"], where }
      }
    ]
  });
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

router.put("/:username", tokenExtractor, isAdmin, async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username
    }
  });

  if (user) {
    user.disabled = req.body.disabled;
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.post("/logout", tokenExtractor, async (req, res) => {
  await Session.destroy({ where: { userId: req.decodedToken.id } });
  res.status(204).end();
});

module.exports = router;
