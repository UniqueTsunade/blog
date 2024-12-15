import Header from "@/widgets/header";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import MainLoader from "@/shared/ui/loaders/mainLoader";

const Layout: React.FC = () => {
  const { isLoading } = useSelector((state: RootState) => state.articles);
  return (
    <>
      {isLoading && <MainLoader />}
      <div>
        <Header />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
