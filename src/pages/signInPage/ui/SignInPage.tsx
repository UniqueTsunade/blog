import InputForm from "@/shared/ui/inputForm";
import styles from "./SignInPage.module.scss";
import LinkToSignIn from "@/shared/ui/link";
import Button from "@/shared/ui/button";

const SignInPage = () => {
  return (
    <div>
      <form>
        <fieldset className={styles.signInForm}>
          <legend className={styles.legendForm}>Sign In</legend>
          <InputForm
            htmlFor={"email"}
            labelText={"Email address"}
            type={"email"}
            id={"email"}
            placeholder={"Email address"}
            labelClassName={styles.labelForm}
            inputClassName={styles.inputForm}
            divClassName={styles.textInputContainer}
          />
          <InputForm
            htmlFor={"password"}
            labelText={"Password"}
            type={"email"}
            id={"email"}
            placeholder={"Password"}
            labelClassName={styles.labelForm}
            inputClassName={styles.inputForm}
            divClassName={styles.textInputContainer}
          />
          <Button
            type={"submit"}
            btnClassName={styles.createBtn}
            btnText={"Create"}
          />
          <LinkToSignIn
            pClassName={styles.signInInfo}
            linkClassName={styles.signInLink}
            to={"/sign-in"}
            ariaLabel={"Sign In"}
            pText={"Already have an account?"}
            linkText={"Sign In."}
          />
        </fieldset>
      </form>
    </div>
  );
};

export default SignInPage;
