require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL);

sequelize.query("SELECT * FROM blogs", { logging: false }).then(results => {
  const blogs = results[0].map(
    b => `${b.author}: ${b.title}, ${b.likes} likes`
  );
  console.log(blogs.join("\n"));
});
