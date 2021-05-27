import React, { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const VotesCount = (props) => {
  if (props.votes === 1) {
    return (
      <div>
        has {props.votes} vote
      </div>
    )
  }
  return (
      <div>
          has {props.votes} votes
      </div>
  )
}

const App = () => {
  const [selected, setSelected] = useState(0)
  const [allVotes, addVote] = useState(new Array(6).fill(0))

  // console.log(`Array is ${allVotes}`);
  // console.log(allVotes);
  // console.log(allVotes[0]);

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

  const nextAnecdote = () => setSelected(selected * 0 + randomNumber(anecdotes.length))
  // console.log(`Selected is ${selected}`) 

  const vote = () => {
    const copy = [...allVotes]
    // console.log(`First element of array ${copy[0]}`);
    // console.log(copy[selected]);
    copy[selected] += 1
    // console.log(`Array copy is ${copy}`);
    addVote(copy)
  }
  
  // console.log(randomNumber(anecdotes.length));
  // const votes = new Array(6).fill(0)
  // console.log(votes);

  return (
    <div>
      <Header text='Anecdote of the day' />
      {anecdotes[selected]}
      <VotesCount votes={allVotes[selected]} />
      <Button
        text='vote'
        handleClick={vote} 
      />
      <Button 
        text='next anecdote'
        handleClick={nextAnecdote}
       />
      <Header text='Anecdote with most votes' />
    </div>
  )
}

export default App
