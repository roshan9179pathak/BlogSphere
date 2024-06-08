import { useEffect } from "react";
import authservices from "./Appwrite/auth";
import { logout } from "./store/AuthProvider";
import { useDispatch } from "react-redux";
import Footer from "./Components/Footer/Footer";
import { Header } from "./Components";
import { Outlet } from "react-router-dom";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      authservices.authLogout()
      dispatch(logout())
      const message = "Are you sure you want to leave? Your changes may not be saved.";
      event.returnValue = message; // Standard way to set a message
      return message; // For some browsers
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* For this I am using css flex box */}
      <main className="bg-white h-full flex-grow overflow-hidden">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
