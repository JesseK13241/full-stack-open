import { useState, useEffect } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import Notify from "./components/Notify"
import { BOOK_ADDED } from './queries.js'
import { useApolloClient, useSubscription } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const newBookTitle = data.data.bookAdded.title
      console.log("New book", newBookTitle)
      setErrorMessage(`Book '${newBookTitle}' was added.`)
    }
  })

  useEffect(() => {
    const token = localStorage.getItem("BookApp-user-token")
    if (token) {
      setToken(token)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const username = localStorage.getItem("BookApp-username")

  return (
    <>
      <Notify errorMessage={errorMessage} />
    
      {token ? (
        <>
          <p>{username} logged in</p>
          <button onClick={logout}>logout</button>
        </>
      ) : (
        <LoginForm
          setError={setErrorMessage}
          setToken={setToken}
        />
      )}

      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")} disabled={!token}>add book</button>
      </div>

      <Authors show={page === "authors"} setError={setErrorMessage} token={token}/>
      <Books show={page === "books"} />
      <NewBook show={page === "add"} setError={setErrorMessage} setPage={setPage}/>

    </>
  )
}

export default App
