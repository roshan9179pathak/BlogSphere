import { useEffect } from "react";
import authservices from "./Appwrite/auth";
import { logout } from "./store/AuthProvider";
import { useDispatch } from "react-redux";
import Footer from "./Components/Footer/Footer";
import { Header } from "./Components";
import { Outlet } from "react-router-dom";

function App() {
 

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* For this I am using css flex box */}
      <main className="flex-grow flex bg-[#F7F4ED] ">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
