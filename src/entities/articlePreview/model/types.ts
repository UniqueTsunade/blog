import { Article } from "@/shared/lib/types/articleTypes";
import { Status } from "@/shared/lib/types/sliceTypes";

export interface ArticlesState {
  status: Status;
  error: string | null;
  currentPage: number;
  currentArticles: Article[];
  articlesCount: number;
  offset: number;
  limit: number;
  isLoading: boolean;
}

export interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

export interface FetchArticlesParams {
  limit: number;
  offset: number;
  signal?: AbortSignal;
}

export interface CustomServerError {
  errors: {
    body: string[];
  };
}