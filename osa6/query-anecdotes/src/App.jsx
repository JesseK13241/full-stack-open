import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import { useNotification } from './NotificationContext'
import Notification from "./components/Notification"

const App = () => {
  const queryClient = useQueryClient()
  const [notification, showNotification] = useNotification()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    showNotification(`Voted anecdote ${anecdote.content}`)
  }

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
      <Notification />
      <AnecdoteForm />
      {anecdotes.map(anecdote =>
        <li key={anecdote.id}>
          {anecdote.content}, votes: {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>Vote</button>
        </li>
      )}
    </div>
  )
}

export default App
