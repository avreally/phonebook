import "./Input.css";

const Input = ({ className, value, onChange, type }) => {
  return (
    <input
      className={className}
      value={value}
      onChange={onChange}
      type={type}
    />
  );
};

export default Input;
