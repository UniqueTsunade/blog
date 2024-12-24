import ArticlePreview from "./ArticlePreview";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import Skeleton from "./Skeleton";


const ArticleList: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.articles.isLoading)
  const { currentArticles } = useSelector((state: RootState) => state.pagination);

  const skeleton = [...new Array(5)].map((_, i) => <Skeleton key={i} />);
  const articles = currentArticles.map((article) => (<ArticlePreview key={uuidv4()} article={article} />));


  return (
    <div>
      {isLoading ? skeleton : articles}
    </div>
  );
}
export default ArticleList;
