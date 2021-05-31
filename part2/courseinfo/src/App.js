import React from 'react';

const MainHeading = ({ mainHeading }) => {
  return (
    <h1>{mainHeading}</h1>
  )
}

// const Content = ({ coursesContent }) => {
//   // const result = courses.parts.map(part =>
//   //   <p key={part.id}>{part.name} {part.exercises}</p>)
//   // const courseContent = courses.map(course =>
//   //   <p key={course.id}>{course.parts}</p>)
//   return (
//     <div>
//       {coursesContent}
//       {/* <Part coursesContent={coursesContent} /> */}
//     </div>
//   )
// }

const Total = ({ courses }) => {
  let initialValue = 0
  const sum = courses.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises, initialValue
    )
  return(
    <p><b>Number of exercises {sum}</b></p>
  ) 
}

const Header = ({ courseName }) => {
  return (
    <div>
      <h2>{courseName}</h2>
    </div>
  )
}

const Course = ({ courses }) => {
  const coursesContent = courses.map(course =>
    <div key={course.id}>
      <Header courseName={course.name} />
      <div>{course.parts.map(part =>
        <p key={part.id}>{part.name} {part.exercises}</p>)}</div>
      <Total courses={course.parts} />
    </div>
  )
  // const courseName = courses.map(course =>
  //   <p key={course.id}>{course.name}</p>)
  return (
    <div>
      {coursesContent}
      {/* <Content coursesContent={coursesContent} /> */}
    </div>
  )
}

const App = () => {
  const mainHeading = 'Web development curriculum'
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <MainHeading mainHeading={mainHeading} />
      <Course courses={courses} />
    </div>
  )
}

export default App
