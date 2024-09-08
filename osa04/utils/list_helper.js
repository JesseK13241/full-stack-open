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
    // ['Michael Chan', 'Edsger W. Dijkstra', 'Edsger W. Dijkstra', 'Robert C. Martin', 'Robert C. Martin', 'Robert C. Martin']

    const authorCounts = _.countBy(authors)
    console.log("authorCounts", authorCounts)
    // authorCounts { 'Michael Chan': 1, 'Edsger W. Dijkstra': 2, 'Robert C. Martin': 3 }

    const mostCommonAuthor = _.max(_.keys(authorCounts), author => authorCounts[author])
    console.log("mostCommonAuthor", mostCommonAuthor)

    const frequency = authorCounts[mostCommonAuthor]
    return { "author": mostCommonAuthor, "blogs": frequency }
}

const mostLikes = (blogs) => {

    if (blogs.length === 0) { return [] }

    const groupedByAuthor = _.groupBy(blogs, "author")
    // groupedByAuthor { 'Michael Chan': [ { _id: '5a422a851b54a676234d17f7', title: 'React patterns', ...
    console.log("groupedByAuthor", groupedByAuthor)

    const totalLikesByAuthor = _.mapValues(groupedByAuthor, blogs =>
        _.sumBy(blogs, "likes")
    )
    // totalLikesByAuthor { 'Michael Chan': 7, 'Edsger W. Dijkstra': 17, 'Robert C. Martin': 12 }
    console.log("totalLikesByAuthor", totalLikesByAuthor)

    const mostLikedAuthors = _.sortBy(_.toPairs(totalLikesByAuthor), 1)
    // mostLikedAuthors [[ 'Michael Chan', 7 ], [ 'Robert C. Martin', 12 ], [ 'Edsger W. Dijkstra', 17 ]]
    console.log("mostLikedAuthors", mostLikedAuthors)

    const len = mostLikedAuthors.length - 1
    return { "author": mostLikedAuthors[len][0], "likes": mostLikedAuthors[len][1] }
}

module.exports = {
    totalLikes, favoriteBlog, mostBlogs, mostLikes
}