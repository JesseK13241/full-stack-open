const Blog = require("./blog");
const User = require("./user");
const Session = require("./session");
const Readlist = require('./readlist')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Readlist, as: 'markedBlogs' })
Blog.belongsToMany(User, { through: Readlist, as: 'usersMarked' })

User.hasMany(Session)

module.exports = {
  Blog,
  User,
  Readlist,
  Session,
};
