const assert = require("node:assert")
const { test, describe } = require("node:test")
const { totalLikes, favoriteBlog, mostBlogs } = require("../utils/list_helper")

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

    test("when list has only one blog equals the likes of that", () => {
        const result = totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test("sum for a list with multiple blogs", () => {
        const result = totalLikes(blogs)
        assert.strictEqual(result, 36)
    })

    test("empty list", () => {
        const result = totalLikes(emptyList)
        assert.strictEqual(result, 0)
    })

    test("list where total likes is zero", () => {
        const result = totalLikes(listWithZeroTotalLikes)
        assert.strictEqual(result, 0)
    })

})


describe("favorite blog", () => {

    test("list with one blog returns the list", () => {
        const result = favoriteBlog(listWithOneBlog)
        assert.strictEqual(result, listWithOneBlog[0])
    })

    test("multiple blogs returns the most liked blog", () => {
        const result = favoriteBlog(blogs)
        assert.strictEqual(result._id, "5a422b3a1b54a676234d17f9")
    })

    test("empty list", () => {
        const result = favoriteBlog(emptyList)
        assert.deepStrictEqual(result, [])
    })

    test("list where total likes is zero", () => {
        const result = favoriteBlog(listWithZeroTotalLikes)
        assert.strictEqual(result._id, "5a422aa71b54a676234d17f8")
    })

})


describe("most blogs", () => {

    test("list with one blog", () => {
        const result = mostBlogs(listWithOneBlog)
        assert.strictEqual(result.author, listWithOneBlog[0].author)
    })

    test("multiple blogs returns the author with most blogs", () => {
        const mostCommonAuthor = "Robert C. Martin"
        const result = mostBlogs(blogs)
        assert.strictEqual(result.author, mostCommonAuthor)
    })

    test("empty list", () => {
        const result = mostBlogs(emptyList)
        assert.deepStrictEqual(result, [])
    })
})


