const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    if (blogs.length === 0) { return 0 }
    const total = blogs.reduce(reducer, 0)
    if (isNaN(total)) { return 0 }
    return total
}

module.exports = {
    totalLikes
}