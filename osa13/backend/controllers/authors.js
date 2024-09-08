const { Blog } = require("../models");
const express = require("express");
const authorRouter = express.Router();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL);

authorRouter.get("/", async (req, res) => {
  // Return all authors, sorted by likes
  // {author: "new author",
  // blogs: "1",
  // likes: "100"}

  const authors = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("id")), "blogs"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"]
    ],
    group: ["author"],
    order: [[sequelize.fn("SUM", sequelize.col("likes")), "DESC"]]
  });

  res.json(authors);
});

module.exports = authorRouter;
