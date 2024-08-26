const { User, Blog } = require("../models");
const express = require("express");
const blogRouter = express.Router();
const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      console.log(authorization.substring(7));
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

blogRouter.post("/", tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
      date: new Date()
    });
    res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

const blogFinder = async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  req.blog = blog;
  next();
};

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"]
    }
  });
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const user = await User.findOne();
  const blog = await Blog.create({ ...req.body, userId: user.id });
  return res.json(blog); // likes: null ??
});

blogRouter.get("/:id", blogFinder, async (req, res) => {
  res.json(req.blog);
});

blogRouter.put("/:id", blogFinder, async (req, res) => {
  req.blog.likes = req.body.likes;
  await req.blog.save();
  res.json(req.blog);
});

blogRouter.delete("/:id", blogFinder, async (req, res) => {
  await req.blog.destroy();
  res.status(204).end();
});

module.exports = blogRouter;
