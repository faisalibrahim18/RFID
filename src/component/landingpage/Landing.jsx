import React, { useEffect } from "react";
import Logo from "../../assets/logo.png";
import Bg from "../../assets/1.png";
import Bro from "../../assets/bro.png";
import Get from "../../assets/get.png";
import "./Landingpage.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Landing = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      Swal.fire({
        icon: "error",
        text: "Anda harus LogOut Terlebih dahulu!",
      });

      navigate("/dashboard");
    }
  }, []);
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
        <div className="flex flex-col w-full xl:w-2/2 text-justify justify-center lg:items-start overflow-y-hidden">
          <h1 className="my-4 lg:text-6xl  text-4xl  lg:pb-10 text-black font-bold leading-tight  md:text-left slide-in-bottom-h1">
            BKA LAUNDRY
          </h1>
          <p className="text-xl mb-8 slide-in-bottom-subtitle">
            <b>PT. BAKTI KASIH ANUGERAH </b>bergerak dibidang hospitality
            (hospital laundry service). Kami menyediakan kebutuhan linen untuk
            Rumah Sakit, kami melayani dengan sistim cuci sewa linen bersih siap
            pakai dan atau mencuci linen milik RS.
          </p>

          <div className="flex w-full justify-center md:justify-start lg:pb-0 fade-in">
            {/* <Link
              to={"/register"}
              className=" bg-blue-950  text-center py-3 px-5 mr-3  text-white rounded-xl hover:bg-blue-900  bounce-top-icons"
            >
              Get Started
            </Link> */}
            <Link
              to={"/login"}
              className=" bg-transparent  border text-center py-3 px-5 pl-10 pr-10 border-black hover:border-transparent text-black hover:text-white rounded-lg  hover:bg-blue-950 bounce-top-icons"
            >
              Login
            </Link>
          </div>
        </div>

        {/* <!--Right Col--> */}
        <div className="pb-6 lg:pl-28 ">
          <img
            className="slide-in-bottom "
            src={Get}
            style={{ width: "80rem" }}
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

export default Landing;
