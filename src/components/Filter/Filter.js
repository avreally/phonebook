import { Input } from "../../components";
import "./Filter.css";

const Filter = ({ newFilter, handleFilter }) => {
  return (
    <div className="filter">
      Search:{" "}
      <Input
        className="input-field"
        value={newFilter}
        onChange={handleFilter}
        type="search"
      />
    </div>
  );
};

export default Filter;
