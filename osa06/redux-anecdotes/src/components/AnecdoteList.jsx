import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const filteredAnecdotes = anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )

    const dispatch = useDispatch()

    const vote = (id, currentVotes) => {
        console.log('Voting', id)
        dispatch(voteAnecdote(id, currentVotes))
    }

    return (
        <>
            <h2>Anecdotes</h2>
            {filteredAnecdotes.sort((a, b) => a.votes - b.votes).reverse().map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.votes)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList