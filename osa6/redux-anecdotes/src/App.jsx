import { useSelector, useDispatch } from 'react-redux'
import { increaseVote } from './reducers/anecdoteReducer'
import AnecdoteForm from "./components/AnecdoteForm.jsx"

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('Voting', id)
    dispatch(increaseVote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a, b) => a.votes - b.votes).reverse().map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <AnecdoteForm />
    </div>
  )
}

export default App