import React from "react";
import Logo from "../../assets/logo.png";
import Bg from "../../assets/1.png";
import Kaos from "../../assets/kaos.png";

import "./Login.css";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
const Login = () => {
  return (
    <div
      className=" lg:bg-right lg:h-screen  bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${Bg})`,
      }}
    >
      <div className="w-full  mx-auto p-11">
        <div className="w-full flex items-center justify-between">
          <Link
            className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
            href="#"
          >
            <img
              src={Logo}
              className="lg:h-auto lg:w-auto bounce-top-icons bg-opacity-100 "
              style={{ width: "70px", height: "80px", left: "57px", top: "41px" }}
            />
          </Link>
        </div>
      </div>
      {/* <!--Main--> */}
      <div className=" px-11  flex  flex-col md:flex-row items-center">
        {/* <!--Left Col--> */}
        <div className="w-full xl:w-2/2 text-justify  lg:items-start overflow-y-hidden">
          <Link
            to={"/"}
            className="back button flex pb-2 text-blue-950 hover:text-blue-600 hover:underline fade-in"
          >
            <BiArrowBack />
            Back
          </Link>
          <h1 className="lg:text-5xl  text-3xl pb-10  text-black font-bold   md:text-left slide-in-bottom-h1">
            login
          </h1>
          <form className="lg:w-1/2 fade-in">
            <div className="mb-2">
              <label for="username" className="block text-sm font-semibold text-gray-800">
                Username
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Masukan username..."
              />
            </div>
            <div className="mb-2">
              <label for="password" className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                type="password"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="********"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="color w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-950 rounded-md hover:bg-blue-900 focus:outline-none focus:bg-blue-500"
              >
                Login
              </button>
            </div>
          </form>
        </div>

        {/* <!--Right Col--> */}
        <div className="lg:pt-22 pt-10 lg:pr-20">
          <img className="slide-in-bottom  " src={Kaos} style={{ width: "40rem" }} />
        </div>
      </div>

      <div className=" px-11 text-sm text-center md:text-left fade-in">
        <Link
          className="text-gray-500 pt-10 no-underline hover:no-underline fade-in w-full pb-6 text-sm text-center md:text-left"
          to={"#"}
        >
          © BKA 2023
        </Link>
      </div>
    </div>
  );
};

export default Login;
