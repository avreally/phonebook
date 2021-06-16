import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ])
  // console.log('Persons are', persons);
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()

    const findName = persons.find(person => person.name === newName)

    if (findName !== undefined) {
      window.alert(`${findName.name} is already added to phonebook`)
      setNewName('')
    } else {
      const allPersons = {
        name: newName,
      }
  
      setPersons(persons.concat(allPersons))
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName} >
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <p key={person.name}>
            {person.name}
          </p>
          )}
      </div>
    </div>
  )
}

export default App