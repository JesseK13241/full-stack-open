import { useState } from 'react'
import PropTypes from 'prop-types'

function BlogForm({
  createBlog, user, setNotificationMessage, blogFormRef, blogs, setBlogs,
}) {
  const [newBlogInput, setNewBlogInput] = useState({ title: '', author: '', url: '' })

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlogObject = { ...newBlogInput, user }
      const createdBlogResult = await createBlog(newBlogObject)
      setNotificationMessage(`New blog titled: '${newBlogInput.title}' by '${newBlogInput.author}' added!`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      setNewBlogInput({ title: '', author: '', url: '' })
      setBlogs(blogs.concat(createdBlogResult))
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      setNotificationMessage(`Something went wrong ${exception}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={handleNewBlog}>
        title:
        {' '}
        <input
          value={newBlogInput.title}
          onChange={({ target }) => setNewBlogInput({ ...newBlogInput, title: target.value })}
        />
        <br />
        author:
        {' '}
        <input
          value={newBlogInput.author}
          onChange={({ target }) => setNewBlogInput({ ...newBlogInput, author: target.value })}
        />
        <br />
        url:
        {' '}
        <input
          value={newBlogInput.url}
          onChange={({ target }) => setNewBlogInput({ ...newBlogInput, url: target.value })}
        />
        <br />
        <button type="submit">create</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  user: PropTypes.isRequired,
  setNotificationMessage: PropTypes.func.isRequired,
  blogFormRef: PropTypes.isRequired,
  blogs: PropTypes.isRequired,
  setBlogs: PropTypes.func.isRequired,
}

export default BlogForm
