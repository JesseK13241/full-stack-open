const { Blog } = require("../models");
const express = require("express");
const blogRouter = express.Router();

const blogFinder = async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  req.blog = blog;
  next();
};

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  req.body.likes = 0;
  const blog = await Blog.create(req.body);
  return res.json(blog);
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
