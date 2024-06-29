const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
    {
        title: "HTML is easy",
        author: "MDN",
        url: "MDN.com",
        likes: 1000,
    },
    {
        title: "HTML is hard",
        author: "w3",
        url: "w3schools.com",
        likes: 10,
    }
]

const nonExistingAuthor = async () => {
    const blog = new Blog({ title: "willremovethissoon" })
    await blog.save()
    await blog.deleteOne()
    return blog._id.toString()
  }


const blogsInDb = async () => {
    const blogs = await Blog.find({})
    const jsoned = blogs.map(blog => blog.toJSON())
    return jsoned
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

module.exports = {
    initialBlogs, blogsInDb, nonExistingAuthor, usersInDb
}