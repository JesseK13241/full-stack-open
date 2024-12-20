import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const emptyVotes = {
    ...Array.from({ length: anecdotes.length }, () => 0)
  }
  const [votes, setVotes] = useState(emptyVotes)
  
  const nextAnecdote = () => {
    let newSelected = selected
    while (anecdotes.length > 1 && newSelected === selected) {
      newSelected = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(newSelected)
  }

  const vote = (anecdoteId) => {
    const copy = { ...votes }
    copy[anecdoteId] += 1
    setVotes(copy)
  }
  
  // https://stackoverflow.com/a/27376421
  const mostVotes = Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b);

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]}
        <br />
        has {votes[selected]} votes
      </div>
      <button onClick={() => vote(selected)}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotes]}
    </>
  )
}

export default App