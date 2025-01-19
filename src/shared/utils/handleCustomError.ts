import { ServerError } from "@/entities/signIn/model/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { CustomServerError } from "../model/types";

export const handleError = (
  action: PayloadAction<CustomServerError | undefined>,
  defaultMessage: string
): string => {
  const errorMessages = action.payload?.errors?.body;
  if (Array.isArray(errorMessages) && errorMessages.length > 0) {
    return errorMessages.join(", ");
  } else {
    console.error("Unexpected error format:", action.payload);
    return defaultMessage;
  }
};

export const formatAuthError = (
  action: PayloadAction<ServerError | undefined>,
  defaultMessage: string
): string => {
  if (!action.payload) return defaultMessage;

  const { errors } = action.payload;

  if (errors.body?.length) {
    return errors.body.join(", ");
  }

  const errorMessages = Object.entries(errors)
    .filter(([key]) => key !== "body")
    .flatMap(([field, message]) => {
      if (Array.isArray(message)) {
        return message.map((msg) => `${field}: ${msg}`);
      }
      return `${field}: ${message}`;
    });

  return errorMessages.length > 0 ? errorMessages.join(", ") : defaultMessage;
};
