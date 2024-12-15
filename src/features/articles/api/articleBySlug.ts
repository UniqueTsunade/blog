import axios from "axios";
import { FullArticle } from "../model/types";

export const fetchArticleBySlug = async (
  slug: string
): Promise<FullArticle> => {
  const response = await axios.get<FullArticle>(
    `https://blog-platform.kata.academy/api/articles/${slug}`
  );
  console.log('API Response:', response.data); 
  return response.data;
};