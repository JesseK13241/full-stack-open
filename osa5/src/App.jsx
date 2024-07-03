import { useEffect, useState } from 'react'
import Blog from './components/Blog'
import NotificationBox from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])

  const [newBlog, setNewBlog] = useState({title: "", author:"", url:""})
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const LS_KEY = 'loggedBlogAppUser'

  useEffect(() => {
    console.log("Fetching all the blogs to memory")
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    console.log("Checking localstorage for user")
    const loggedUserJSON = window.localStorage.getItem(LS_KEY)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log("user found from localstorage: ", user)
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

    console.log('logging in with', username, password)
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      console.log("Creating new blog..")
      blogService.create({...newBlog, username: user.username})
      setNewBlog({title: "", author:"", url:""})
    } catch (exception) {
      setErrorMessage('Something went wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }


  }

  const loginForm = () => {
    console.log("rendering loginform")
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    )
  }

  const blogForm = () => {
    console.log("Rendering blog form")
    return (
      <>
      <h2>Create new</h2>
      <form onSubmit={handleNewBlog}>
        {console.log(newBlog)}
        title: <input
          value={newBlog.title}
          onChange={({ target }) => setNewBlog({...newBlog, title: target.value})}
        />
        <br />
        author: <input
          value={newBlog.author}
          onChange={({ target }) => setNewBlog({...newBlog, author: target.value})}
        />
        <br />
        url: <input
          value={newBlog.url}
          onChange={({ target }) => setNewBlog({...newBlog, url: target.value})}
        />
        <br />
        <button type="submit">create</button>
      </form>
      </>
    )
  }

  const logout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  return (
    <div>
      <h2>Blogs</h2>
      <NotificationBox message={errorMessage} />

      {console.log("user inside return div: ", user)}
      {!user && loginForm()}
      {user && <div>
        {console.log(user)}
        <p>{user.username} logged in</p>
        <button onClick={logout}>Logout</button>
        {blogForm()}
        {blogs
        .filter(
          (blog) => blog.user.username === user.username)
        .map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>}
    </div>
  )
}
export default App