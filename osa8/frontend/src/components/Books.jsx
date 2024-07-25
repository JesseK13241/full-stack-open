import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import PropTypes from "prop-types"

const Books = ({ show }) => {
  console.log("Rendering Books.")
  const result = useQuery(ALL_BOOKS)
  if (!result.data || !show) {
    console.log("No results or page hidden")
    return null
  }

  const books = result.data.allBooks
  console.log("Found books:", books)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

Books.propTypes = {
  show: PropTypes.bool
}

export default Books
