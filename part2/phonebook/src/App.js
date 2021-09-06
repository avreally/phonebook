import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import "./index.css";
import { FaUserCircle, FaTrashAlt } from "react-icons/fa";
import { IconContext } from "react-icons";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="notification">{message}</div>;
};

const Error = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const Filter = ({ newFilter, handleFilter }) => {
  return (
    <div className="filter">
      Search <input value={newFilter} onChange={handleFilter} />
    </div>
  );
};

const Form = ({
  addName,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addName} className="form">
      <div className="form-name">
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div className="form-number">
        Number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <button className="button-add" type="submit">
        add
      </button>
    </form>
  );
};

const Person = ({ person, handleDelete }) => {
  return (
    <div>
      {
        <div className="person-container">
          <div className="person">
            <IconContext.Provider value={{ size: "3em" }}>
              <div className="person-avatar">
                <FaUserCircle />
              </div>
            </IconContext.Provider>
            <div className="person-info">
              <div>{person.name}</div>
              <div>{person.number} </div>
            </div>
          </div>

          <button
            className="button-delete"
            onClick={() => handleDelete(person)}
            name={person.name}
          >
            <FaTrashAlt />
            {/*delete*/}
          </button>
        </div>
      }
    </div>
  );
};

const Persons = ({ persons, newFilter, handleDelete }) => {
  const filterItems = (arr, query) => {
    return arr.filter((el) =>
      el.name.toLowerCase().includes(query.toLowerCase())
    );
  };
  let resultPersons;

  if (newFilter !== "") {
    resultPersons = filterItems(persons, newFilter);
  } else {
    resultPersons = persons;
  }

  return resultPersons.map((person) => (
    <Person key={person.id} person={person} handleDelete={handleDelete} />
  ));
};

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
        console.log("the user cancelled changing number");
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
    <div>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <div className="container">
        {/*<h2>Phonebook</h2>*/}
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
          {/*<h3>Filter contacts</h3>*/}
          <h2>Add new contact</h2>
          <Form
            addName={addName}
            newName={newName}
            handleNameChange={handleNameChange}
            newNumber={newNumber}
            handleNumberChange={handleNumberChange}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
