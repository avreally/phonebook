import React, { useState } from 'react'

const Persons = ({ persons, newFilter }) => {
  const filterItems = (arr, query) => {
    return arr.filter(el => el.name.toLowerCase().includes(query.toLowerCase()))
  }
  
  const filteredPersons = filterItems(persons, newFilter)

  console.log('result', filteredPersons) 

  if (newFilter !== '') {
    return (
      <div>
        {filteredPersons.map(person =>
          <p key={person.name}>
            {person.name} {person.number}
          </p>
          )}
      </div>
    )  
  } else {
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
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  // console.log('Persons are', persons);
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
    console.log(event.target.value);
  }

  console.log('New filter is', newFilter);
  // const filterResult = filterItems(persons, newFilter)
  // const filterResult = persons.filter(person => person.name === newFilter)
  // console.log(filterResult);

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with <input
          value={newFilter}
          onChange={handleFilter}
          />
        </div>
      <h2>add a new</h2>
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
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  )
}

export default App