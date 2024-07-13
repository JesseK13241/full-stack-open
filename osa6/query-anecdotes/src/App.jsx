import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './requests'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isError ) {
    return <div>anecdote service not available</div>
  }

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  return(
    <div>
      <AnecdoteForm />
      {anecdotes.map(anecdote =>
        <li key={anecdote.id}>
          {anecdote.content}, votes: {anecdote.votes}
          <button>Vote</button>
        </li>
      )}
    </div>
  )
}

export default App