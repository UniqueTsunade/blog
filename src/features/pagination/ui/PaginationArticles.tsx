import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";


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
        sx={{
          "& .MuiPaginationItem-root": {
            width: 22,
            height: 26,
            fontFamily: "Inter",
            fontSize: "12px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.75)",
          },
          "& .Mui-selected": {
            backgroundColor: "#1890FF !important",
            color: "#FFFFFF",
          },
          "& .MuiPaginationItem-previousNext": {
            color: "rgba(0, 0, 0, 0.75)",
          },
        }}
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
