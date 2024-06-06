import React from "react";
import logo from "./blog.png";
import { Link, useNavigate } from "react-router-dom";
// import './header.css'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Container, LogoutBtn,Button } from "../index";
import { login } from "../../store/AuthProvider";
export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: authStatus,
    },
    {
      name: "AllPosts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "AddPosts",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "Log-In",
      slug: "/login",
      active: !authStatus,
    },
    // {
    //   name: "GetStarted",
    //   slug: "/sign-up",
    //   active: !authStatus,
    // },
  ];

  return (
    <Container className="sticky top-0 z-30">
      <header className="">
        <div className="w-full h-14 shadow-lg bg-[#F7F4ED]">
          <Link to={""}>
            <img
              className={`w-10 absolute top-[5px] left-[10px]`}
              src={logo}
              alt=""
            />
          </Link>

          <div
            className={`w-[80%] absolute top-[15px] right-[50px] flex justify-end
        `}
          >
            <ul className={`flex ml-auto list-none`}>
              {navItems.map((item) =>
                item.active ? (

                    <li key={item.name} className="mx-3 inline-block">
                    <button
                      className="w-[80px] h-8 rounded-md font-bold text-slate-800"
                      onClick={() => navigate(item.slug)}
                    >
                      {item.name}
                    </button>
                  </li>
                  
                ) : null
              )}

              {authStatus && (
                <li>
                  <LogoutBtn>LogOut</LogoutBtn>
                </li>
              )}

              {!authStatus && (
                <li>
                  <Button
                  className='inline-bock bg-[#414141] text-white px-6 py-2 duration-200 active:bg-red-500 rounded-full relative top-[-5px]'

                    onClick={()=>navigate('sign-up')}

                  >Get-Started</Button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </header>
    </Container>
  );
}
