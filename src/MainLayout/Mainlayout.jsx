import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useState } from "react";


const MainLayout = () => {
  const [cartPopUp, setCartPopUp] = useState(false);
  return (
    <div className="">
      <Header setCartPopUp={setCartPopUp} cartPopUp={cartPopUp} />

      {/* <div className="h-[calc(100vh-300px)]"> */}
      <Outlet context={{ setCartPopUp }} />
      {/* </div> */}
      <div className="px-30 my-10" >
          
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
