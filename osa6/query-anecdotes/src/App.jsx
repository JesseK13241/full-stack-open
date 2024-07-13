import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests' 

const App = () => {
  const queryClient = useQueryClient()
  
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, important: true })
  }

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
      <h2>Anecdotes app</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
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