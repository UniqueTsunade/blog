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

export interface FullArticle {
  article: Article;
}

export interface ArticleEvaluationResponse {
  article: Article;
}
