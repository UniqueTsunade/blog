import { CustomServerError } from "@/features/articles/model/types";

export const handleCustomError = (payload: unknown): string => {
    if (payload && typeof payload === "object" && "errors" in payload) {
      const customError = payload as CustomServerError;
      return Object.keys(customError.errors)
        .map(key => `${key}: ${customError.errors[key].join(", ")}`)
        .join("; ");
    }
    return "Failed to fetch articles";
  };