import React, { useState } from "react";
import { Container, Input } from "../index";
import { useDispatch } from "react-redux";
import { login } from "../../store/AuthProvider";
import authservices from "../../Appwrite/auth";
import './login.css'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setError("");
    try {
      const session = await authservices.authLogin(data);
      if (session) {
        const userData = await authservices.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
      setValue("password", "", { shouldValidate: true });
    }
  };

  return (
    <div
      className={`bg-[#f4f7ea] w-[500px] h-[500px] rounded-lg border-2 border-black
       absolute top-0 bottom-0 my-auto left-0 right-0 mx-auto ${'form-container'}
       `}
    >
      {error && (
        <p className="w-full text-center text-red-600 mt-14">{error}</p>
      )}

      <form onSubmit={handleSubmit(handleLogin)} className={`mt-[50px]`}>
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
          placeholder="Enter your password here..."
          label="Pass:-"
          {...register("password", {
            required: true,
          })}
        />

        <button
          type="submit"
          className={`w-[100px] h-9 bg-[#023047] text-white rounded-lg absolute left-0 right-0 mx-auto ${'for-button'}`}
        >
          Sign-In
        </button>
      </form>
    </div>
  );
}
