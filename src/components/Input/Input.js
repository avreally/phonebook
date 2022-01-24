import "./Input.css";

const Input = ({ className, value, onChange }) => {
  return <input className={className} value={value} onChange={onChange} />;
};

export default Input;
