const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

const { requireAuth } = require("../utils/middleware")

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get("/:id", async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post("/", requireAuth, async (request, response) => {
    const body = request.body
    const user = request.user

    const blog = new Blog(body)
    blog.user = user._id

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)

})

blogsRouter.delete("/:id", requireAuth, async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put("/:id", requireAuth, async (request, response) => {
    const result = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.status(200).json(result)
})

module.exports = blogsRouter