const { User, Blog } = require("../models");
const express = require("express");
const blogRouter = express.Router();
const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next({ name: "JsonWebTokenError", message: "Token missing or invalid" });
  }
};

blogRouter.post("/", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({
    ...req.body,
    userId: user.id,
    date: new Date()
  });
  res.json(blog);
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

blogRouter.get("/:id", blogFinder, async (req, res) => {
  res.json(req.blog);
});

blogRouter.put("/:id", blogFinder, async (req, res) => {
  await req.blog.update({ likes: req.body.likes });
  res.json(req.blog);
});

blogRouter.delete("/:id", blogFinder, async (req, res) => {
  await req.blog.destroy();
  res.status(204).end();
});

module.exports = blogRouter;
