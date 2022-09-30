import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function HomeLayout() {
  return (
    <div className="homePageContainer">
      <Toaster />
      <Header />
      <Outlet />
    </div>
  );
}

export default HomeLayout;
