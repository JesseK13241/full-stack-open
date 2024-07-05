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

  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const LS_KEY = 'loggedBlogAppUser'

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
      setErrorMessage('ERROR: wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  return (
    <div>
      <h2>Blogs</h2>
      <NotificationBox message={errorMessage} />

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
            setErrorMessage={setErrorMessage}
            user={user}
            blogFormRef={blogFormRef}
            blogs={blogs}
            setBlogs={setBlogs}
          />
        </Toggleable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={blog.user} />
        )}
      </div>}
    </div>
  )
}
export default App