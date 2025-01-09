import axios from "axios";
import { FullArticle } from "../model/types";

export const fetchArticleBySlug = async (
  slug: string
): Promise<FullArticle> => {
  const response = await axios.get<FullArticle>(
    `https://blog-platform.kata.academy/api/articles/${slug}`
  );
  console.log("Raw server response:", response.data); // Логируем сырые данные
  return response.data;
};