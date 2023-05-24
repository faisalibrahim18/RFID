import React, { useState } from "react";
import { BsFillClipboard2CheckFill, BsGridFill, BsList, BsPeopleFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import Logo from "../../assets/logo.png";
import {
  FaClipboardList,
  FaCubes,
  FaHospitalAlt,
  FaRegListAlt,
  FaRegUserCircle,
  FaTags,
  FaTruck,
} from "react-icons/fa";
const NavSid = () => {
  const menus = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: BsGridFill,
    },
    {
      name: "User Management",
      link: "/users",
      icon: BsPeopleFill,
    },
    {
      name: "Rumah Sakit",
      link: "/rumah_sakit",
      icon: FaHospitalAlt,
    },
    {
      name: "Linen",
      link: "/linen",
      icon: FaTags,
    },
    {
      name: "Distribusi",
      link: "/distribusi",
      icon: FaRegListAlt,
    },
    {
      name: "Kategori",
      link: "/kategori",
      icon: FaCubes,
    },
    {
      name: "Inventory",
      link: "/inventory",
      icon: BsFillClipboard2CheckFill,
    },
    {
      name: "Laporan",
      link: "/laporan",
      icon: FaClipboardList,
    },
    {
      name: "Tracking",
      link: "/tracking",
      icon: FaTruck,
    },
  ];

  const [open, setOpen] = useState(true);
  const [isopen, setisOpen] = useState(false);
  return (
    <div>
      {" "}
      {/* <!--Nav--> */}
      <nav
        aria-label="menu nav"
        className="bg-[#FFFFFF] pt-2  text-black  mt-0 fixed w-full z-20 top-0 shadow-lg"
      >
        <div className="flex lg:flex-wrap  items-center">
          <div className="pl-2">
            <BsList
              size={26}
              className="cursor-pointer  text-[#00205F] hover:text-gray-500"
              onClick={() => setOpen(!open)}
            />
          </div>

          <div className="flex flex-1  md:justify-start  lg:pl-12 ">
            <img src={Logo} alt="" style={{ width: "60px", height: "65px" }} />
          </div>

          <div className="flex  pt-1 content-center justify-between md:w-1/3 md:justify-end p-2">
            <ul className="list-reset flex  flex-1 md:flex-none items-center">
              <li className=" md:flex-none ">
                <div className="flex   ">
                  <FaRegUserCircle className="m-0 pr-1 text-2xl" />
                  <h1 className="static">Jhons Michael</h1>

                  <div className="">
                    <button
                      onClick={() => setisOpen(!isopen)}
                      className="items-center justify-center h-full px-1  border-gray-100 hover:text-gray-700 rounded-r-md "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isopen ? (
                      <div className="absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg">
                        <div className="p-2 items-center">
                          <NavLink
                            to={"/"}
                            className="flex  px-4 py-2 text-gray-500 rounded-lg hover:bg-[#E5F5E5] hover:text-gray-700"
                          >
                            <CgLogOut className="text-xl m-1" />
                            Logout
                          </NavLink>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Close Nav */}
      {/* sidebar */}
      <div
        className={`bg-[#FFFFFF] min-h-full  ${
          open ? "w-56" : "w-14"
        } lg:static fixed   duration-500 text-[#00205F] pt-10`}
      >
        <div className=" flex flex-col gap-2 pt-10">
          {menus?.map((menu, i) => (
            <NavLink
              activeClassName="bg-[#E5F5E5] rounded-md"
              to={menu?.link}
              key={i}
              className="group  flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#E5F5E5] rounded-md"
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-[#00205F] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu?.name}
              </h2>
            </NavLink>
          ))}
        </div>
      </div>
      {/* close sidebar */}
    </div>
  );
};

export default NavSid;
