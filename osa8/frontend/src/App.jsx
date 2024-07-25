import { useState, useEffect } from "react"

import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import Notify from "./components/Notify"
import { ALL_BOOKS, BOOK_ADDED } from "./queries.js"
import { useApolloClient, useSubscription } from "@apollo/client"

const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const [notification, setNotification] = useState("")
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const newBook = data.data.bookAdded
      console.log("New book object:", newBook)
      setNotification(`Book '${newBook.title}' was added.`)
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(newBook)
        }
      })
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
      <Notify errorMessage={notification} />

      {token ? (
        <>
          <p>{username} logged in</p>
          <button onClick={logout}>logout</button>
        </>
      ) : (
        <LoginForm
          setError={setNotification}
          setToken={setToken}
        />
      )}

      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button
          onClick={() => setPage("add")}
          disabled={!token}>
          add book
        </button>
      </div>

      <Authors
        show={page === "authors"}
        setError={setNotification}
        token={token}
      />
      <Books show={page === "books"} />
      <NewBook
        show={page === "add"}
        setError={setNotification}
        setPage={setPage}
      />
    </>
  )
}

export default App
