import React from "react";
import Logo from "../../assets/logo.png";

import Bg from "../../assets/1.png";
import Troll from "../../assets/troll.png";
import Kaos from "../../assets/kaos.png";
import Garis from "../../assets/garis.png";
import { BiArrowBack } from "react-icons/bi";

import "./Register.css";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div
      className=" lg:bg-right h-screen  bg-cover bg-no-repeat"
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
        <div className="w-full xl:w-2/2 text-justify justify-center lg:items-start overflow-y-hidden">
          <Link
            to={"/"}
            className="back button flex pb-2 text-blue-950 hover:text-blue-600 hover:underline fade-in"
          >
            <BiArrowBack />
            Back
          </Link>
          <h1 className="lg:text-5xl  text-3xl pb-10  text-black font-bold   md:text-left slide-in-bottom-h1">
            Get Started
          </h1>
          <form className="lg:pr-64 fade-in">
            <div className="mb-2">
              <label for="nama" className="block text-sm font-semibold text-gray-800">
                Nama
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Masukan Nama..."
              />
            </div>
            <div className="mb-2">
              <label for="username" className="block text-sm font-semibold text-gray-800">
                Username
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="masukan Username..."
              />
            </div>
            <div className="flex flex-wrap ">
              <div className="md:w-1/2  md:mb-2  w-full">
                <div className="mb-2">
                  <label for="password" className="block text-sm font-semibold text-gray-800">
                    Password
                  </label>
                  <input
                    type="password"
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="*********"
                  />
                </div>
              </div>
              <div className=" md:w-1/2  lg:pl-3 md:pl-3  w-full">
                {" "}
                <div className="mb-2">
                  <label for="confrim_password" className="block text-sm font-semibold text-gray-800">
                    Confrim Password
                  </label>
                  <input
                    type="password"
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="*********"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="md:w-1/2   w-full">
                <div className="mb-2">
                  <label for="email" className="block text-sm font-semibold text-gray-800">
                    Email
                  </label>
                  <input
                    type="email"
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>
              <div className=" md:w-1/2 lg:pl-3 md:pl-3  w-full">
                {" "}
                <div className="mb-2">
                  <label for="no_handphone" className="block text-sm font-semibold text-gray-800">
                    No Handphone
                  </label>
                  <input
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Masukan No Handphone..."
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button className="color w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-950 rounded-md hover:bg-blue-900 focus:outline-none focus:bg-blue-500">
                Register
              </button>
            </div>
          </form>
        </div>

        {/* <!--Right Col--> */}
        <div className="lg:pt-22 pt-10 lg:pr-20">
          <img className="slide-in-bottom  " src={Troll} style={{ width: "30rem" }} />
        </div>
      </div>

      <div className=" px-11 pt-20 text-sm text-center md:text-left fade-in">
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

export default Register;
