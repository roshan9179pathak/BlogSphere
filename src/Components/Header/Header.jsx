import React, { useState } from "react";
import logo from "./blog.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Container, LogoutBtn, Button } from "../index";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(true);

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

  const handleIcon = () => {
    if (isChecked === false) setIsChecked(true);
    else setIsChecked(false);
  };

   const handleClick = (item_slug) => {
    setIsChecked(false);
    navigate(item_slug);
  };

  const handleSignUp = () => {
    setIsChecked(false);
    navigate("sign-up");
  };



  return (
    <Container className="sticky top-0 z-30">
      <header className="">
        <div
          className={`w-full h-14 shadow-lg bg-[#F7F4ED] ${"header-container"}`}
        >
          <Link to={""}>
            <img
              className={`w-10 absolute top-[5px] left-[10px] ${"mob-logo"}`}
              src={logo}
              alt=""
            />
          </Link>

          <input
            type="checkbox"
            checked={isChecked}
            id="check"
            style={{ display: "none" }}
          />
          <label htmlFor="check" className={`${"hamburger-menu"}`}>
            <FontAwesomeIcon
              icon={faBars}
              className={`open`}
              onClick={handleIcon}
            />
            <FontAwesomeIcon
              icon={faXmark}
              className={`close`}
              onClick={handleIcon}
            />
          </label>

          <div
            className={`w-[80%] flex justify-end ${"mob-menu"}
        `}
          >
            <ul className={`ml-auto list-none ${"mob-ul"} `}>
              <label htmlFor="check">
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name} className={`${"mob-li"}`}>
                      <button
                        className={`w-[60px] hover:scale-105 hover:font-bold duration-300 h-8 rounded-md font-medium text-slate-800 ${"header-options"}`}
                        onClick={() => handleClick(item.slug)}
                      >
                        {item.name}
                      </button>
                    </li>
                  ) : null
                )}{" "}
                {authStatus && (
                  <li className={`${"mob-logout"}`}>
                    
                    <LogoutBtn>LogOut</LogoutBtn>
                    
                  </li>
                )}
                {!authStatus && (
                  <li className={`${"sign-up-mob"}`}>
                    <Button
                      className={`inline-bock bg-[#023047] text-white px-6 py-2 duration-200 active:bg-red-500 rounded-full relative top-[-4px] `}
                      onClick={handleSignUp}
                    >
                      Sign-Up
                    </Button>
                  </li>
                )}
              </label>
            </ul>
          </div>
        </div>
      </header>
    </Container>
  );
}
