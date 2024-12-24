export enum Status {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface CustomServerError {
  errors: {
    [fieldName: string]: string[];
  };
  message?: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}

export interface Author {
  bio: string;
  image: string;
  username: string;
  following: boolean;
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

export interface FullArticle {
  article: Article;
}
