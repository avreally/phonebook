import React, { useState } from 'react';

const labelGood = 'good'
const labelNeutral = 'neutral'
const labelBad = 'bad'
const labelAll = 'all'
const labelAverage = 'average'
const labelPositive = 'positive'

const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick} >
      {props.text}
    </button>
  )
}

const Stats = (props) => {
  return (
    <div>
      <p>{props.text} {props.total}</p>
    </div>
  )
}

const Details = (props) => {
  return (
    <div>
      <Stats text={labelGood} total={props.totalGood}/>
      <Stats text={labelNeutral} total={props.totalNeutral}/>
      <Stats text={labelBad} total={props.totalBad}/>
      <Stats text={labelAll} total={props.totalAll}/>
      <Stats text={labelAverage} total={props.average}/>
      <Stats text={labelPositive} total={props.positive}/>
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
      <Details 
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