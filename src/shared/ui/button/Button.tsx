interface ButtonProps {
  btnText: string;
  type?: "button" | "submit" | "reset";
  btnClassName?: string;
}

const Button: React.FC<ButtonProps> = ({ type, btnClassName, btnText }) => {
  return (
    <button className={btnClassName} type={type}>
      {btnText}
    </button>
  );
};

export default Button;
