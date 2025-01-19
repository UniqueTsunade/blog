export interface UserResponse {
  user: {
    email: string;
    token: string;
    username: string;
    bio?: string;
    image?: string | null;
  };
};

export interface SignInFormData {
    email: string;
    password: string;
};

export interface ServerError {
  errors: {
    body?: string[]; 
    [fieldName: string]: string[] | string | undefined;
  };
}