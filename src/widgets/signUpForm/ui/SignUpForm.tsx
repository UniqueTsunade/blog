import InputForm from "@/shared/ui/inputForm";
import Button from "@/shared/ui/button";
import LinkToSignIn from "@/shared/ui/link";
import styles from "./SignUpForm.module.scss";
import { useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import ValidationErrorMessage from "@/shared/ui/errorDisplay/validatioErrors";
import ServerErrorMessage from "@/shared/ui/errorDisplay/serverErrors";
import { useCallback } from "react";
import { useAppDispatch } from "@/shared/lib/store/storeHooks";
import { RootState } from "@/shared/lib/store/types";
import { signUpUserThunk } from "@/entities/signUp";

interface FormValues {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  userAgreement: boolean;
}

const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const { error } = useSelector((state: RootState) => state.signUp);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    (data) => {
      dispatch(signUpUserThunk(data));
    },
    [dispatch]
  );

  const usernameInput = (
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
  );

  const emailInput = (
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
  );

  const passwordInput = (
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
  );

  const repeatPasswordInput = (
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
  );

  const validationErrorMessage = (
    <ValidationErrorMessage
      errorClassName={styles.secondRowElement}
      error={errors.userAgreement}
    />
  );

  const errorMessage = error && <ServerErrorMessage error={error} />;

  const linkToSignIn = (
    <LinkToSignIn
      pClassName={styles.signInInfo}
      linkClassName={styles.signInLink}
      to="/sign-in"
      ariaLabel="Sign In"
      pText="Already have an account?"
      linkText="Sign In."
    />
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={styles.signUpForm}>
        <legend className={styles.legendForm}>Create new account</legend>
        {usernameInput}
        {emailInput}
        {passwordInput}
        {repeatPasswordInput}
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
          {validationErrorMessage}
        </div>
        <Button
          type="submit"
          btnClassName={styles.createBtn}
          btnText="Create"
        />
        {errorMessage}
        {linkToSignIn}
      </fieldset>
    </form>
  );
};

export default SignUpForm;
