export interface ArticleResponse {
  article: Article;
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

export interface CreateArticleData {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}

export interface UpdateArticleData {
  slug: string;
  article: {
    title: string;
    description: string;
    body: string;
  };
}

export interface ServerError {
  errors?: {
    body: string[];
  };
  message?: string;
}
  