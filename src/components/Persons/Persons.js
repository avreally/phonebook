import { Person } from "../../components";

const Persons = ({ persons, newFilter, handleDelete }) => {
  const filterItems = (items, query) => {
    return items.filter((element) =>
      element.name.toLowerCase().includes(query.toLowerCase())
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

export default Persons;
