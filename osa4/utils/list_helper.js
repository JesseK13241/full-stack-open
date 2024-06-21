const _ = require("lodash")

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    if (blogs.length === 0) { return 0 }
    const total = blogs.reduce(reducer, 0)
    if (isNaN(total)) { return 0 }
    return total
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) { return [] }
    const sortedByLikes = [...blogs].sort((a, b) => a.likes - b.likes).reverse()
    return sortedByLikes[0]
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) { return [] }
    const authors = _.map(blogs, "author")
    console.log("authors", authors)
    const authorCounts = _.countBy(authors)
    console.log("authorCounts", authorCounts)
    const mostCommonAuthor = _.max(_.keys(authorCounts), author => authorCounts[author])
    console.log("mostCommonAuthor", mostCommonAuthor)
    const frequency = authorCounts[mostCommonAuthor]
    console.log("frequency", frequency)
    return { "author": mostCommonAuthor, "blogs": frequency }
}

module.exports = {
    totalLikes, favoriteBlog, mostBlogs
}