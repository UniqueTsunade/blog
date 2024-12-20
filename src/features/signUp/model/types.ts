export interface ServerError {
  errors: {
    [fieldName: string]: string;
  };
  message?: string;
}

export interface SignUpUserState {
  loading: boolean;
  error: ServerError | null;
  data: UserResponse| null;
}

export interface UserResponse {
  user: {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string | null;
  };
}

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}
