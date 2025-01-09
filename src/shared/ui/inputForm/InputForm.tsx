import { forwardRef } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import ErrorMessage from "../errorDisplay/validatioErrors/ValidationErrorMessage";
import ValidationErrorMessage from "../errorDisplay/validatioErrors/ValidationErrorMessage";


interface InputFormProp {
  htmlFor: string;
  labelText: string;
  type?: string;
  id: string;
  name: string;
  placeholder: string;
  labelClassName?: string;
  inputClassName?: string;
  divClassName?: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
  error?: FieldError; 
}

const InputForm = forwardRef<HTMLInputElement, InputFormProp>(
  (
    {
      htmlFor,
      labelText,
      type,
      id,
      name,
      placeholder,
      labelClassName,
      inputClassName,
      divClassName,
      required = false,
      register,
      error,
    },
    ref
  ) => {


    console.log("Регистер:", register)

    return (
      <div className={divClassName}>
        <label className={labelClassName} htmlFor={htmlFor}>
          {labelText}
        </label>
        <input
          ref={ref}
          className={inputClassName}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          {...(register ? register : {})}
          style={{ borderColor: error ? "#F5222D" : "" }}
        />
          {error && <ValidationErrorMessage error={error} />}
      </div>
    );
  }
);

export default InputForm;
