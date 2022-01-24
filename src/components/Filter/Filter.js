import { Input } from "../../components";
import "./Filter.css";

const Filter = ({ newFilter, handleFilter }) => {
  return (
    <div className="filter">
      Search:{" "}
      <Input className="inputField" value={newFilter} onChange={handleFilter} />
    </div>
  );
};

export default Filter;
