import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog }) => {

  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async () => {
    await updateBlog({...blog, likes: blog.likes + 1})
  }

  const handleRemove = async () => {
    await removeBlog(blog)
  }

  const hiddenIfDetailsShown = { display: showDetails ? '' : "none" }
  const visibilityToggleText = showDetails ? "hide" : "view"

  return (
    <>
      <div style={blogStyle}>
        Title: '{blog.title}'

        <button onClick={toggleVisibility}>{visibilityToggleText}</button>

        <div style={hiddenIfDetailsShown}>
          <br />
          Author: {blog.author}
          <br />
          URL: {blog.url}
          <br />
          LIKES: {blog.likes} <button onClick={handleLike}>LIKE</button>
          <br />
          USER: {blog.user.username}
          <br />
          <button onClick={handleRemove}>DELETE</button>
        </div>
      </div>
    </>

  )
}

export default Blog