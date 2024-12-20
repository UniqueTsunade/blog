import InputForm from "@/shared/ui/inputForm";
import LinkToSignIn from "@/shared/ui/link";
import Button from "@/shared/ui/button";
import styles from "./SignInForm.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { signInUserThunk } from "../model/signInUserThunk";
import { useForm, SubmitHandler } from "react-hook-form";
import ServerErrorMessage from "@/shared/ui/errorDisplay/serverErrors";
import { useSelector } from "react-redux";

interface FormValues {
  email: "string";
  password: "string";
}

const SignInForm = () => {
  const {error} = useSelector((state: RootState) => state.signIn);
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(signInUserThunk(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={styles.signInForm}>
        <legend className={styles.legendForm}>Sign In</legend>
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
        <Button type="submit" btnClassName={styles.loginBtn} btnText="Login" />
        {error && (
          <ServerErrorMessage
            errors={error.errors ?? {}}
            message={error.message}
          />
        )}
        <LinkToSignIn
          pClassName={styles.signUpInfo}
          linkClassName={styles.signUpLink}
          to="/sign-up"
          ariaLabel="Sign Up"
          pText="Don’t have an account?"
          linkText="Sign Up."
        />
      </fieldset>
    </form>
  );
};

export default SignInForm;
