import { Outlet } from "react-router-dom";
import Navbar from "./common/navbar";
import Footer from "./common/Footer";

const AppLayout = () => {
    return (
        <div className="bg-[#dde7f5] h-screen">
            <Navbar/>
                <Outlet/>
            <Footer/>
        </div>
      );
}

export default AppLayout;