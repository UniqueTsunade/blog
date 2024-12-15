import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import styles from "./PaginationArticles.module.scss";

interface PaginationArticlesProps {
  count: number; 
  page: number; 
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void; 
}

const PaginationArticles: React.FC<PaginationArticlesProps> = ({
  count,
  page,
  onChange,
}) => {
  return (
    <Stack spacing={2} alignItems="center">
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        shape="rounded"
        siblingCount={2} 
        boundaryCount={2}
      />
    </Stack>
  );
};

export default PaginationArticles;
