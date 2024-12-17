interface InputFormProp {
  htmlFor: string;
  labelText: string;
  type: string;
  id: string;
  placeholder: string;
  labelClassName?: string;
  inputClassName?: string;
  divClassName?: string;
}

const InputForm: React.FC<InputFormProp> = ({
  htmlFor,
  labelText,
  type,
  id,
  placeholder,
  labelClassName,
  inputClassName,
  divClassName,
}) => {
  return (
    <div className={divClassName}>
      <label className={labelClassName} htmlFor={htmlFor}>
        {labelText}
      </label>
      <input
        className={inputClassName}
        type={type}
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputForm;
