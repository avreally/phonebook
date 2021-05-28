import React from 'react';


const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  console.log(course);
  let initialValue = 0
  const sum = course.parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises, initialValue
    )
  return(
    <p>Number of exercises {sum}</p>
  ) 
}

const Part = (props) => {
  // console.log(props);
  return (
    <div>
      {props.part}
    </div>    
  )
}

const Content = ({ course }) => {
  // console.log(course);
  const result = course.parts.map(part =>
    <p key={part.id}>{part.name} {part.exercises}</p>)
  // console.log(result);

  return (
    <div>
      <Part part={result} />
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App
