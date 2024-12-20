import InputForm from "@/shared/ui/inputForm";
import Button from "@/shared/ui/button";
import LinkToSignIn from "@/shared/ui/link";

import styles from "./SignUpForm.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { signUpUserThunk } from "../model/signUpUserThunk";
import { useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import ValidationErrorMessage from "@/shared/ui/errorDisplay/validatioErrors";
import ServerErrorMessage from "@/shared/ui/errorDisplay/serverErrors";

interface FormValues {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  userAgreement: boolean;
}

const SignUpForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.signUp);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(signUpUserThunk(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={styles.signUpForm}>
        <legend className={styles.legendForm}>Create new account</legend>
        <InputForm
          htmlFor="signUpUsername"
          labelText="Username"
          type="text"
          id="signUpUsername"
          name="username"
          placeholder="Username"
          labelClassName={styles.labelForm}
          inputClassName={styles.inputForm}
          divClassName={styles.textInputContainer}
          register={register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
            maxLength: {
              value: 20,
              message: "Username must be no more than 20 characters",
            },
          })}
          error={errors.username}
        />
        <InputForm
          htmlFor="signUpEmail"
          labelText="Email address"
          type="email"
          id="signUpEmail"
          name="email"
          placeholder="Email address"
          labelClassName={styles.labelForm}
          inputClassName={styles.inputForm}
          divClassName={styles.textInputContainer}
          register={register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          error={errors.email}
        />
        <InputForm
          htmlFor="signUpPassword"
          labelText="Password"
          type="password"
          id="signUpPassword"
          name="password"
          placeholder="Password"
          labelClassName={styles.labelForm}
          inputClassName={styles.inputForm}
          divClassName={styles.textInputContainer}
          register={register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            maxLength: {
              value: 40,
              message: "Password must be no more than 40 characters",
            },
          })}
          error={errors.password}
        />
        <InputForm
          htmlFor="signUprepeatPassword"
          labelText="Repeat Password"
          type="password"
          id="signUprepeatPassword"
          name="repeatPassword"
          placeholder="Password"
          labelClassName={styles.labelForm}
          inputClassName={styles.inputForm}
          divClassName={styles.textInputContainerLast}
          register={register("repeatPassword", {
            required: "Repeat password is required",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          error={errors.repeatPassword}
        />
        <div className={styles.userAgreementForm}>
          <input
            type="checkbox"
            id="userAgreement"
            name="userAgreement"
            {...register("userAgreement", {
              required: "You must agree to the terms",
            })}
          />
          <label htmlFor="userAgreement">
            I agree to the processing of my personal information
          </label>
          <ValidationErrorMessage
            errorClassName={styles.secondRowElement}
            error={errors.userAgreement}
          />
        </div>
        <Button
          type="submit"
          btnClassName={styles.createBtn}
          btnText="Create"
        />
        {error && (
          <ServerErrorMessage
            errors={error.errors ?? {}}
            message={error.message}
          />
        )}
        <LinkToSignIn
          pClassName={styles.signInInfo}
          linkClassName={styles.signInLink}
          to="/sign-in"
          ariaLabel="Sign In"
          pText="Already have an account?"
          linkText="Sign In."
        />
      </fieldset>
    </form>
  );
};

export default SignUpForm;
