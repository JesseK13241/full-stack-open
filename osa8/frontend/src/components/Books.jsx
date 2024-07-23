import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from "../queries"
import PropTypes from 'prop-types'

const Books = (props) => {

  const result = useQuery(ALL_BOOKS)
  if (!result.data || !props.show) {
    return null
  }

  const books = result.data.allBooks

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
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
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
