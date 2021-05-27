import React, { useState } from 'react';

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

const VotesCount = ({ votes }) => {
  if (votes === 1) {
    return (
      <div>
        has {votes} vote
      </div>
    )
  }
  return (
      <div>
          has {votes} votes
      </div>
  )
}

const App = () => {
  const [selected, setSelected] = useState(0)
  const [allVotes, addVote] = useState(new Array(6).fill(0))

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const randomNumber = (max) => {
    return Math.floor(Math.random() * max);
  }

  // event handler function for "next anecdote" button
  const nextAnecdote = () => setSelected(selected * 0 + randomNumber(anecdotes.length))

  // event handler function for "vote" button
  const vote = () => {
    const copy = [...allVotes]
    copy[selected] += 1
    addVote(copy)
  }

  // finding index of anecdote with maximum votes
  const maxVotes = allVotes.indexOf(Math.max(...allVotes))

  return (
    <div>
      <Header text="Anecdote of the day" />
      {anecdotes[selected]}
      <VotesCount votes={allVotes[selected]} />
      <Button
        text="vote"
        handleClick={vote} 
      />
      <Button 
        text="next anecdote"
        handleClick={nextAnecdote}
       />
      <Header text="Anecdote with most votes" />
      {anecdotes[maxVotes]}
    </div>
  )
}

export default App;
