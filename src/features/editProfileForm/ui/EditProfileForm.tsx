import InputForm from "@/shared/ui/inputForm";
import styles from "./EditProfileForm.module.scss";
import { AppDispatch, RootState } from "@/app/store";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/shared/ui/button";
import { updateUser } from "../model/editProfileThunk";
import { getCurrentUser } from "@/features/signIn/model/thunks";

interface FormValues {
  email: string;
  username: string;
  bio: string;
  image: null | string;
}

const EditProfileForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.updateProfile);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(updateUser(data))
      .then((result) => {
        if (updateUser.fulfilled.match(result)) {
          dispatch(getCurrentUser());
        }
      })
      .catch((error) => {
        console.error("SignIn error:", error);
      });
  };

  console.log("data", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={styles.signInForm}>
        <legend className={styles.legendForm}>Edit Profile</legend>
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
            // required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          error={errors.email}
        />
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
          register={register("bio", {
            // required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            maxLength: {
              value: 40,
              message: "Password must be no more than 40 characters",
            },
          })}
          error={errors.bio}
        />
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
            // Добавьте валидацию для URL изображения
            pattern: {
              value: /^(http|https):\/\/[^\s]+$/,
              message: "Invalid URL",
            },
          })}
          error={errors.image}
        />
        <Button type="submit" btnClassName={styles.saveBtn} btnText="Save" />
      </fieldset>
    </form>
  );
};

export default EditProfileForm;
