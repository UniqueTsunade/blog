import styles from "./SignUpPage.module.scss";
import InputForm from "@/shared/ui/inputForm";
import Button from "@/shared/ui/button";
import LinkToSignIn from "@/shared/ui/link";

const SignUpPage = () => {
  return (
    <div>
      <form>
        <fieldset className={styles.signUpForm}>
          <legend className={styles.legendForm}>Create new account</legend>
          <InputForm
            htmlFor={"username"}
            labelText={"Username"}
            type={"text"}
            id={"username"}
            placeholder={"Username"}
            labelClassName={styles.labelForm}
            inputClassName={styles.inputForm}
            divClassName={styles.textInputContainer}
          />
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
          <InputForm
            htmlFor={"repeatPassword"}
            labelText={"Repeat Password"}
            type={"email"}
            id={"repeatPassword"}
            placeholder={"Password"}
            labelClassName={styles.labelForm}
            inputClassName={styles.inputForm}
            divClassName={styles.textInputContainerLast}
          />
          <div className={styles.userAgreementForm}>
            <input type="checkbox" id="userAgreement" />
            <label htmlFor="userAgreement">
              I agree to the processing of my personal information
            </label>
          </div>
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

export default SignUpPage;
