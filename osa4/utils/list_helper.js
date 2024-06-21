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
    console.log("Input: ", blogs)
    const sortedByLikes = [...blogs].sort((a, b) => a.likes - b.likes).reverse()
    console.log("Sorted: ", sortedByLikes)
    return sortedByLikes[0]
}

module.exports = {
    totalLikes, favoriteBlog
}