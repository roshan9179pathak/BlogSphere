import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/AuthProvider";
import authservices from "../../Appwrite/auth";
import { useNavigate } from "react-router-dom";
export default function LogoutBtn({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  
  const handleLogOut = () => {
    authservices.authLogout().then(() => {
      localStorage.removeItem('userSession')
      console.log(`active data removed`);
      dispatch(logout());
      navigate('')
    });
  };

  return (
    <button
      className={`inline-bock bg-[#414141] text-white px-6 py-2 duration-200 active:bg-red-500 rounded-full relative top-[-5px]`}
      onClick={handleLogOut}
    >
      {children}
    </button>
  );
}
