const { test, after, beforeEach } = require("node:test")
const assert = require("node:assert")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const helper = require("./test_helper")

const mongoose = require("mongoose")
const Blog = require("../models/blog")

const API_URL = "/api/blogs"

test("blogs are returned as json", async () => {
    await api
        .get(API_URL)
        .expect(200)
        .expect("Content-Type", /application\/json/)
})

test("there are two blogs", async () => {
    const response = await api.get(API_URL)
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test("the first blog is about ez HTML", async () => {
    const response = await api.get(API_URL)
    const title = response.body.map(e => e.title)
    assert(title.includes("HTML is easy"))
})

test("A valid blog can be added", async () => {
    const newBlog = {
        title: "async/await simplifies",
        author: "FSO",
        url: "fullstackopen.com",
        likes: 3000
    }

    await api
        .post(API_URL)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const response = await api.get(API_URL)
    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    const contents = response.body.map(r => r.title)
    assert(contents.includes("async/await simplifies"))
})

test("Invalid blog can't be added", async () => {
    const newBlog = {
        title: "async/await simplifies",
    }

    await api
        .post(API_URL)
        .send(newBlog)
        .expect(400)

    const response = await api.get(API_URL)
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test("A specific blog can be viewed", async () => {
    const initialBlogs = await helper.blogsInDb()
    const blogToView = initialBlogs[0]
    const resultBlog = await api
        .get(`${API_URL}/${blogToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/)

    assert.deepStrictEqual(resultBlog.body, blogToView)
})

test("a blog can be deleted", async () => {
    const initialBlogs = await helper.blogsInDb()
    const blogToDelete = initialBlogs[0]

    await api
        .delete(`${API_URL}/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(r => r.title)
    assert(!titles.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

})

test.only("unspecified like is set to 0", async () => {
    const blogWithoutLikes = {
        title: "Unspecified likes",
        author: "unknown",
        url: "test.com",
    }

    const requestObject = await api
        .post(API_URL)
        .send(blogWithoutLikes)

    const likelessId = requestObject.body.id

    const response = await api.get(`${API_URL}/${likelessId}`)
    assert.strictEqual(response.body.likes, 0)
})

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

after(async () => {
    await mongoose.connection.close()
})