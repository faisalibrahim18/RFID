import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React, { useState } from "react";
import { HiArchive, HiMenuAlt3 } from "react-icons/hi";
import { BsPeopleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import { FaRegUserCircle } from "react-icons/fa";

const Home = () => {
  const menus = [
    {
      name: "Dashboard",
      link: "/",
      icon: HiArchive,
    },
    {
      name: "User Management",
      link: "/",
      icon: BsPeopleFill,
    },
    // {
    //   name: "Dashboard",
    //   link: "/",
    //   icon: HiArchive,
    // },
  ];
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [open, setOpen] = useState(true);
  const [isopen, setisOpen] = useState(false);

  return (
    <>
      <header>
        {/* <!--Nav--> */}
        <nav
          aria-label="menu nav"
          className="bg-[#FFFFFF] text-black pt-2 md:pt-3 p-3 px-2 mt-0 h-auto fixed w-full z-20 top-0 shadow-lg"
        >
          <div className="flex lg:flex-wrap  items-center">
            <div className="flex flex-1 md:w-1/3  md:justify-start uppercase font-bold lg:pl-20 px-2">
              Logo
              <div className="pl-32 pr-28">
                {" "}
                <HiMenuAlt3
                  size={26}
                  className="cursor-pointer lg:pl-13 text-[#00205F] hover:text-gray-500"
                  onClick={() => setOpen(!open)}
                />
              </div>
            </div>

            <div className="flex w-full pt-1 content-center justify-between md:w-1/3 md:justify-end">
              <ul className="list-reset flex  flex-1 md:flex-none items-center">
                <li className="flex-1 md:flex-none lg:mr-10">
                  <div className="flex pl-auto">
                    <FaRegUserCircle className="m-0 pr-1 text-2xl" />
                    <h1 className="hidden  lg:block">Jhons Michael</h1>

                    <div className="lg:relative fixed">
                      <button
                        onClick={() => setisOpen(!isopen)}
                        className="items-center justify-center h-full px-1 lg:relative fixed border-gray-100 hover:text-gray-700 rounded-r-md "
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
                            <Link
                              to={"/"}
                              className="flex  px-4 py-2 text-gray-500 rounded-lg hover:bg-[#E5F5E5] hover:text-gray-700"
                            >
                              <CgLogOut className="text-xl m-1" />
                              Logout
                            </Link>
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
      </header>
      {/* <nav className={`bg-[#FFFFFF] ${open ? "w-72" : "w-14"} duration-500`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex">
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className=" bg-transparent md:hidden inline-flex items-center justify-center 
                  p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-300 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200
                   focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>

                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>

                  <svg
                    className="hidden h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div className="relative ml-3">
                  <div>
                    <h1 className="font-bold text-2xl pl-4">LOGO</h1>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-32 flex items-baseline space-x-4">
                  <HiMenuAlt3
                    size={26}
                    className="cursor-pointer text-[#00205F] hover:text-gray-500"
                    onClick={() => setOpen(!open)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden" id="mobile-menu"></div>
      </nav> */}

      <section className="flex ">
        {/* sidebar */}
        <div
          className={`bg-[#FFFFFF] min-h-screen ${open ? "w-72" : "w-14"} duration-500 text-[#00205F] pt-20`}
        >
          {/* <div className="py-3 flex justify-end">
          <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
        </div> */}
          <div className=" flex flex-col gap-2 relative pt-10">
            {menus?.map((menu, i) => (
              <Link
                to={menu?.link}
                key={i}
                className="group flex items-center text-center text-sm gap-3.5 font-medium p-4 hover:bg-[#E5F5E5] rounded-md"
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
              </Link>
            ))}
          </div>
        </div>
        {/* close sidebar */}

        {/* Main */}
        <div className=" text-xl text-black font-semibold bg-[#E5F5E5] w-screen p-5">
          {/* Title */}
          <h1 className="pl-5 pt-20 text-3xl font-semibold">Dashboard</h1>

          {/* Cards Grid */}
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 xl:w-1/4 p-6 ">
              <div className="bg-gradient-to-b from-green-100 to-green-50 border-b-4 border-green-400 rounded-lg shadow-xl p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-md p-3 text-3xl bg-green-400">
                      <BsPeopleFill />
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h1 className="font-bold  text-gray-600">Total User</h1>
                    <p className="font-bold text-3xl">10</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/4 p-6 ">
              <div className="bg-gradient-to-b from-cyan-100-100 to-cyan-50 border-b-4 border-cyan-400 rounded-lg shadow-xl p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-md p-3 text-3xl bg-cyan-400">
                      <BsPeopleFill />
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h1 className="font-bold  text-gray-600">Total User</h1>
                    <p className="font-bold text-3xl">10</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/4 p-6 ">
              <div className="bg-gradient-to-b from-pink-100 to-pink-50 border-b-4 border-pink-400 rounded-lg shadow-xl p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-md p-3 text-3xl bg-pink-400">
                      <BsPeopleFill />
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h1 className="font-bold  text-gray-600">Total User</h1>
                    <p className="font-bold text-3xl">10</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/4 p-6 ">
              <div className="bg-gradient-to-b from-yellow-100 to-yellow-50 border-b-4 border-yellow-400 rounded-lg shadow-xl p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-md p-3 text-3xl bg-yellow-400">
                      <BsPeopleFill />
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h1 className="font-bold  text-gray-600">Total User</h1>
                    <p className="font-bold text-3xl">10</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Close Card Grid */}

          {/* Tracking View */}
          <div className="container bg-[#F1F9FE] pt-6 h-auto p-7 rounded-md">
            <div className="justify-center items-center text-center lg:ml-32 lg:mr-32 rounded-md shadow-md bg-white p-6">
              <h1>Tracking View</h1>
            </div>
            <div className="p-5">
              <ol className="border-l border-sky-300 dark:border-sky-500 md:flex md:justify-center md:gap-6 md:border-l-0 md:border-t">
                <li>
                  <div className="flex-start flex items-center pt-2 md:block md:pt-0">
                    <div className="-ml-[10px] mr-3 h-[20px] w-[20px] rounded-full bg-sky-300 dark:bg-sky-500 md:ml-0 md:mr-0 md:-mt-[10px]"></div>
                    <p className="mt-2 text-sm ">01.07.2023</p>
                  </div>
                  <div className="mt-2 ml-4 pb-5 md:ml-0">
                    <h4 className="mb-1.5 text-xl font-semibold">Title of section 1</h4>
                    <p className="mb-3 text-neutral-500 text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non
                      nisi semper.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="flex-start flex items-center pt-2 md:block md:pt-0">
                    <div className="-ml-[10px] mr-3 h-[20px] w-[20px] rounded-full bg-sky-300 dark:bg-sky-500 md:ml-0 md:mr-0 md:-mt-[10px]"></div>
                    <p className="mt-2 text-sm ">13.09.2023</p>
                  </div>
                  <div className="mt-2 ml-4 pb-5 md:ml-0">
                    <h4 className="mb-1.5 text-xl font-semibold">Title of section 2</h4>
                    <p className="mb-3 text-neutral-500 text-sm">
                      Libero expedita explicabo eius fugiat quia aspernatur autem laudantium error.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="flex-start flex items-center pt-2 md:block md:pt-0">
                    <div className="-ml-[10px] mr-10 h-[20px] w-[20px] rounded-full bg-sky-300 dark:bg-sky-500 md:ml-0 md:mr-0 md:-mt-[10px]"></div>
                    <p className="mt-2 text-sm ">25.11.2023</p>
                  </div>
                  <div className="mt-2 ml-4 pb-5 md:ml-0">
                    <h4 className="mb-1.5 text-xl font-semibold">Title of section 3</h4>
                    <p className="mb-3 text-neutral-500 text-sm">
                      Voluptatibus temporibus esse illum eum aspernatur, fugiat suscipit natus! Eum corporis
                      illum.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="flex-start flex items-center pt-2 md:block md:pt-0">
                    <div className="-ml-[10px] mr-10 h-[20px] w-[20px] rounded-full bg-sky-300 dark:bg-sky-500 md:ml-0 md:mr-0 md:-mt-[10px]"></div>
                    <p className="mt-2 text-sm ">25.11.2023</p>
                  </div>
                  <div className="mt-2 ml-4 pb-5 md:ml-0">
                    <h4 className="mb-1.5 text-xl font-semibold">Title of section 4</h4>
                    <p className="mb-3 text-neutral-500 text-sm">
                      Voluptatibus temporibus esse illum eum aspernatur, fugiat suscipit natus! Eum corporis
                      illum nihil officiis tempore.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
          {/* Close Tracking View */}
        </div>
        {/* Close Main */}
      </section>
    </>
  );
};

export default Home;
