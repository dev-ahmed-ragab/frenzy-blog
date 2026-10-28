import { Outlet } from "react-router-dom";
import Navbar from "./common/navbar";
import Footer from "./common/Footer";
import { Toaster } from "react-hot-toast";

const AppLayout = () => {
  return (
    <div className="bg-[#dde7f5] min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1f2937",
              color: "#ffffff",
              borderRadius: "16px",
              padding: "12px 20px",
              fontSize: "14px",
              fontWeight: 500,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#ffffff",
              },
            },
          }}
        />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
