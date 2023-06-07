import React, { useEffect, useState } from "react";
import { BsFillClipboard2CheckFill, BsGridFill, BsList, BsPeopleFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import Logo from "../../assets/logo.png";
import { FaClipboardList, FaCubes, FaHospitalAlt, FaRegListAlt, FaTags, FaTruck } from "react-icons/fa";
import axios from "axios";

import Swal from "sweetalert2";

const Layout = ({ children }) => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  });

  const [open, setOpen] = useState(false);
  const [isopen, setisOpen] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    Swal.fire({
      icon: "success",
      text: "Anda Berhasil Logout",
    });
    navigate("/login");
  };
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:9000/api/v1/rfid/getUserSignedIn", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data.data);
    setUser([response.data.data]);
  };
  return (
    <div className="wrapper overflow-x-hidden bg-[#E5F5E5] ">
      <div className="flex flex-col  min-h-screen transition-all duration-500 ease-in-out ltr:ml-64 ltr:-mr-64 md:ltr:ml-0 md:ltr:mr-0 rtl:mr-64 rtl:-ml-64 md:rtl:mr-0 md:rtl:ml-0': open, 'ltr:ml-0 ">
        {/* Sidebar */}
        <div
          className={`fixed md:z-10 z-50 w-0 transition-all duration-500 ease-in-out h-screen bg-white  shadow-sm ${
            open ? " w-12 md:w-0 lg:56" : " w-0 md:w-56 sm:w-20"
          }`}
        >
          <div className="h-full overflow-y-auto scrollbars">
            {/* <!--logo--> */}
            <div className="mh-18 text-center py-5 md:block hidden">
              <a href="#" className="relative">
                <h2 className="text-2xl font-semibold text-gray-200 px-4 max-h-auto overflow-hidden hidden-compact">
                  <img className="inline-block w-24 h-28 -mt-1" src={Logo} />
                </h2>
              </a>
            </div>

            {/* <!-- Sidebar menu --> */}
            {users.map((item) => (
              <div className=" flex md:z-50 flex-col gap-2 md:pt-2 pt-20  w-full text-[#00205F] float-none font-medium ltr:pl-1.5 rtl:pr-1.5">
                {item.role === "admin" ? (
                  <div>
                    <NavLink
                      activeClassName="active"
                      to={"/dashboard"}
                      className="group  flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#dee7de] rounded-md"
                    >
                      <div className="text-lg">
                        <BsGridFill />
                      </div>
                      <h2>Dashboard</h2>
                      <h2
                        className={`${
                          open && " md:hidden "
                        } absolute  left-44 md:hidden bg-white font-semibold whitespace-pre text-[#00205F] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >
                        Dashboard
                      </h2>
                    </NavLink>

                    <NavLink
                      activeClassName="active"
                      to={"/users"}
                      className="group  flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#dee7de] rounded-md"
                    >
                      <div className="text-lg">
                        <BsPeopleFill />
                      </div>
                      <h2>User Management</h2>
                      <h2
                        className={`${
                          open && " md:hidden "
                        } absolute  left-44 md:hidden bg-white font-semibold whitespace-pre text-[#00205F] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >
                        User Management
                      </h2>
                    </NavLink>

                    <NavLink
                      activeClassName="active"
                      to={"/rumah_sakit"}
                      className="group  flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#dee7de] rounded-md"
                    >
                      <div className="text-lg">
                        <FaHospitalAlt />
                      </div>
                      <h2>Rumah Sakit</h2>
                      <h2
                        className={`${
                          open && " md:hidden "
                        } absolute  left-44 md:hidden bg-white font-semibold whitespace-pre text-[#00205F] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >
                        Rumah Sakit
                      </h2>
                    </NavLink>

                    <NavLink
                      activeClassName="active"
                      to={"/linen"}
                      className="group  flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#dee7de] rounded-md"
                    >
                      <div className="text-lg">
                        <FaTags />
                      </div>
                      <h2>Linen</h2>
                      <h2
                        className={`${
                          open && " md:hidden "
                        } absolute  left-44 md:hidden bg-white font-semibold whitespace-pre text-[#00205F] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >
                        Linen
                      </h2>
                    </NavLink>

                    <NavLink
                      activeClassName="active"
                      to={"/distribusi"}
                      className="group  flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#dee7de] rounded-md"
                    >
                      <div className="text-lg">
                        <FaRegListAlt />
                      </div>
                      <h2>Distribusi</h2>
                      <h2
                        className={`${
                          open && " md:hidden "
                        } absolute  left-44 md:hidden bg-white font-semibold whitespace-pre text-[#00205F] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >
                        Distribusi
                      </h2>
                    </NavLink>

                    <NavLink
                      activeClassName="active"
                      to={"/kategori"}
                      className="group  flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#dee7de] rounded-md"
                    >
                      <div className="text-lg">
                        <FaCubes />
                      </div>
                      <h2>Kategori</h2>
                      <h2
                        className={`${
                          open && " md:hidden "
                        } absolute  left-44 md:hidden bg-white font-semibold whitespace-pre text-[#00205F] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >
                        Kategori
                      </h2>
                    </NavLink>

                    <NavLink
                      activeClassName="active"
                      to={"/inventory"}
                      className="group  flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#dee7de] rounded-md"
                    >
                      <div className="text-lg">
                        <BsFillClipboard2CheckFill />
                      </div>
                      <h2>Inventory</h2>
                      <h2
                        className={`${
                          open && " md:hidden "
                        } absolute  left-44 md:hidden bg-white font-semibold whitespace-pre text-[#00205F] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >
                        Inventory
                      </h2>
                    </NavLink>

                    <NavLink
                      activeClassName="active"
                      to={"/laporan"}
                      className="group  flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#dee7de] rounded-md"
                    >
                      <div className="text-lg">
                        <FaClipboardList />
                      </div>
                      <h2>Laporan</h2>
                      <h2
                        className={`${
                          open && " md:hidden "
                        } absolute  left-44 md:hidden bg-white font-semibold whitespace-pre text-[#00205F] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >
                        Laporan
                      </h2>
                    </NavLink>

                    <NavLink
                      activeClassName="active"
                      to={"/tracking"}
                      className="group  flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#dee7de] rounded-md"
                    >
                      <div className="text-lg">
                        <FaTruck />
                      </div>
                      <h2>Tracking</h2>
                      <h2
                        className={`${
                          open && " md:hidden "
                        } absolute  left-44 md:hidden bg-white font-semibold whitespace-pre text-[#00205F] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >
                        Tracking
                      </h2>
                    </NavLink>
                  </div>
                ) : (
                  ""
                )}

                {item.role === "user_laundry" ? (
                  <div>
                    <NavLink
                      activeClassName="active"
                      to={"/dashboard"}
                      className="group  flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#dee7de] rounded-md"
                    >
                      <div className="text-lg">
                        <BsGridFill />
                      </div>
                      <h2>Dashboard</h2>
                      <h2
                        className={`${
                          open && " md:hidden "
                        } absolute  left-44 md:hidden bg-white font-semibold whitespace-pre text-[#00205F] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >
                        Dashboard
                      </h2>
                    </NavLink>

                    <NavLink
                      activeClassName="active"
                      to={"/laporanL"}
                      className="group  flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#dee7de] rounded-md"
                    >
                      <div className="text-lg">
                        <i className="fa-solid fa-file-lines"></i>
                      </div>
                      <h2>Laporan</h2>
                      <h2
                        className={`${
                          open && " md:hidden "
                        } absolute  left-44 md:hidden bg-white font-semibold whitespace-pre text-[#00205F] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >
                        Laporan
                      </h2>
                    </NavLink>

                    <NavLink
                      activeClassName="active"
                      to={"/permintaan"}
                      className="group  flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#dee7de] rounded-md"
                    >
                      <div className="text-lg">
                        <i className="fa-regular fa-bell"></i>
                      </div>
                      <h2>Permintaan</h2>
                      <h2
                        className={`${
                          open && " md:hidden "
                        } absolute  left-44 md:hidden bg-white font-semibold whitespace-pre text-[#00205F] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >
                        Permintaan
                      </h2>
                    </NavLink>
                  </div>
                ) : (
                  ""
                )}
                {item.role === "user_pabrik" ? (
                  <div>
                    <NavLink
                      activeClassName="active"
                      to={"/dashboard"}
                      className="group  flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#dee7de] rounded-md"
                    >
                      <div className="text-lg">
                        <BsGridFill />
                      </div>
                      <h2>Dashboard</h2>
                      <h2
                        className={`${
                          open && " md:hidden "
                        } absolute  left-44 md:hidden bg-white font-semibold whitespace-pre text-[#00205F] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >
                        Dashboard
                      </h2>
                    </NavLink>

                    <NavLink
                      activeClassName="active"
                      to={"/laporanP"}
                      className="group  flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#dee7de] rounded-md"
                    >
                      <div className="text-lg">
                        <i className="fa-solid fa-file-lines"></i>
                      </div>
                      <h2>Laporan</h2>
                      <h2
                        className={`${
                          open && " md:hidden "
                        } absolute  left-44 md:hidden bg-white font-semibold whitespace-pre text-[#00205F] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >
                        Laporan
                      </h2>
                    </NavLink>

                    <NavLink
                      activeClassName="active"
                      to={"/permintaanP"}
                      className="group  flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#dee7de] rounded-md"
                    >
                      <div className="text-lg">
                        <i className="fa-regular fa-bell"></i>
                      </div>
                      <h2>Permintaan</h2>
                      <h2
                        className={`${
                          open && " md:hidden "
                        } absolute  left-44 md:hidden bg-white font-semibold whitespace-pre text-[#00205F] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >
                        Permintaan
                      </h2>
                    </NavLink>
                  </div>
                ) : (
                  ""
                )}
                {item.role === "delivery" ? (
                  <div>
                    <NavLink
                      activeClassName="active"
                      to={"/dashboard"}
                      className="group  flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#dee7de] rounded-md"
                    >
                      <div className="text-lg">
                        <BsGridFill />
                      </div>
                      <h2>Dashboard</h2>
                      <h2
                        className={`${
                          open && " md:hidden "
                        } absolute  left-44 md:hidden bg-white font-semibold whitespace-pre text-[#00205F] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >
                        Dashboard
                      </h2>
                    </NavLink>
                    {/* 
                    <NavLink
                      activeClassName="active"
                      to={"/laporanP"}
                      className="group  flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#dee7de] rounded-md"
                    >
                      <div className="text-lg">
                        <i className="fa-solid fa-file-lines"></i>
                      </div>
                      <h2>Laporan</h2>
                      <h2
                        className={`${
                          open && " md:hidden "
                        } absolute  left-44 md:hidden bg-white font-semibold whitespace-pre text-[#00205F] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >
                        Laporan
                      </h2>
                    </NavLink> */}

                    <NavLink
                      activeClassName="active"
                      to={"/permintaanD"}
                      className="group  flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#dee7de] rounded-md"
                    >
                      <div className="text-lg">
                        <i className="fa-regular fa-bell"></i>
                      </div>
                      <h2>Permintaan</h2>
                      <h2
                        className={`${
                          open && " md:hidden "
                        } absolute  left-44 md:hidden bg-white font-semibold whitespace-pre text-[#00205F] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >
                        Permintaan
                      </h2>
                    </NavLink>
                  </div>
                ) : (
                  ""
                )}
                {item.role === "rs" ? (
                  <div>
                    <NavLink
                      activeClassName="active"
                      to={"/dashboard"}
                      className="group  flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#dee7de] rounded-md"
                    >
                      <div className="text-lg">
                        <BsGridFill />
                      </div>
                      <h2>Dashboard</h2>
                      <h2
                        className={`${
                          open && " md:hidden "
                        } absolute  left-44 md:hidden bg-white font-semibold whitespace-pre text-[#00205F] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >
                        Dashboard
                      </h2>
                    </NavLink>
                    {/* 
                    <NavLink
                      activeClassName="active"
                      to={"/laporanP"}
                      className="group  flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#dee7de] rounded-md"
                    >
                      <div className="text-lg">
                        <i className="fa-solid fa-file-lines"></i>
                      </div>
                      <h2>Laporan</h2>
                      <h2
                        className={`${
                          open && " md:hidden "
                        } absolute  left-44 md:hidden bg-white font-semibold whitespace-pre text-[#00205F] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >
                        Laporan
                      </h2>
                    </NavLink> */}

                    <NavLink
                      activeClassName="active"
                      to={"/permintaanD"}
                      className="group  flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#dee7de] rounded-md"
                    >
                      <div className="text-lg">
                        <i className="fa-regular fa-bell"></i>
                      </div>
                      <h2>Permintaan</h2>
                      <h2
                        className={`${
                          open && " md:hidden "
                        } absolute  left-44 md:hidden bg-white font-semibold whitespace-pre text-[#00205F] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >
                        Permintaan
                      </h2>
                    </NavLink>
                  </div>
                ) : (
                  ""
                )}
                {item.role === "super_admin" ? (
                  <div>
                    <NavLink
                      activeClassName="active"
                      to={"/dashboard"}
                      className="group  flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#dee7de] rounded-md"
                    >
                      <div className="text-lg">
                        <BsGridFill />
                      </div>
                      <h2>Dashboard</h2>
                      <h2
                        className={`${
                          open && " md:hidden "
                        } absolute  left-44 md:hidden bg-white font-semibold whitespace-pre text-[#00205F] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >
                        Dashboard
                      </h2>
                    </NavLink>

                    <NavLink
                      activeClassName="active"
                      to={"/laporanS"}
                      className="group  flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#dee7de] rounded-md"
                    >
                      <div className="text-lg">
                        <i className="fa-solid fa-file-lines"></i>
                      </div>
                      <h2>Laporan</h2>
                      <h2
                        className={`${
                          open && " md:hidden "
                        } absolute  left-44 md:hidden bg-white font-semibold whitespace-pre text-[#00205F] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >
                        Laporan
                      </h2>
                    </NavLink>

                    <NavLink
                      activeClassName="active"
                      to={"/peminjaman"}
                      className="group  flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#dee7de] rounded-md"
                    >
                      <div className="text-lg">
                        <i className="fa-regular fa-bell"></i>
                      </div>
                      <h2>Peminjaman Linen</h2>
                      <h2
                        className={`${
                          open && " md:hidden "
                        } absolute  left-44 md:hidden bg-white font-semibold whitespace-pre text-[#00205F] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >
                        Peminjaman Linen
                      </h2>
                    </NavLink>
                    <NavLink
                      activeClassName="active"
                      to={"/userS"}
                      className="group  flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#dee7de] rounded-md"
                    >
                      <div className="text-lg">
                        <BsPeopleFill />
                      </div>
                      <h2>User</h2>
                      <h2
                        className={`${
                          open && " md:hidden "
                        } absolute  left-44 md:hidden bg-white font-semibold whitespace-pre text-[#00205F] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >
                        User
                      </h2>
                    </NavLink>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
            {/* Footer Sidebar */}
            {/* <div className="px-4 box-banner">
              <div className="my-8 p-4 text-center bg-gray-300  bg-opacity-50 rounded-lg">
                <h4 className="font-bold inline-block mb-2"></h4>
                <div className="mb-3 text-sm"></div>
              </div>
            </div> */}
            {/* close Footer Sidebar */}
          </div>
        </div>
        {/* close Sidebar */}

        {/* Main */}
        <div
          className={`flex flex-col ltr:ml-64 rtl:mr-64 min-h-screen transition-all duration-500 ease-in-out ${
            open
              ? "ltr:ml-64 ltr:-mr-64 md:ltr:ml-0 md:ltr:mr-0 rtl:mr-64 rtl:-ml-64 md:rtl:mr-0 md:rtl:ml-0"
              : "ltr:ml-0 ltr:mr-0 md:ltr:ml-64 rtl:mr-0 rtl:ml-0 md:rtl:mr-64"
          }`}
        >
          {/* Navbar */}

          <nav
            className={`z-20 fixed w-screen flex flex-row flex-nowrap items-center justify-between mt-0 py-2 ltr:left-0 md:ltr:left-64 ltr:right-0 rtl:right-0 md:rtl:right-64 rtl:left-0 px-6 bg-white  shadow-sm transition-all duration-500 ease-in-out ${
              open
                ? "lg:left-0 ltr:right-0 left-12 right-0 rtl:left-0 "
                : "md:left-56 -right-64 left-0  md:right-0 rtl:right-64  md:rtl:right-0 md:rtl:left-0"
            }`}
            id="desktop-menu"
          >
            {" "}
            <button
              id="navbartoggle"
              type="button"
              className="inline-flex  w-1/2  text-gray-800 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-200 focus:outline-none focus:ring-0"
              aria-controls="sidebar-menu"
              onClick={() => setOpen(!open)}
              aria-expanded="false"
              x-bind:aria-expanded="open.toString()"
            >
              <svg
                x-description="Icon closed"
                x-state:on="Menu open"
                x-state:off="Menu closed"
                className="block h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  className="md:hidden"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
                <path
                  className="hidden md:block"
                  d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
            <ul className="flex ml-auto mr-auto mt-2 pl-auto ">
              <li className="relative">
                <a
                  className="px-3 flex text-sm rounded-full focus:outline-none"
                  id="user-menu-button"
                  onClick={() => setisOpen(!isopen)}
                >
                  <div className="relative">
                    <img className="h-10 w-10 rounded-full border border-gray-300 bg-gray-700" />
                    <span
                      title="online"
                      className="flex justify-center absolute -bottom-0.5 ltr:right-1 rtl:left-1 text-center bg-green-500 border border-white w-3 h-3 rounded-full"
                    ></span>
                  </div>
                  {users.map((item) => (
                    <span className="hidden md:block ml-1 mr-1 self-center" key={item._id}>
                      {" "}
                      {item.name}
                    </span>
                  ))}
                </a>
                {isopen ? (
                  <div className="absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg">
                    <div className="p-2 items-center">
                      <button
                        type="button"
                        onClick={logout}
                        className="flex w-full  px-4 py-2 text-gray-500 rounded-lg hover:bg-[#E5F5E5] hover:text-gray-700"
                      >
                        <CgLogOut className="text-xl m-1" />
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </li>
            </ul>
          </nav>
          {/* Close Navbar */}

          {/* Content */}
          <main
            className={`pt-20 -mt-2 ${
              open
                ? "lg:pl-2 pl-14 transition-all duration-500 ease-in-out  "
                : "lg:pl-56 pl-2 transition-all duration-500 ease-in-out"
            } `}
          >
            {children}
          </main>
          {/* Close Content */}
        </div>
        {/* Close Main */}
      </div>
    </div>
  );
};

export default Layout;