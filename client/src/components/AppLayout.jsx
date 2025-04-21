import { Outlet } from "react-router-dom";
import Navbar from "./common/navbar";
import Footer from "./common/Footer";
import { Toaster } from "react-hot-toast";

const AppLayout = () => {
    return (
        <div className="bg-[#dde7f5] min-h-screen">
            <Navbar/>
                <Toaster />
                <Outlet/>
            <Footer/>
        </div>
      );
}

export default AppLayout;