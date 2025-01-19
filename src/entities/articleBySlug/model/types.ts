import { Article } from "@/shared/lib/types/articleTypes";
import { Status } from "@/shared/lib/types/sliceTypes";

export interface ArticlesBySlugState {
  status: Status;
  fullArticle: Article | null;
  currentPage: number;
  error: string | null;
  offset: number;
  limit: number;
  isLoading: boolean;
}

export interface CustomServerError {
  errors: {
    body: string[];
  };
}
