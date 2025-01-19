export interface ServerError {
  errors: {
    body?: string[];
    [fieldName: string]: string[] | string | undefined;
  };
}

export interface SignUpUserState {
  loading: boolean;
  error: string | null;
  data: UserResponse | null;
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
