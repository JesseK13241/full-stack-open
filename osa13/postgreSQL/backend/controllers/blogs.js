const { Blog } = require("../models");
const express = require("express");
const blogRouter = express.Router();

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  console.log("Blog found", JSON.stringify(req.blog));
  next();
};

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  console.log("Fetching all blogs");
  console.log(JSON.stringify(blogs));
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  try {
    console.log("Creating blog", JSON.stringify(req.body));
    req.body.likes = 0;
    const blog = await Blog.create(req.body);
    console.log("Created blog", JSON.stringify(blog));
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

blogRouter.get("/:id", blogFinder, async (req, res) => {
  console.log("Fetching blog by id", req.params.id);
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

blogRouter.put("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    const newLikes = req.body.likes;
    req.blog.likes = newLikes;
    await req.blog.save();
    console.log("Updated blog likes", JSON.stringify(req.blog));
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

blogRouter.delete("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy();
    console.log("Deleted blog", req.params.id);
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = blogRouter;
