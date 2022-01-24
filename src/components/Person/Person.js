import { FaTrashAlt, FaUserCircle } from "react-icons/fa";
import { Button } from "../../components";
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
          <Button
            className="button-delete"
            onClick={() => handleDelete(person)}
            value={<FaTrashAlt />}
          />
        </div>
      }
    </div>
  );
};

export default Person;
