import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {

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
    try {
      const updatedBlog = await updateBlog({...blog, likes: blog.likes + 1})
      console.log("Updated blog likes:")
      console.log(updatedBlog)
    } catch (error) {
      console.log("ERROR updating likes: ", error)
    }
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
        </div>
      </div>
    </>

  )
}

export default Blog