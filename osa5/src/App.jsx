import { useEffect, useRef, useState } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import NotificationBox from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

function App() {
  const [blogs, setBlogs] = useState([])

  const [notificationMessage, setNotificationMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const LS_KEY = 'loggedBlogAppUser'

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    async function fetchBlogs() {
      const foundBlogs = await blogService.getAll()
      setBlogs(foundBlogs)
    }
    fetchBlogs();
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(LS_KEY)
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const newUser = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(LS_KEY, JSON.stringify(newUser))
      blogService.setToken(newUser.token)
      setUser(newUser)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('ERROR: wrong credentials')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const updateBlog = async (updatedBlog) => {
    const returnedBlog = await blogService.update(updatedBlog.id, updatedBlog)
    const fixedReturnedBlog = { ...returnedBlog, user: updatedBlog.user }
    setBlogs(blogs.map((blog) => (blog.id === returnedBlog.id ? fixedReturnedBlog : blog)))
    return returnedBlog
  }

  const removeBlog = async (blogToRemove) => {
    if (window.confirm(`Remove blog '${blogToRemove.title}' by '${blogToRemove.author}'?`)) {
      if (blogToRemove.user.username !== user.username) {
        setNotificationMessage("ERROR: can't delete blogs that are not your own!")
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      } else {
        await blogService.remove(blogToRemove.id)
        setBlogs(blogs.filter((blog) => blog.id !== blogToRemove.id))
      }
    }
  }

  return (
    <div>
      <h2>Blogs</h2>
      <NotificationBox message={notificationMessage} />

      {!user
        && (
          <Togglable buttonLabel="login">
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          </Togglable>
        )}
      {user && (
        <div>
          <p>
            {user.username}
            logged in
          </p>
          <button onClick={logout}>Logout</button>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm
              createBlog={blogService.create}
              setNotificationMessage={setNotificationMessage}
              user={user}
              blogFormRef={blogFormRef}
              blogs={blogs}
              setBlogs={setBlogs}
            />
          </Togglable>
          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
              username={user.username}
            />
          ))}
        </div>
      )}
    </div>
  )
}
export default App
