import "./Filter.css";

const Filter = ({ newFilter, handleFilter }) => {
  return (
    <div className="filter">
      Search:{" "}
      <input className="inputField" value={newFilter} onChange={handleFilter} />
    </div>
  );
};

export default Filter;
