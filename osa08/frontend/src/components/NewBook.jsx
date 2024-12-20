import { useState } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_BOOK, ALL_BOOKS } from "../queries"
import PropTypes from "prop-types"

const NewBook = ({ show, setError, setPage }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [published, setPublished] = useState(0)
  const [genre, setGenre] = useState("")
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }]
  })

  if (!show) {
    return null
  }

  const submit = async event => {
    event.preventDefault()

    console.log("creating book...")
    console.log({ title, author, published, genres })
    try {
      await createBook({ variables: { title, author, published, genres } })
      // phone: phone.length > 0 ? phone : undefined

      setTitle("")
      setPublished("")
      setAuthor("")
      setGenres([])
      setGenre("")

      setPage("books")
    } catch (e) {
      setError(e.message)
    }
  }

  const addGenre = () => {
    if (genre) {
      setGenres(genres.concat(genre))
      setGenre("")
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published ? published : ""}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button
            onClick={addGenre}
            type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(", ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

NewBook.propTypes = {
  setError: PropTypes.func,
  show: PropTypes.bool,
  setPage: PropTypes.func
}

export default NewBook
