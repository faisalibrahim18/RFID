import React, { useEffect, useState } from "react";
import Check from "../../assets/check.png";
import Dry from "../../assets/dry.png";
import Acc from "../../assets/acc.png";
import Transit from "../../assets/transit.png";
import Wash from "../../assets/wash.png";
import Mbl from "../../assets/mbl.png";
import Mtr from "../../assets/mtr.png";
import Baju from "../../assets/baju.png";
import "./stepper.css";
import axios from "axios";
import { Link } from "react-router-dom";
const Tracking = () => {
  const [data, setStatus] = useState([], false);
  const [track, setTrack] = useState("");
  const [tracker, setTracker] = useState([]);

  useEffect(() => {
    getTracking();
  }, []);

  const getTracking = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:9000/api/v1/rfid/distribusi",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.data);
    setTracker(response.data.data);
  };
  // console.log(getTracking);
  const handleTracking = async (id) => {
    console.log(id);
  };
  useEffect(() => {
    const tracking = tracker.filter((item) => item._id === track);
    // console.log(tracking);
    if (!tracking) {
      setShow(false);
    } else if (tracking) {
      setStatus(tracking);
      //
    }
  }, [track]);

  return (
    <>
      <div className="">
        <div className="md:flex flex-row -mt-32">
          {/* left */}

          <div className="p-2 lg:pl-5  pl-2 font-semibold flex-wrap flex pt-36">
            {/* Tracking View */}
            <div className=" w-72 pt-13 font-semibold mb-6">
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="block md:w-96 w-80 px-2 py-2 mt-2  bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              >
                <option selected>Pilih Data Tracking </option>
                {tracker.map((d, i) => (
                  <option value={d._id} key={d._id}>
                    {d.customer.name}{" "}
                  </option>
                ))}
              </select>
            </div>

            {data.map((item) => (
              <div>
                {item.status === null ? (
                  <div className="w-full -ml-1 bg-gray-300 p-5 md:mt-20 md:-ml-12">
                    <h1>
                      Proses Harus di Confirm terlebih dahulu Untuk Melihat
                      Tracking,{" "}
                      <Link
                        to={"/distribusi"}
                        className="text-red-600 hover:text-red-400 "
                      >
                        Klik untuk Ke Halaman.
                      </Link>
                    </h1>
                  </div>
                ) : (
                  <div className="flex-shrink max-w-full px-4 md:w-96 w-full md:mt-4 mb-6">
                    <div className="bg-[#537FE7]  rounded-lg shadow-lg h-full p-6">
                      <div className="flex flex-row justify-between pb-3">
                        <div className="flex flex-col">
                          <h3 className="text-base font-semibold text-white mr-1">
                            Order by : {item.customer.name}
                          </h3>
                        </div>
                        <div className="relative">
                          {item.status.status === "checking" ? (
                            <span className="bg-gray-400  rounded-md p-1 pl-6 pr-6 text-gray-600">
                              CheckIn
                            </span>
                          ) : (
                            ""
                          )}
                          {item.status.status === "transit to laundry" ? (
                            <span className="bg-blue-400  rounded-md p-1 pl-6 pr-6 text-blue-600">
                              Transit
                            </span>
                          ) : (
                            ""
                          )}
                          {item.status.status === "accepted" ? (
                            <span className="bg-amber-400  rounded-md p-1 pl-6 pr-6 text-amber-600">
                              Accepted
                            </span>
                          ) : (
                            ""
                          )}
                          {item.status.status === "wash" ? (
                            <span className="bg-lime-400  rounded-md p-1 pl-6 pr-6 text-lime-600">
                              Wash
                            </span>
                          ) : (
                            ""
                          )}
                          {item.status.status === "drying" ? (
                            <span className="bg-sky-400  rounded-md p-1 pl-6 pr-6 text-sky-600">
                              Dry
                            </span>
                          ) : (
                            ""
                          )}
                          {item.status.status === "transit to hospital" ? (
                            <span className="bg-sky-200  rounded-md p-1 pl-6 pr-6 text-sky-500">
                              Delivery
                            </span>
                          ) : (
                            ""
                          )}
                          {item.status.status === "success" ? (
                            <span className="bg-green-400  rounded-md p-1 pl-6 pr-6 text-green-600">
                              Done
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-full h-4 bg-green-100 rounded-full mt-2">
                          {item.status.status === "checking" ? (
                            <div
                              className="h-full text-center text-xs text-white bg-green-500 rounded-full"
                              style={{ width: "10%" }}
                            >
                              <span className="text-xs text-white text-center">
                                10%
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                          {item.status.status === "transit to laundry" ? (
                            <div
                              className="h-full text-center text-xs text-white bg-green-500 rounded-full"
                              style={{ width: "25%" }}
                            >
                              <span className="text-xs text-white text-center">
                                25%
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                          {item.status.status === "accepted" ? (
                            <div
                              className="h-full text-center text-xs text-white bg-green-500 rounded-full"
                              style={{ width: "45%" }}
                            >
                              <span className="text-xs text-white text-center">
                                45%
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                          {item.status.status === "wash" ? (
                            <div
                              className="h-full text-center text-xs text-white bg-green-500 rounded-full"
                              style={{ width: "60%" }}
                            >
                              <span className="text-xs text-white text-center">
                                60%
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                          {item.status.status === "drying" ? (
                            <div
                              className="h-full text-center text-xs text-white bg-green-500 rounded-full"
                              style={{ width: "75%" }}
                            >
                              <span className="text-xs text-white text-center">
                                75%
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                          {item.status.status === "transit to hospital" ? (
                            <div
                              className="h-full text-center text-xs text-white bg-green-500 rounded-full"
                              style={{ width: "85%" }}
                            >
                              <span className="text-xs text-white text-center">
                                85%
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                          {item.status.status === "success" ? (
                            <div
                              className="h-full text-center text-xs text-white bg-green-500 rounded-full"
                              style={{ width: "100%" }}
                            >
                              <span className="text-xs text-white text-center">
                                100%
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        {item.status.status === "checking" ? (
                          <div>
                            <ol className=" mt-3 ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.checking.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    {item.status.status}
                                  </div>
                                </div>
                              </li>
                            </ol>
                          </div>
                        ) : (
                          ""
                        )}
                        {item.status.status === "transit to laundry" ? (
                          <div>
                            <ol className=" mt-3 ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.checking.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Checking
                                  </div>
                                </div>
                              </li>
                            </ol>
                            <ol className=" ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.transit.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Transit
                                  </div>
                                </div>
                              </li>
                            </ol>
                          </div>
                        ) : (
                          ""
                        )}
                        {item.status.status === "accepted" ? (
                          <div>
                            <ol className=" mt-3 ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.checking.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Checking
                                  </div>
                                </div>
                              </li>
                            </ol>
                            <ol className=" ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.transit.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Transit
                                  </div>
                                </div>
                              </li>
                            </ol>
                            <ol className=" ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.accepted.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Accepted
                                  </div>
                                </div>
                              </li>
                            </ol>
                          </div>
                        ) : (
                          ""
                        )}
                        {item.status.status === "wash" ? (
                          <div>
                            <ol className=" mt-3 ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.checking.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Checking
                                  </div>
                                </div>
                              </li>
                            </ol>
                            <ol className=" ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.transit.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Transit
                                  </div>
                                </div>
                              </li>
                            </ol>
                            <ol className=" ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.accepted.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Accepted
                                  </div>
                                </div>
                              </li>
                            </ol>
                            <ol className=" ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.wash.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Washing
                                  </div>
                                </div>
                              </li>
                            </ol>
                          </div>
                        ) : (
                          ""
                        )}
                        {item.status.status === "drying" ? (
                          <div>
                            <ol className=" mt-3 ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.checking.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Checking
                                  </div>
                                </div>
                              </li>
                            </ol>
                            <ol className=" ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.transit.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Transit
                                  </div>
                                </div>
                              </li>
                            </ol>
                            <ol className=" ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.accepted.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Accepted
                                  </div>
                                </div>
                              </li>
                            </ol>
                            <ol className=" ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.wash.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Washing
                                  </div>
                                </div>
                              </li>
                            </ol>
                            <ol className=" ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.dry.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Drying
                                  </div>
                                </div>
                              </li>
                            </ol>
                          </div>
                        ) : (
                          ""
                        )}
                        {item.status.status === "transit to hospital" ? (
                          <div>
                            <ol className=" mt-3 ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.checking.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Checking
                                  </div>
                                </div>
                              </li>
                            </ol>
                            <ol className=" ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.transit.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Transit
                                  </div>
                                </div>
                              </li>
                            </ol>
                            <ol className=" ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.accepted.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Accepted
                                  </div>
                                </div>
                              </li>
                            </ol>
                            <ol className=" ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.wash.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Washing
                                  </div>
                                </div>
                              </li>
                            </ol>
                            <ol className=" ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.dry.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Drying
                                  </div>
                                </div>
                              </li>
                            </ol>
                            <ol className=" ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.returned.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Delivery
                                  </div>
                                </div>
                              </li>
                            </ol>
                          </div>
                        ) : (
                          ""
                        )}
                        {item.status.status === "success" ? (
                          <div>
                            <ol className=" mt-3 ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.checking.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Checking
                                  </div>
                                </div>
                              </li>
                            </ol>
                            <ol className=" ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.transit.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Transit
                                  </div>
                                </div>
                              </li>
                            </ol>
                            <ol className=" ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.accepted.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Accepted
                                  </div>
                                </div>
                              </li>
                            </ol>
                            <ol className=" ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.wash.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Washing
                                  </div>
                                </div>
                              </li>
                            </ol>
                            <ol className=" ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.dry.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Drying
                                  </div>
                                </div>
                              </li>
                            </ol>
                            <ol className=" ml-16 relative border-l border-white">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.returned.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Delivery
                                  </div>
                                </div>
                              </li>
                            </ol>
                            <ol className=" ml-16 relative ">
                              <li className="ml-4 ">
                                <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                                <div className="pt-0">
                                  <time className="mb-1 text-xs font-normal text-gray-200">
                                    {item.status.done.date}
                                  </time>
                                  <div className="text-sm font-normal text-white">
                                    Done
                                  </div>
                                </div>
                              </li>
                            </ol>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {/* Close Tracking View */}
          </div>
          {/* close left */}

          {/* right */}

          {data.map((item) => (
            <div>
              {item.status === null ? (
                ""
              ) : (
                <div className="bg-gray-200 p-7 w-full  " key={item._id}>
                  <h1 className="md:mt-28 text-lg font-bold">Tracking view</h1>
                  {item.status.status === "processing" ? (
                    <div className="p-3 bg-white rounded-md overflow-y-auto   md:w-[630px]">
                      <div className="flex  ">
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps in-active ">
                              <img src={Check} className="m-3 " alt="" />
                            </div>
                          </div>

                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps">
                              <img src={Transit} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps">
                              <img src={Acc} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps ">
                              <img src={Wash} className="" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps ">
                              <img src={Dry} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps">
                              <img src={Transit} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps ">
                              <img src={Acc} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {item.status.status === "checking" ? (
                    <div className="p-3 bg-white rounded-md overflow-y-auto   md:w-[630px] ">
                      <div className="flex">
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps active1 ">
                              <img src={Check} className="m-3 " alt="" />
                            </div>
                          </div>

                          <p className="text-[#537FE7] font-semibold">
                            Cheking
                          </p>
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps">
                              <img src={Transit} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps">
                              <img src={Acc} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps ">
                              <img src={Wash} className="" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps ">
                              <img src={Dry} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps">
                              <img src={Transit} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps ">
                              <img src={Acc} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {item.status.status === "transit to laundry" ? (
                    <div className="p-3 bg-white rounded-md  overflow-y-auto  md:w-[630px] ">
                      <div className="flex">
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps active1 ">
                              <img src={Check} className="m-3 " alt="" />
                            </div>
                          </div>

                          <p className="text-[#537FE7] font-semibold">
                            Cheking
                          </p>
                        </div>
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps">
                              <img src={Transit} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">
                            In transit
                          </p>
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps">
                              <img src={Acc} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                          {/* <p className="text-xs text-center">-</p> */}
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps ">
                              <img src={Wash} className="" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps ">
                              <img src={Dry} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps">
                              <img src={Transit} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps ">
                              <img src={Acc} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {item.status.status === "accepted" ? (
                    <div className="p-3 bg-white rounded-md overflow-y-auto md:w-[630px] ">
                      <div className="flex">
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps active1 ">
                              <img src={Check} className="m-3 " alt="" />
                            </div>
                          </div>

                          <p className="text-[#537FE7] font-semibold">
                            Cheking
                          </p>
                        </div>
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps">
                              <img src={Transit} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">
                            In transit
                          </p>
                        </div>
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps">
                              <img src={Acc} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">
                            Accepted
                          </p>
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps ">
                              <img src={Wash} className="" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps ">
                              <img src={Dry} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps">
                              <img src={Transit} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps ">
                              <img src={Acc} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {item.status.status === "wash" ? (
                    <div className="p-3 bg-white rounded-md overflow-y-auto  md:w-[630px] ">
                      <div className="flex">
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps active1 ">
                              <img src={Check} className="m-3 " alt="" />
                            </div>
                          </div>

                          <p className="text-[#537FE7] font-semibold">
                            Cheking
                          </p>
                        </div>
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps">
                              <img src={Transit} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">
                            In transit
                          </p>
                        </div>
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps">
                              <img src={Acc} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">
                            Accepted
                          </p>
                        </div>
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps ">
                              <img src={Wash} className="" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">Wash</p>
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps ">
                              <img src={Dry} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps">
                              <img src={Transit} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps ">
                              <img src={Acc} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {item.status.status === "drying" ? (
                    <div className="p-3 bg-white rounded-md overflow-y-auto md:w-[630px] ">
                      <div className="flex">
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps active1 ">
                              <img src={Check} className="m-3 " alt="" />
                            </div>
                          </div>

                          <p className="text-[#537FE7] font-semibold">
                            Cheking
                          </p>
                        </div>
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps">
                              <img src={Transit} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">
                            In transit
                          </p>
                        </div>
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps">
                              <img src={Acc} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">
                            Accepted
                          </p>
                        </div>
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps ">
                              <img src={Wash} className="" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">Wash</p>
                        </div>
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps ">
                              <img src={Dry} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">Dry </p>
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps">
                              <img src={Transit} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps ">
                              <img src={Acc} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {item.status.status === "transit to hospital" ? (
                    <div className="p-3 bg-white rounded-md overflow-y-auto md:w-[630px] ">
                      <div className="flex">
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps active1 ">
                              <img src={Check} className="m-3 " alt="" />
                            </div>
                          </div>

                          <p className="text-[#537FE7] font-semibold">
                            Cheking
                          </p>
                        </div>
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps">
                              <img src={Transit} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">
                            In transit
                          </p>
                        </div>
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps">
                              <img src={Acc} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">
                            Accepted
                          </p>
                        </div>
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps ">
                              <img src={Wash} className="" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">Wash</p>
                        </div>
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps ">
                              <img src={Dry} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">Dry </p>
                        </div>
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps">
                              <img src={Transit} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">
                            Delivery
                          </p>
                        </div>
                        <div className="step-item in-active">
                          <div className="step">
                            <div className="steps ">
                              <img src={Acc} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">-</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {item.status.status === "success" ? (
                    <div className="p-3 bg-white rounded-md  overflow-y-auto md:w-[630px] ">
                      <div className="flex w-[630px]">
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps active1 ">
                              <img src={Check} className="m-3 " alt="" />
                            </div>
                          </div>

                          <p className="text-[#537FE7] font-semibold">
                            Cheking
                          </p>
                        </div>
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps">
                              <img src={Transit} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">
                            In transit
                          </p>
                        </div>
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps">
                              <img src={Acc} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">
                            Accepted
                          </p>
                        </div>
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps ">
                              <img src={Wash} className="" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">Wash</p>
                        </div>
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps ">
                              <img src={Dry} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">Dry </p>
                        </div>
                        <div className="step-item active1">
                          <div className="step">
                            <div className="steps">
                              <img src={Transit} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">
                            Delivery
                          </p>
                        </div>
                        <div className="step-item complete">
                          <div className="step">
                            <div className="steps ">
                              <img src={Acc} className="m-3" alt="" />
                            </div>
                          </div>
                          <p className="text-[#537FE7] font-semibold">Done</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="pt-3 text-black font-semibold text-xl">
                    Main Info
                  </div>
                  {item.status.status === "transit to laundry" ? (
                    <div className="bg-white border border-gray-200 rounded-lg shadow">
                      <div className="p-3 text-black font-semibold">
                        <h1>Driver Information</h1>
                      </div>
                      <hr className=" h-1 bg-gray-100 border-0 rounded  " />

                      <div className="flex flex-col items-center  md:flex-row md:max-w-xl ">
                        {item.status?.transit.vehicle === "car" && (
                          <img className="md:h-auto " src={Mbl} alt="" />
                        )}
                        {item.status?.transit.vehicle === "motorcycle" && (
                          <img
                            className="md:h-auto "
                            src={Mtr}
                            alt=""
                            style={{ width: "40%" }}
                          />
                        )}

                        <div className="w-full pb-5">
                          {/* <h5 className=" pt-3 mb-2  text-xl font-bold tracking-tight text-gray-900 text-center">
       Mercedes-Benz Sprinter
     </h5>
     <hr className="bg-black h-0" /> */}
                          <div className="flex pl-3">
                            <div className="w-full pt-5">
                              <h1>Driver</h1>
                              <h1 className="font-semibold text-black">
                                {item.status.transit.name}
                              </h1>
                            </div>
                            <div className="pl-12 w-full pt-5">
                              <h1>License Plate</h1>
                              <h1 className="font-semibold text-black">
                                {item.status.transit.license}
                              </h1>
                            </div>
                          </div>
                          <div className="flex pl-3">
                            <div className=" w-full pt-5">
                              <h1>Weight</h1>
                              <h1 className="font-semibold text-black">
                                {item.status.transit.heavy}
                              </h1>
                            </div>
                            <div className="pl-20 w-full pt-5">
                              {/* <h1>Load Volume </h1>
         <h1 className="font-semibold text-black">244,32 in3</h1> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {item.status.status === "accepted" ? (
                    <div className="bg-white border border-gray-200 rounded-lg shadow">
                      <div className="p-3 text-black font-semibold">
                        <h1>Driver Information</h1>
                      </div>
                      <hr className=" h-1 bg-gray-100 border-0 rounded  " />

                      <div className="flex flex-col items-center  md:flex-row md:max-w-xl ">
                        <img className="md:h-auto " src={Mbl} alt="" />
                        <div className="w-full pb-5">
                          {/* <h5 className=" pt-3 mb-2  text-xl font-bold tracking-tight text-gray-900 text-center">
       Mercedes-Benz Sprinter
     </h5>
     <hr className="bg-black h-0" /> */}
                          <div className="flex pl-3">
                            <div className="w-full pt-5">
                              <h1>Driver</h1>
                              <h1 className="font-semibold text-black">
                                {item.status.transit.name}
                              </h1>
                            </div>
                            <div className="pl-12 w-full pt-5">
                              <h1>License Plate</h1>
                              <h1 className="font-semibold text-black">
                                {item.status.transit.license}
                              </h1>
                            </div>
                          </div>
                          <div className="flex pl-3">
                            <div className=" w-full pt-5">
                              <h1>Weight</h1>
                              <h1 className="font-semibold text-black">
                                {item.status.transit.heavy}
                              </h1>
                            </div>
                            <div className="pl-20 w-full pt-5">
                              {/* <h1>Load Volume </h1>
         <h1 className="font-semibold text-black">244,32 in3</h1> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {item.status.status === "wash" ? (
                    <div className="bg-white border border-gray-200 rounded-lg shadow">
                      <div className="p-3 text-black font-semibold">
                        <h1>Driver Information</h1>
                      </div>
                      <hr className=" h-1 bg-gray-100 border-0 rounded  " />

                      <div className="flex flex-col items-center  md:flex-row md:max-w-xl ">
                        <img className="md:h-auto " src={Mbl} alt="" />
                        <div className="w-full pb-5">
                          {/* <h5 className=" pt-3 mb-2  text-xl font-bold tracking-tight text-gray-900 text-center">
       Mercedes-Benz Sprinter
     </h5>
     <hr className="bg-black h-0" /> */}
                          <div className="flex pl-3">
                            <div className="w-full pt-5">
                              <h1>Driver</h1>
                              <h1 className="font-semibold text-black">
                                {item.status.transit.name}
                              </h1>
                            </div>
                            <div className="pl-12 w-full pt-5">
                              <h1>License Plate</h1>
                              <h1 className="font-semibold text-black">
                                {item.status.transit.license}
                              </h1>
                            </div>
                          </div>
                          <div className="flex pl-3">
                            <div className=" w-full pt-5">
                              <h1>Weight</h1>
                              <h1 className="font-semibold text-black">
                                {item.status.transit.heavy}
                              </h1>
                            </div>
                            <div className="pl-20 w-full pt-5">
                              {/* <h1>Load Volume </h1>
         <h1 className="font-semibold text-black">244,32 in3</h1> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {item.status.status === "drying" ? (
                    <div className="bg-white border border-gray-200 rounded-lg shadow">
                      <div className="p-3 text-black font-semibold">
                        <h1>Driver Information</h1>
                      </div>
                      <hr className=" h-1 bg-gray-100 border-0 rounded  " />

                      <div className="flex flex-col items-center  md:flex-row md:max-w-xl ">
                        <img className="md:h-auto " src={Mbl} alt="" />
                        <div className="w-full pb-5">
                          {/* <h5 className=" pt-3 mb-2  text-xl font-bold tracking-tight text-gray-900 text-center">
       Mercedes-Benz Sprinter
     </h5>
     <hr className="bg-black h-0" /> */}
                          <div className="flex pl-3">
                            <div className="w-full pt-5">
                              <h1>Driver</h1>
                              <h1 className="font-semibold text-black">
                                {item.status.transit.name}
                              </h1>
                            </div>
                            <div className="pl-12 w-full pt-5">
                              <h1>License Plate</h1>
                              <h1 className="font-semibold text-black">
                                {item.status.transit.license}
                              </h1>
                            </div>
                          </div>
                          <div className="flex pl-3">
                            <div className=" w-full pt-5">
                              <h1>Weight</h1>
                              <h1 className="font-semibold text-black">
                                {item.status.transit.heavy}
                              </h1>
                            </div>
                            <div className="pl-20 w-full pt-5">
                              {/* <h1>Load Volume </h1>
         <h1 className="font-semibold text-black">244,32 in3</h1> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {item.status.status === "transit to hospital" ? (
                    <div className="bg-white border border-gray-200 rounded-lg shadow">
                      <div className="p-3 text-black font-semibold">
                        <h1>Driver Information</h1>
                      </div>
                      <hr className=" h-1 bg-gray-100 border-0 rounded  " />

                      <div className="flex flex-col items-center  md:flex-row md:max-w-xl ">
                        <img className="md:h-auto " src={Mbl} alt="" />
                        <div className="w-full pb-5">
                          {/* <h5 className=" pt-3 mb-2  text-xl font-bold tracking-tight text-gray-900 text-center">
       Mercedes-Benz Sprinter
     </h5>
     <hr className="bg-black h-0" /> */}
                          <div className="flex pl-3">
                            <div className="w-full pt-5">
                              <h1>Driver</h1>
                              <h1 className="font-semibold text-black">
                                {item.status.transit.name}
                              </h1>
                            </div>
                            <div className="pl-12 w-full pt-5">
                              <h1>License Plate</h1>
                              <h1 className="font-semibold text-black">
                                {item.status.transit.license}
                              </h1>
                            </div>
                          </div>
                          <div className="flex pl-3">
                            <div className=" w-full pt-5">
                              <h1>Weight</h1>
                              <h1 className="font-semibold text-black">
                                {item.status.transit.heavy}
                              </h1>
                            </div>
                            <div className="pl-20 w-full pt-5">
                              {/* <h1>Load Volume </h1>
         <h1 className="font-semibold text-black">244,32 in3</h1> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {item.status.status === "success" ? (
                    <div className="bg-white border border-gray-200 rounded-lg shadow">
                      <div className="p-3 text-black font-semibold">
                        <h1>Driver Information</h1>
                      </div>
                      <hr className=" h-1 bg-gray-100 border-0 rounded  " />

                      <div className="flex flex-col items-center  md:flex-row md:max-w-xl ">
                        <img className="md:h-auto " src={Mbl} alt="" />
                        <div className="w-full pb-5">
                          {/* <h5 className=" pt-3 mb-2  text-xl font-bold tracking-tight text-gray-900 text-center">
       Mercedes-Benz Sprinter
     </h5>
     <hr className="bg-black h-0" /> */}
                          <div className="flex pl-3">
                            <div className="w-full pt-5">
                              <h1>Driver</h1>
                              <h1 className="font-semibold text-black">
                                {item.status.transit.name}
                              </h1>
                            </div>
                            <div className="pl-12 w-full pt-5">
                              <h1>License Plate</h1>
                              <h1 className="font-semibold text-black">
                                {item.status.transit.license}
                              </h1>
                            </div>
                          </div>
                          <div className="flex pl-3">
                            <div className=" w-full pt-5">
                              <h1>Weight</h1>
                              <h1 className="font-semibold text-black">
                                {item.status.transit.heavy}
                              </h1>
                            </div>
                            <div className="pl-20 w-full pt-5">
                              {/* <h1>Load Volume </h1>
         <h1 className="font-semibold text-black">244,32 in3</h1> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="bg-white mt-3 border border-gray-200 rounded-lg shadow">
                    <div className="p-3 text-black font-semibold">
                      <h1>Linen information</h1>
                    </div>
                    <hr className=" h-1 bg-gray-100 border-0 rounded  " />

                    <div className="flex flex-col items-center  md:flex-row md:max-w-xl ">
                      <img className="md:h-auto pl-10" src={Baju} alt="" />
                      <div className="w-full pb-5">
                        <h5 className=" pt-3 mb-2  text-xl font-bold tracking-tight text-gray-900 text-center">
                          {item.customer.name}
                        </h5>
                        <hr className="bg-black h-0" />
                        <div className="flex pl-3">
                          <div className="w-full pt-5">
                            <h1>Category</h1>
                            <h1 className="font-semibold text-black">
                              {" "}
                              {item.linen[0].category}
                            </h1>
                          </div>
                          <div className="pl-20 w-full pt-5">
                            <h1>Amount</h1>
                            <h1 className="font-semibold text-black">
                              {" "}
                              {item.amount}
                            </h1>
                          </div>
                        </div>
                        <div className="flex pl-3">
                          <div className=" w-full pt-5">
                            <h1>Weight</h1>
                            <h1 className="font-semibold text-black">
                              {item.weight}
                            </h1>
                          </div>
                          <div className="pl-20 w-full pt-5">
                            <h1>Quality</h1>
                            <h1 className="font-semibold text-black">
                              {item.quality}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {/* <div className=" px-4 w-full  bg-[#D7DAE2] h-auto min-h-full -pl-20">
        <div className="pt-20">
          <div className="bg-white  rounded-lg shadow-lg h-full">
            <div className="h-auto p-7 w-auto rounded-md">
              <div className="">
                <ol className="border-l border-sky-300 dark:border-sky-500 md:flex md:justify-center md:gap-6 md:border-l-0 md:border-t">
                  <li>
                    <div className="flex-start flex items-center pt-2 md:block md:pt-0">
                      <div className="-ml-[10px] mr-3 h-[50px] w-[50px] rounded-full bg-sky-300 dark:bg-sky-500 md:ml-0 md:mr-0 md:-mt-[10px]"></div>
                      <p className="mt-2 text-sm ">01.07.2023</p>
                    </div>
                  </li>
                  <li>
                    <div className="flex-start flex items-center pt-2 md:block md:pt-0">
                      <div className="-ml-[10px] mr-3 h-[50px] w-[50px] rounded-full bg-sky-300 dark:bg-sky-500 md:ml-0 md:mr-0 md:-mt-[10px]"></div>
                      <p className="mt-2 text-sm ">13.09.2023</p>
                    </div>
                  </li>
                  <li>
                    <div className="flex-start flex items-center pt-2 md:block md:pt-0">
                      <div className="-ml-[10px] mr-10 h-[50px] w-[50px] rounded-full bg-sky-300 dark:bg-sky-500 md:ml-0 md:mr-0 md:-mt-[10px]"></div>
                      <p className="mt-2 text-sm ">25.11.2023</p>
                    </div>
                    <div className="mt-2 ml-4 pb-5 md:ml-0"></div>
                  </li>
                  <li>
                    <div className="flex-start flex items-center pt-2 md:block md:pt-0">
                      <div className="-ml-[10px] mr-10 h-[50px] w-[50px] rounded-full bg-sky-300 dark:bg-sky-500 md:ml-0 md:mr-0 md:-mt-[10px]"></div>
                      <p className="mt-2 text-sm ">25.11.2023</p>
                    </div>
                    <div className="mt-2 ml-4 pb-5 md:ml-0"></div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div> */}
        </div>
      </div>
    </>
  );
};

export default Tracking;
