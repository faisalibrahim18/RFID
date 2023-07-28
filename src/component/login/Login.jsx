import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { LoginUser, reset } from "../../features/authSlice";
import Logo from "../../assets/logo.png";
import Bg from "../../assets/1.png";
import Login1 from "../../assets/login.png";

import "./Login.css";
import { BiArrowBack } from "react-icons/bi";
import Swal from "sweetalert2";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState( false ); 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  
  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }


  useEffect(() => {
    if (localStorage.getItem("token")) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "error",
        text: "Anda harus LogOut Terlebih dahulu!",
      });
      navigate("/dashboard");
    }
  }, []);
  useEffect(() => {
    if (user || isSuccess) {
      //

      navigate("/dashboard");
    }
    // Authorization = "Bearer" + localStorage.getItem("token");
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ username, password }));
  };
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
              style={{
                width: "70px",
                height: "80px",
                left: "57px",
                top: "41px",
              }}
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
          <form className="lg:w-1/2 fade-in" onSubmit={Auth}>
            {/* {isError && (
              <p className="bg-red-200 uppercase opacity-75 font-sans  text-red-500 rounded text-center p-2 m-3">
                {message}
              </p>
            )} */}
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Username
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Masukan username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                 type={isPasswordVisible ? "text" : "password"}
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="flex items-center mt-2">
        <input
          type="checkbox"
          className="mr-2 w-4 h-4"
          checked={isPasswordVisible}
          onChange={togglePasswordVisibility}
        />
        <span className="text-sm text-gray-600">Show password</span>
      </label>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="color w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-950 rounded-lg hover:bg-blue-900 focus:outline-none focus:bg-blue-500"
              >
                {isLoading ? (
                  <div>
                    <h1 className=" mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]">
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </h1>
                    Loading...
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* <!--Right Col--> */}
        <div className="lg:pr-20">
          <img
            className="slide-in-bottom  "
            src={Login1}
            style={{ width: "40rem" }}
          />
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
