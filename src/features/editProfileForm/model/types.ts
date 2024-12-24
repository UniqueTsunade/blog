export interface UserResponse {
  user: {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string | null;
  };
}

export interface FormValues {
  email: string,
  username: string,
  bio: string,
  image: null | string
}