import { useEffect, useRef, useState } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import NotificationBox from './components/Notification'
import Toggleable from './components/Toggleable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [notificationMessage, setNotificationMessage] = useState(null)
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
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(LS_KEY, JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
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
    const fixedReturnedBlog = {...returnedBlog, user: user}
    setBlogs(blogs.map(blog => blog.id === returnedBlog.id ? fixedReturnedBlog : blog))
    return returnedBlog
  }

  return (
    <div>
      <h2>Blogs</h2>
      <NotificationBox message={notificationMessage} />

      {!user &&
        <Toggleable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Toggleable>
      }
      {user && <div>
        <p>{user.username} logged in</p>
        <button onClick={logout}>Logout</button>
        <Toggleable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm
            createBlog={blogService.create}
            setNotificationMessage={setNotificationMessage}
            user={user}
            blogFormRef={blogFormRef}
            blogs={blogs}
            setBlogs={setBlogs}
          />
        </Toggleable>
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
        )}
      </div>}
    </div>
  )
}
export default App