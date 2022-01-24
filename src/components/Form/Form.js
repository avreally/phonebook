import { Button, Input } from "../../components";
import "./Form.css";

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
        Name:{" "}
        <Input
          className="inputField"
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div className="form-number">
        Number:{" "}
        <Input
          className="inputField"
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <Button className="button-add" type="submit" value="Add contact" />
    </form>
  );
};

export default Form;
