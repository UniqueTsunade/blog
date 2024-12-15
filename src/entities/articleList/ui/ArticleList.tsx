import styles from "./ArticleList.module.scss";
import ArticlePreview from "../../../shared/ui/articlePreview";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import ArticlePreviewSkeleton from "@/shared/ui/loaders/articlePreviewSkeleton/ArticlePreviewSkeleton";


const ArticleList: React.FC = () => {
  const { currentArticles, isLoading } = useSelector((state: RootState) => state.pagination);

  const skeleton = [...new Array(5)].map((_, i) => <ArticlePreviewSkeleton key={i} />);
  const articles = currentArticles.map((article) => (<ArticlePreview key={uuidv4()} article={article} />)); 

  // console.log("currentArticles",currentArticles)

  return (
    <div>
      {isLoading ? skeleton : articles}
    </div>
  );
}
export default ArticleList;
