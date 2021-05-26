import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)

  const randomNumber = (max) => {
    return Math.floor(Math.random() * max);
  }

  const nextAnecdote = () => setSelected(selected * 0 + randomNumber(anecdotes.length))
  console.log(`Selected is ${selected}`) 

  //console.log(randomNumber(anecdotes.length))

  return (
    <div>
      <p>
        {anecdotes[selected]}
      </p>
      <Button 
        text='next anecdote'
        handleClick={nextAnecdote}
       />
    </div>
  )
}

export default App
