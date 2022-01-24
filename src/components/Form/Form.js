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
        <input
          className="inputField"
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div className="form-number">
        Number:{" "}
        <input
          className="inputField"
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <button className="button-add" type="submit">
        Add contact
      </button>
    </form>
  );
};

export default Form;
