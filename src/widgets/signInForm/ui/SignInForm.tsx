import InputForm from "@/shared/ui/inputForm";
import LinkToSignIn from "@/shared/ui/link";
import Button from "@/shared/ui/button";
import styles from "./SignInForm.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import ServerErrorMessage from "@/shared/ui/errorDisplay/serverErrors";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { useAppDispatch } from "@/shared/lib/store/storeHooks";
import { RootState } from "@/shared/lib/store/types";
import { getCurrentUser, signInUserThunk } from "@/entities/signIn";

interface FormValues {
  email: "string";
  password: "string";
}

const SignInForm = () => {
  const { error } = useSelector((state: RootState) => state.signIn);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    (data) => {
      dispatch(signInUserThunk(data))
        .then((result) => {
          if (signInUserThunk.fulfilled.match(result)) {
            dispatch(getCurrentUser());
          }
        })
        .catch((error) => {
          console.error("SignIn error:", error);
        });
    },
    [dispatch]
  );

  const emailInput = (
    <InputForm
      htmlFor="signInEmail"
      labelText="Email address"
      type="email"
      id="signInEmail"
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
      htmlFor="signInEmailPassword"
      labelText="Password"
      type="password"
      id="signInEmailPassword"
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

  const errorMessage = error && <ServerErrorMessage error={error} />;

  const signUpLink = (
    <LinkToSignIn
      pClassName={styles.signUpInfo}
      linkClassName={styles.signUpLink}
      to="/sign-up"
      ariaLabel="Sign Up"
      pText="Don’t have an account?"
      linkText="Sign Up."
    />
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={styles.signInForm}>
        <legend className={styles.legendForm}>Sign In</legend>
        {emailInput}
        {passwordInput}
        <Button type="submit" btnClassName={styles.loginBtn} btnText="Login" />
        {errorMessage}
        {signUpLink}
      </fieldset>
    </form>
  );
};

export default SignInForm;
