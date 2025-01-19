import InputForm from "@/shared/ui/inputForm";
import styles from "./EditProfileForm.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@/shared/ui/button";
import { getCurrentUser } from "@/entities/signIn/model/signInThunks";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import ServerErrorMessage from "@/shared/ui/errorDisplay/serverErrors";
import { useAppDispatch } from "@/shared/lib/store/storeHooks";
import { RootState } from "@/shared/lib/store/types";
import { updateUser } from "@/entities/userUpdate";

interface FormValues {
  email: string;
  username: string;
  bio?: string;
  image?: null | string;
}

const EditProfileForm = () => {
  const { error } = useSelector((state: RootState) => state.updateUserProfile);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    (data) => {
      const updatedData: Partial<FormValues> = {
        email: data.email,
        username: data.username,
      };

      if (data.bio) {
        updatedData.bio = data.bio;
      }
      if (data.image) {
        updatedData.image = data.image;
      }

      dispatch(updateUser(updatedData as FormValues))
        .then((result) => {
          if (updateUser.fulfilled.match(result)) {
            dispatch(getCurrentUser());
          }
        })
        .catch((error) => {
          console.error("SignIn error:", error);
        });
    },
    [dispatch]
  );

  const usernameInput = (
    <InputForm
      htmlFor="editProfileUsername"
      labelText="Username"
      type="text"
      id="editProfileUsername"
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
      htmlFor="editProfileEmail"
      labelText="Email address"
      type="email"
      id="editProfileEmail"
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

  const bioInput = (
    <InputForm
      htmlFor="editProfileBio"
      labelText="Bio"
      type="text"
      id="editProfileBio"
      name="bio"
      placeholder="Bio"
      labelClassName={styles.labelForm}
      inputClassName={styles.inputForm}
      divClassName={styles.textInputContainer}
    />
  );

  const avatarImageInput = (
    <InputForm
      htmlFor="editProfileImage"
      labelText="Avatar image (url)"
      type="text"
      id="editProfileImage"
      name="avatarImage"
      placeholder="Avatar image"
      labelClassName={styles.labelForm}
      inputClassName={styles.inputForm}
      divClassName={styles.textInputContainer}
      register={register("image", {
        pattern: {
          value: /^(http|https):\/\/[^\s]+$/,
          message: "Invalid URL",
        },
      })}
      error={errors.image}
    />
  );

  const errorMessage = error && <ServerErrorMessage error={error} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={styles.signInForm}>
        <legend className={styles.legendForm}>Edit Profile</legend>
        {usernameInput}
        {emailInput}
        {bioInput}
        {avatarImageInput}
        <Button type="submit" btnClassName={styles.saveBtn} btnText="Save" />
        {errorMessage}
      </fieldset>
    </form>
  );
};

export default EditProfileForm;
