const assert = require("node:assert")
const { test, describe } = require("node:test")
const { totalLikes, favoriteBlog, mostBlogs, mostLikes } = require("../utils/list_helper")

const emptyList = []

const listWithZeroTotalLikes = [
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 0,
        __v: 0
    }
]

const listWithOneBlog = [
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    }
]

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5, // 12
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12, // 24
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10, // 34
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2, // 36
        __v: 0
    }
]

describe("total likes", () => {

    test("total likes, one blog input", () => {
        const result = totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test("total likes, multiple blogs input", () => {
        const result = totalLikes(blogs)
        assert.strictEqual(result, 36)
    })

    test("total likes, empty list input", () => {
        const result = totalLikes(emptyList)
        assert.strictEqual(result, 0)
    })

    test("total likes, zero total input", () => {
        const result = totalLikes(listWithZeroTotalLikes)
        assert.strictEqual(result, 0)
    })

})


describe("favorite blog", () => {

    test("favorite blog, one blog input", () => {
        const result = favoriteBlog(listWithOneBlog)
        assert.strictEqual(result, listWithOneBlog[0])
    })

    test("favorite blog, multiple blogs input", () => {
        const result = favoriteBlog(blogs)
        assert.strictEqual(result._id, "5a422b3a1b54a676234d17f9")
    })

    test("favorite blog, empty list input", () => {
        const result = favoriteBlog(emptyList)
        assert.deepStrictEqual(result, [])
    })

    test("favorite blog, zero total input", () => {
        const result = favoriteBlog(listWithZeroTotalLikes)
        assert.strictEqual(result._id, "5a422aa71b54a676234d17f8")
    })

})


describe("most blogs", () => {

    test("most blogs, one blog input", () => {
        const result = mostBlogs(listWithOneBlog)
        assert.strictEqual(result.author, listWithOneBlog[0].author)
    })

    test("most blogs, multiple blogs input", () => {
        const authorWithMostBlogs = "Robert C. Martin"
        const result = mostBlogs(blogs)
        assert.strictEqual(result.author, authorWithMostBlogs)
        assert.strictEqual(result.blogs, 3)
    })

    test("most blogs, empty list input", () => {
        const result = mostBlogs(emptyList)
        assert.deepStrictEqual(result, [])
    })
})


describe("most likes", () => {

    test("most likes, one blog input", () => {
        const result = mostLikes(listWithOneBlog)
        assert.strictEqual(result.author, listWithOneBlog[0].author)
    })

    test("most likes, multiple blogs input", () => {
        const mostCommonAuthor = "Edsger W. Dijkstra"
        const result = mostLikes(blogs)
        assert.strictEqual(result.author, mostCommonAuthor)
        assert.strictEqual(result.likes, 17)
    })

    test("most likes, empty list input", () => {
        const result = mostLikes(emptyList)
        assert.deepStrictEqual(result, [])
    })
})



