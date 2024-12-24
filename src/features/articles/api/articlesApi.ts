import axios from "axios";
import { ArticlesResponse, FetchArticlesParams } from "../model/types";

export const fetchArticlesFromServer = async ({
  limit,
  offset,
  signal,
}: FetchArticlesParams): Promise<ArticlesResponse> => {
  const response = await axios.get<ArticlesResponse>(
    `https://blog-platform.kata.academy/api/articles?limit=${limit}&offset=${offset}`,
    { signal }
  );
  return response.data;
};
