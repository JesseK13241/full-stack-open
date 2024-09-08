/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import  { useField } from '../hooks'

const CreateNew = ( props ) => {

  const content = useField("text")
  const author = useField("text")
  const info = useField("text")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.htmlProps.value,
      author: author.htmlProps.value,
      info: info.htmlProps.value,
      votes: 0
    })

    navigate("/")
  }

  const handleReset = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.htmlProps} />
        </div>
        <div>
          author
          <input {...author.htmlProps} />
        </div>
        <div>
          url for more info
          <input {...info.htmlProps} />
        </div>
        <button type="submit">create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew