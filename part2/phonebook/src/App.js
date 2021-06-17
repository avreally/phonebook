import React, { useState } from 'react'

const Filter = ({ newFilter, handleFilter }) => {
  return (
    <div>
      filter shown with <input
        value={newFilter}
        onChange={handleFilter}
      />
    </div>
  )
}

const Form = ({ addName, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return(
    <form onSubmit={addName} >
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const Person = ({ persons }) => {
  return (
    <div>
      {persons.map(person =>
        <p key={person.name}>
          {person.name} {person.number}
        </p>
        )}
    </div>
  )
}

const Persons = ({ persons, newFilter }) => {
  const filterItems = (arr, query) => {
    return arr.filter(el => el.name.toLowerCase().includes(query.toLowerCase()))
  }
  
  const filteredPersons = filterItems(persons, newFilter)

  if (newFilter !== '') {
    return <Person persons={filteredPersons}/>
  } else {
    return <Person persons={persons} />
  }
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const addName = (event) => {
    event.preventDefault()

    const findName = persons.find(person => person.name === newName)

    if (findName !== undefined) {
      window.alert(`${findName.name} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      const allPersons = {
        name: newName,
        number: newNumber,
      }
  
      setPersons(persons.concat(allPersons))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  } 

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        newFilter={newFilter} 
        handleFilter={handleFilter}
      />
      <h2>Add a new</h2>
      <Form 
        addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
       />
      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        newFilter={newFilter}
        />
    </div>
  )
}

export default App