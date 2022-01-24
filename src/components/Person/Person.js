import { FaTrashAlt, FaUserCircle } from "react-icons/fa";
import "./Person.css";

const Person = ({ person, handleDelete }) => {
  return (
    <div>
      {
        <div className="person-container">
          <div className="person">
            <div className="person-avatar">
              <FaUserCircle />
            </div>
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
          </button>
        </div>
      }
    </div>
  );
};

export default Person;
