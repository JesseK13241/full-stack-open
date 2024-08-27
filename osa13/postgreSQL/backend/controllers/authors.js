const { Blog } = require("../models");
const express = require("express");
const authorRouter = express.Router();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL);

authorRouter.get("/", async (req, res) => {
    
    // {
    //     author: "new author",
    //     blogs: "1",
    //     likes: "100"
    // };

  try {
    const authors = await Blog.findAll({
      attributes: [
        // columns to include
        "author",
        [sequelize.fn("COUNT", sequelize.col("id")), "blogs"],
        [sequelize.fn("SUM", sequelize.col("likes")), "likes"]
      ],
      group: ["author"],
      order: [[sequelize.fn("SUM", sequelize.col("likes")), "DESC"]],
      raw: true
    });

    const formattedAuthors = authors.map(author => ({
      author: author.author,
      blogs: author.blogs.toString(),
      likes: author.likes.toString()
    }));

    res.json(formattedAuthors);
  } catch (error) {
    console.error("Error fetching authors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = authorRouter;
