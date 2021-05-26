import React, { useState } from 'react';

const labelGood = 'good'
const labelNeutral = 'neutral'
const labelBad = 'bad'
const labelAll = 'all'
const labelAverage = 'average'
const labelPositive = 'positive'

const Header = ({ text }) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Stats = ({ text, total }) => {
  return (
    <div>
      <p>{text} {total}</p>
    </div>
  )
}

const Statistics = ({ totalAll, totalGood, totalNeutral, totalBad, average, positive }) => {
  if (totalAll === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <Stats text={labelGood} total={totalGood}/>
      <Stats text={labelNeutral} total={totalNeutral}/>
      <Stats text={labelBad} total={totalBad}/>
      <Stats text={labelAll} total={totalAll}/>
      <Stats text={labelAverage} total={average}/>
      <Stats text={labelPositive} total={positive}/>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const totalAll = good + neutral + bad
  const average = (good - bad) / totalAll
  const positive = good / totalAll * 100 + ' %'

  const feedbackGood = () => setGood(good + 1)
  const feedbackNeutral = () => setNeutral(neutral + 1)
  const feedbackBad = () => setBad(bad + 1)

  return (
    <div>
      <Header text='give feedback' />
      <Button 
        handleClick={feedbackGood}
        text={labelGood}
      />
      <Button 
        handleClick={feedbackNeutral}
        text={labelNeutral}
      /><Button 
        handleClick={feedbackBad}
        text={labelBad}
      />
      <Header text='statistics' />
      <Statistics 
        totalGood={good} 
        totalNeutral={neutral} 
        totalBad={bad}
        totalAll={totalAll}
        average={average}
        positive={positive}
        />
    </div>
  )
}

export default App;