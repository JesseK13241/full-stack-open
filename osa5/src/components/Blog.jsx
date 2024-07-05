import { useState } from 'react'

const Blog = ({ blog }) => {

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
          LIKES: {blog.likes} <button>LIKE</button>
          <br />
          USER: {blog.user.username}
        </div>
      </div>
    </>

  )
}

// , 

export default Blog