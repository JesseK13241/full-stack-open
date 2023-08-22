import { useState } from 'react'

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </tr>)
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  if (total > 0) {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={neutral}/>
            <StatisticLine text="bad" value={bad}/>
            <StatisticLine text="all" value={total}/>
            <StatisticLine text="average" value={((good - bad)/total).toFixed(4)}/>
            <StatisticLine text="positive" value={`${((good/total) * 100).toFixed(1)} %`}/>
          </tbody>
        </table>
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
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(good + 1)} />
      <Button text="bad" handleClick={() => setBad(good + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App