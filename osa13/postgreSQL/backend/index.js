require("dotenv").config();

const { Sequelize, Model, DataTypes } = require("sequelize");
const express = require("express");
const app = express();

const sequelize = new Sequelize(process.env.DATABASE_URL);

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    author: {
      type: DataTypes.TEXT
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog"
  }
);

Blog.sync();

app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll();
  console.log("Fetching all blogs");
  console.log(JSON.stringify(blogs));
  res.json(blogs);
});

app.get("/api/blogs/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  console.log("Fetching blog by id", req.params.id);
  if (blog) {
    console.log("Blog found", JSON.stringify(blog));
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

app.post("/api/blogs", async (req, res) => {
  try {
    console.log("Creating blog", JSON.stringify(req.body));
    const blog = await Blog.create(req.body);
    console.log("Created blog", JSON.stringify(blog));
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.put("/api/blogs/:id", async (req, res) => {
  console.log("Updating blog", req.params.id, JSON.stringify(req.body));
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    await blog.save();
    console.log("Updated blog", JSON.stringify(blog));
    res.json(blog);
  } else {
    console.log("Blog not found", req.params.id);
    res.status(404).end();
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    await blog.destroy();
    console.log("Deleted blog", req.params.id);
    res.status(204).end();
  } else {
    console.log("Blog not found", req.params.id);
    res.status(404).end();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
