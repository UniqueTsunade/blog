export enum Status {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

// Интерфейс для данных статьи
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

// Тип для автора
export interface Author {
  bio: string;
  image: string;
  username: string;
  following: boolean;
}

// Интерфейс для ответа сервера
export interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

export interface FullArticle {
  article: Article;
}
