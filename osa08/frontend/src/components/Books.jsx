import { useQuery } from "@apollo/client"
import { useEffect, useState} from "react"
import { ALL_BOOKS } from "../queries"
import PropTypes from "prop-types"

const Books = ({ show }) => {
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [genreToShow, setGenreToShow] = useState("")

  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (result.data) {
      const foundBooks = result.data.allBooks
      setBooks(foundBooks)
      const availableGenres = foundBooks.reduce((acc, book) => {
        book.genres.forEach(genre => {
          if (!acc.includes(genre)) {
            acc.push(genre);
          }
        });
        return acc;
      }, []);
      
      setGenres(availableGenres);
    }
  }, [result.data]);

  if (!result.data || !show) {
    return null
  }

  const filteredBooks = genreToShow 
  ? books.filter(book => book.genres.includes(genreToShow))
  : books

  return (
    <div>
      <h2>books</h2>

      {genreToShow ? <p>in genre {genreToShow}</p> : ""}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map(book => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.map(genre => (
        <button style={genre === genreToShow ? {fontWeight: "bold"} : {}} key={genre} onClick={() => setGenreToShow(genre)}>{genre}</button>
      ))}
      <button style={genreToShow === "" ? {fontWeight: "bold"} : {}} onClick={() => setGenreToShow("")}>all genres</button>

    </div>
  )
}

Books.propTypes = {
  show: PropTypes.bool
}

export default Books
