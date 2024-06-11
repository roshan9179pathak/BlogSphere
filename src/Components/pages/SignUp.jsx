import React, { useState } from "react";
import { Container, Input } from "../index";
import { useDispatch } from "react-redux";
import { login } from "../../store/AuthProvider";
import authservices from "../../Appwrite/auth";
import './login.css'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
export default function SignUp() {


  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleSignUp = async (data) => {
    // setError('')
    try {
      const user = await authservices.createAccount(data);
      if (user) {
        const userData = await authservices.getCurrentUser();
        if (userData !== null) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      className={` bg-[#f4f7ea] w-[500px] h-[500px] rounded-lg border-2 border-black
       absolute top-0 bottom-0 my-auto left-0 right-0 mx-auto ${'form-container'}
       `}
    >
       {error && (
        <p className="w-full text-center text-red-600 mt-14">{error}</p>
      )}

      <form onSubmit={handleSubmit(handleSignUp)} className="mt-[50px]">
        <Input
          type="text"
          placeholder="Enter your name here..."
          label="Name:-"
          {...register("name", {
            required: true,
          })}
        />

        <Input
          type="email"
          placeholder="Enter your email here..."
          label="Email:-"
          {...register("email", {
            required: true,
            validate: {
              matchPatern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                `Please Enter a valid email address`,
            },
          })}
        />
        <Input
          type="password"
          placeholder="Enter your email here..."
          label="Pass:-"
          {...register("password", {
            required: true,
          })}
        />

        <button
          type="submit"
          className={`${'for-button'} w-[100px] h-9 bg-[#023047] text-white 
            active:bg-white
        rounded-lg absolute left-0 right-0 mx-auto`}
        >
          Sign-Up
        </button>
      </form>

          {!error && 
          <div className={`${'for-instructions'} w-full absolute top-[60%] left-[20px]`}>
          <h3 className="font-semibold">Password Requirenments:</h3>
          <ul >

              <li className="inst-for-mob" style={{display: 'none'}}>Password Should be <span className="text-red-500 font-semibold">8-16 </span>characters long, with 1 special character <span className="text-red-500 font-semibold">ex-'@#$%!*&^'</span>, and a number <span className="text-red-500 font-semibold">'0-9'</span></li>

            <span className="inst-not-mob" style={{display:'block'}}>
            <li>
              Should contain atleast{" "}
              <span className="text-red-500 font-semibold">8-16 characters</span>
            </li>
            <li>
              Should have atleast 1 special character{" "}
              <span className="text-red-500 font-semibold">ex-'@#$%!*&^'</span>
            </li>
            <li>
              Should contain atleast 1 numeric character{" "}
              <span className="text-red-500 font-semibold">'0123456789'</span>
            </li>
            </span>
          </ul>
        </div>
          }

      </div>


          

  );
}
