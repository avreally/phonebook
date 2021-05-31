import React from 'react'

const Header = ({ courseName }) => {
  return (
    <div>
      <h2>{courseName}</h2>
    </div>
  )
}

const Content = ({ course }) => {
  return (
      <div>
      <Header courseName={course.name} />
      <div>{course.parts.map(part =>
        <p key={part.id}>{part.name} {part.exercises}</p>)}</div>
      <Total courses={course.parts} />
    </div>
  )
}

const Total = ({ courses }) => {
  let initialValue = 0
  const sum = courses.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises, initialValue
    )
  return(
    <p><b>total of {sum} exercises</b></p>
  ) 
}

const Course = ({ courses }) => {
  const coursesContent = courses.map(course =>
    <Content key={course.id} course={course} />
  )
  return (
    <div>
      {coursesContent}
    </div>
  )
}

export default Course