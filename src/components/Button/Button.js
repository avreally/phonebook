import "./Button.css";

const Button = ({ className, onClick, value, type }) => {
  return (
    <button className={className} onClick={onClick} type={type}>
      {value}
    </button>
  );
};

export default Button;
