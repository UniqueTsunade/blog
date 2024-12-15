import axios from "axios";
import { ArticlesResponse } from "../model/types";

export const fetchArticlesFromServer = async ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}): Promise<ArticlesResponse> => {
  const response = await axios.get<ArticlesResponse>(
    `https://blog-platform.kata.academy/api/articles?limit=${limit}&offset=${offset}`
  );
  return response.data;
};
