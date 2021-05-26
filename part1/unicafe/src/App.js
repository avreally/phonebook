import React, { useState } from 'react';

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
      <Stats text={props.labelGood} total={props.totalGood}/>
      <Stats text={props.labelNeutral} total={props.totalNeutral}/>
      <Stats text={props.labelBad} total={props.totalBad}/>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const labelGood = 'good'
  const labelNeutral = 'neutral'
  const labelBad = 'bad'

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
        labelGood={labelGood}
        labelNeutral={labelNeutral}
        labelBad={labelBad}
        totalGood={good} 
        totalNeutral={neutral} 
        totalBad={bad}/>
    </div>
  )
}

export default App;