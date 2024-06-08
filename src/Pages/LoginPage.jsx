import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { IoMdKey } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

import { errorToast, loginUser, successToast } from "../Utils/utils";

const Login = ({ setLoader }) => {
  const navigate = useNavigate();

  const [togglePassword, setTogglePassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLoginSubmit = async (data, e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const loginResponse = await loginUser(data);
      setLoader(false);
      if (loginResponse.data.error) {
        //show error message
        errorToast(loginResponse.data.error);
      } else if (loginResponse.data.success) {
        sessionStorage.setItem("Auth-Token", loginResponse.data.token);
        sessionStorage.setItem("CCode", loginResponse.data.CCode);
        sessionStorage.setItem("UserId", loginResponse.data.UserId);
        sessionStorage.setItem("UserName", loginResponse.data.Username);
        successToast("Logged in successfully!");
        navigate("/");
      }
    } catch (error) {
      errorToast("Failed logging in. Try again");
      setLoader(false);
    }
  };
  return (
    <div className="login__container h-[100dvh] flex justify-center items-center">
      <div className="w-full bg-white rounded-md shadow-2xl max-w-96 p-6 pb-10 m-5">
        {/* Logo Image */}
        <img
          src="/images/logo.png"
          className="h-20 w-20 mx-auto"
          alt="logo_image"
        />

        <div className="form">
          <form onSubmit={handleSubmit(handleLoginSubmit)}>
            <div className="">
              <h1 className="text-xl font-semibold leading-tight tracking-tight text-[#28A887] md:text-2xl text-center mb-6 mt-2">
                Login to your account.
              </h1>
              <div className="mb-1">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-slate-600"
                >
                  Your Name
                </label>
                <div className="relative">
                  <p className="absolute px-3 flex items-center border-r border-gray-300  py-4 h-full">
                    <FaUserShield className="text-[#28A887]" />
                  </p>
                  <input
                    type="text"
                    id="Username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm  block w-full p-2.5 pl-14 focus:outline-none"
                    placeholder="Enter name"
                    {...register("Username", {
                      required: true,
                    })}
                  />
                </div>
                <p className="h-5">
                  {errors?.Username?.type === "required" && (
                    <p className="text-xs text-red-500 mt-1 ml-2 font-semibold">
                      Name is required.
                    </p>
                  )}
                </p>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-slate-600"
                >
                  Password
                </label>

                <div className="relative">
                  <p className="absolute px-3 flex items-center border-r border-gray-300 py-4 h-full">
                    <IoMdKey className="text-lg  text-[#28A887]" />
                  </p>
                  <p className="absolute right-0 px-3 flex items-center py-4 h-full">
                    {togglePassword ? (
                      <IoEye
                        className="text-lg  text-[#28A887] hover:cursor-pointer"
                        onClick={() => setTogglePassword((prev) => !prev)}
                      />
                    ) : (
                      <IoMdEyeOff
                        className="text-lg  text-[#28A887] hover:cursor-pointer"
                        onClick={() => setTogglePassword((prev) => !prev)}
                      />
                    )}
                  </p>
                  <input
                    type={togglePassword ? "text" : "password"}
                    id="Password"
                    placeholder="Enter password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm  block w-full p-2.5 pl-14 pr-11 focus:outline-none"
                    {...register("Password", {
                      required: true,
                    })}
                  />
                </div>
                <p className="h-5">
                  {errors?.Password?.type === "required" && (
                    <p className="text-xs text-red-500 mt-1 ml-2 font-semibold">
                      Password is required.
                    </p>
                  )}
                </p>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-[#28A887] hover:bg-[#19c496] font-medium rounded-sm text-sm px-5 py-2.5 text-center"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
