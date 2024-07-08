import { useState } from 'react'
import PropTypes from 'prop-types'

function Blog({
  blog, updateBlog, removeBlog, username,
}) {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async () => {
    await updateBlog({ ...blog, likes: blog.likes + 1 })
  }

  const handleRemove = async () => {
    await removeBlog(blog)
  }

  const hiddenIfDetailsShown = { display: showDetails ? '' : 'none' }
  const visibilityToggleText = showDetails ? 'hide' : 'view'

  return (
    <div style={blogStyle}>
      <p id="blogtitle">
        Title:
        {blog.title}
      </p>

      <button onClick={toggleVisibility}>{visibilityToggleText}</button>

      <div style={hiddenIfDetailsShown}>
        <p id="author">
          Author:
          {blog.author}
        </p>

        <p id="url">
          URL:
          {blog.url}
        </p>

        <p id="likes">
          Likes:
          {blog.likes}
        </p>

        <button onClick={handleLike}>LIKE</button>

        <p id="user">
          User:
          {blog.user.username}
        </p>

        {(username === blog.user.username) && <button onClick={handleRemove}>DELETE</button>}

      </div>
    </div>

  )
}

Blog.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}

export default Blog
