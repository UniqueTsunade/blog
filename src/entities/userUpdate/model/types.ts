import { Status } from "@/shared/lib/types/sliceTypes";

export interface UpdateProfileState {
  status: Status;
  error: string | null;
  data: UpdateCurrentUserResponse;
}

export interface UpdateCurrentUserResponse {
  user: {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string | null;
  };
}

export interface FormValues {
  email: string;
  username: string;
  bio?: string;
  image?: null | string;
}

export interface ServerError {
  errors: {
    body?: string[];
    [fieldName: string]: string[] | string | undefined;
  };
}
