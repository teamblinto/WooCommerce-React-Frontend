import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";


const MainLayout = () => {
  return (
    <div className="">
      <Header />

      {/* <div className="h-[calc(100vh-300px)]"> */}
      <Outlet />
      {/* </div> */}

      <Footer />
    </div>
  );
};

export default MainLayout;
