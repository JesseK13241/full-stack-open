const Blog = require("./blog");
const User = require("./user");
const Readlist = require('./readlist')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Readlist, as: 'markedBlogs' })
Blog.belongsToMany(User, { through: Readlist, as: 'usersMarked' })

module.exports = {
  Blog,
  User
};
