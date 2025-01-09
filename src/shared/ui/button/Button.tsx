interface ButtonProps {
  btnText: string;
  type?: "button" | "submit" | "reset";
  btnClassName?: string;
  handleClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ type, btnClassName, btnText, handleClick, disabled = false }) => {
  return (
    <button className={btnClassName} type={type} onClick={handleClick} disabled={disabled}>
      {btnText}
    </button>
  );
};

export default Button;
