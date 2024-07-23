import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

const Authors = (props) => {

  const [authorNameToUpdate, setAuthorNameToUpdate] = useState("")
  const [authorYearToUpdate, setAuthorYearToUpdate] = useState(0)
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {refetchQueries: [ { query: ALL_AUTHORS } ]})

  const handleAuthorUpdate = (event) => {
    event.preventDefault()

    console.log('updating author...')
    console.log( { authorNameToUpdate, authorYearToUpdate })
    editAuthor({  variables: { name: authorNameToUpdate, setBornTo: authorYearToUpdate } })

    setAuthorYearToUpdate(0)
  }

  const result = useQuery(ALL_AUTHORS)

  useEffect(() => {
    // Set the initial value of authorNameToUpdate when the component mounts
    if (result.data && result.data.allAuthors.length > 0) {
      setAuthorNameToUpdate(result.data.allAuthors[0].name)
    }
  }, [result.data])

  if (!result.data || !props.show) {
    return null
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={handleAuthorUpdate}>
        <div>
          <label htmlFor="author" >name</label>
          <select 
            id="author" 
            name="author"
            value={authorNameToUpdate} 
            onChange={({ target }) => setAuthorNameToUpdate(target.value)} >
            {authors.map((a) => (
              <option key={a.name} value={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            required
            type="number"
            value={authorYearToUpdate || ""}
            onChange={({ target }) => setAuthorYearToUpdate(parseInt(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

Authors.propTypes = {
  show: PropTypes.bool
}

export default Authors
