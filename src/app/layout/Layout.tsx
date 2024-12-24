import Header from "@/widgets/header";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <>
      <div>
        <Header />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
