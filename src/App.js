import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import "./index.css";
import { Error, Filter, Notification, Form, Persons } from "./components";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const clearForm = () => {
    setNewName("");
    setNewNumber("");
  };

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();

    const findName = persons.find((person) => person.name === newName);

    if (findName !== undefined) {
      if (
        window.confirm(
          `${findName.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((p) => p.id === findName.id);
        const changedPerson = { ...person, number: newNumber };

        personService
          .update(findName.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== findName.id ? person : returnedPerson
              )
            );
            clearForm();
            setNotificationMessage(`Replaced the number of ${newName}`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${newName} has already been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setPersons(persons.filter((person) => person.id !== findName.id));
            clearForm();
          });
      } else {
        clearForm();
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
      clearForm();

      setNotificationMessage(`Added ${newName}`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setNewFilter(event.target.value);
  };

  const handleDelete = (person) => {
    const id = person.id;
    const name = person.name;

    if (window.confirm(`Delete ${name}?`)) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    } else {
      console.log("the user canceled");
    }
  };

  return (
    <div className="wrapper">
      <h1>Phonebook</h1>
      <div className="container">
        <div className="contacts">
          <h2>Contacts</h2>
          <Filter newFilter={newFilter} handleFilter={handleFilter} />
          <Persons
            persons={persons}
            newFilter={newFilter}
            handleDelete={handleDelete}
          />
        </div>
        <div className="add-contact">
          <h2>Add new contact</h2>
          <Form
            addName={addName}
            newName={newName}
            handleNameChange={handleNameChange}
            newNumber={newNumber}
            handleNumberChange={handleNumberChange}
          />
          <Notification message={notificationMessage} />
          <Error message={errorMessage} />
        </div>
      </div>
    </div>
  );
};

export default App;
