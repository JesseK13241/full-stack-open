import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  if (total > 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {total}</p>
        <p>average {(good - bad)/(total) || 0}</p>
        <p>positive {good/total || 0}</p>
      </>
    )
  }

  return <p>No feedback given</p>
  
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App