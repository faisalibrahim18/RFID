import React, { useEffect, useState } from "react";
import Check from "../../assets/check.png";
import Dry from "../../assets/dry.png";
import Acc from "../../assets/acc.png";
import Transit from "../../assets/transit.png";
import Wash from "../../assets/wash.png";
import Mbl from "../../assets/mbl.png";
import Baju from "../../assets/baju.png";
import "./stepper.css";
import axios from "axios";
const Tracking = () => {
  const steps = ["Customer Info", "Shipping Info", "Payment", "Step 4"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  const [tracker, setTracker] = useState([]);

  useEffect(() => {
    getTracking();
  }, []);

  const getTracking = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:9000/api/v1/rfid/distribusi", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response);
    setTracker(response.data.data);
  };
  return (
    <div className="md:flex flex-row -mt-32">
      {/* left */}
      <div className="p-2 lg:pl-5  pl-2 font-semibold flex-wrap flex pt-36">
        {/* Tracking View */}

        <div className="flex-shrink max-w-full px-4 w-full  mb-6">
          <div className="bg-[#537FE7]  rounded-lg shadow-lg h-full p-6">
            <div className="flex flex-row justify-between pb-3">
              <div className="flex flex-col">
                <h3 className="text-base font-semibold text-white">Order Id : BKA776SDJK89L</h3>
              </div>
              <div className="relative">
                <span className="bg-green-400  rounded-md p-1 pl-6 pr-6 text-green-600">Wash</span>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-4 bg-green-100 rounded-full mt-2">
                <div
                  className="h-full text-center text-xs text-white bg-green-500 rounded-full"
                  style={{ width: "50%" }}
                >
                  {/* <span className="text-xs text-white text-center">86%</span> */}
                </div>
              </div>
              <div>
                {" "}
                <div className="absolute text-gray-200 text-sm ">21 JUN</div>
                <ol className=" mt-3 ml-16 relative border-l border-white">
                  <li className="ml-4 ">
                    <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                    <div className="pt-0">
                      <time className="mb-1 text-xs font-normal text-gray-200">10.10 AM</time>
                      <div className="text-sm font-normal text-white">In transit</div>
                    </div>
                  </li>
                </ol>
              </div>
              <div>
                {" "}
                <div className="absolute text-gray-200 text-sm ">21 JUN</div>
                <ol className=" ml-16 relative border-l border-white">
                  <li className="ml-4 ">
                    <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                    <div className="pt-0">
                      <time className="mb-1 text-xs font-normal text-gray-200">11.25 AM</time>
                      <div className="text-sm font-normal text-white">Accepted</div>
                    </div>
                  </li>
                </ol>
              </div>
              <div>
                {" "}
                <div className="absolute text-gray-200 text-sm ">22 JUN</div>
                <ol className=" ml-16 relative border-l border-white">
                  <li className="ml-4 ">
                    <div className="absolute w-3 h-3 bg-white rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-white"></div>
                    <div className="pt-0">
                      <time className="mb-1 text-xs font-normal text-gray-200">09.00 AM</time>
                      <div className="text-sm font-normal text-white">Wash</div>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-shrink max-w-full px-4 w-full  mb-6">
          <div className="bg-white  rounded-lg shadow-lg h-full p-6">
            <div className="flex flex-row justify-between pb-3">
              <div className="flex flex-col">
                <h3 className="text-base font-semibold ">Order Id : BKA776SDJK89L</h3>
              </div>
              <div className="relative">
                <span className="bg-yellow-200  rounded-md p-1 pl-6 pr-6 text-yellow-600">Cheking</span>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-4 bg-blue-100 rounded-full mt-2">
                <div
                  className="h-full text-center text-xs text-white bg-[#537FE7] rounded-full"
                  style={{ width: "50%" }}
                >
                  {/* <span className="text-xs text-white text-center">86%</span> */}
                </div>
              </div>
              <div>
                {" "}
                <div className="absolute text-gray-400 text-sm ">21 JUN</div>
                <ol className=" mt-3 ml-16 relative border-dashed border-l-2  border-black">
                  <li className="ml-4 ">
                    <div className="absolute w-3 h-3 bg-black rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-black"></div>
                    <div className="pt-0">
                      <time className="mb-1 text-xs font-normal text-gray-400">10.10 AM</time>
                      <div className="text-sm font-normal text-black">In transit</div>
                    </div>
                  </li>
                </ol>
              </div>
              <div>
                {" "}
                <div className="absolute text-gray-400 text-sm ">21 JUN</div>
                <ol className=" ml-16 relative border-dashed border-l-2 border-black">
                  <li className="ml-4 ">
                    <div className="absolute w-3 h-3 bg-black rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-black"></div>
                    <div className="pt-0">
                      <time className="mb-1 text-xs font-normal text-gray-400">11.25 AM</time>
                      <div className="text-sm font-normal text-black">Accepted</div>
                    </div>
                  </li>
                </ol>
              </div>
              <div>
                {" "}
                <div className="absolute text-gray-400 text-sm ">22 JUN</div>
                <ol className=" ml-16 relative border-dashed border-l-2 border-black">
                  <li className="ml-4 ">
                    <div className="absolute w-3 h-3 bg-black rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-black"></div>
                    <div className="pt-0">
                      <time className="mb-1 text-xs font-normal text-gray-400">09.00 AM</time>
                      <div className="text-sm font-normal text-black">Wash</div>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-shrink max-w-full px-4 w-full  mb-6">
          <div className="bg-white  rounded-lg shadow-lg h-full p-6">
            <div className="flex flex-row justify-between pb-3">
              <div className="flex flex-col">
                <h3 className="text-base font-semibold ">Order Id : BKA776SDJK89L</h3>
              </div>
              <div className="relative">
                <span className="bg-yellow-200  rounded-md p-1 pl-6 pr-6 text-yellow-600">Cheking</span>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-4 bg-blue-100 rounded-full mt-2">
                <div
                  className="h-full text-center text-xs text-white bg-[#537FE7] rounded-full"
                  style={{ width: "50%" }}
                >
                  {/* <span className="text-xs text-white text-center">86%</span> */}
                </div>
              </div>
              <div>
                {" "}
                <div className="absolute text-gray-400 text-sm ">21 JUN</div>
                <ol className=" mt-3 ml-16 relative border-dashed border-l-2  border-black">
                  <li className="ml-4 ">
                    <div className="absolute w-3 h-3 bg-black rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-black"></div>
                    <div className="pt-0">
                      <time className="mb-1 text-xs font-normal text-gray-400">10.10 AM</time>
                      <div className="text-sm font-normal text-black">In transit</div>
                    </div>
                  </li>
                </ol>
              </div>
              <div>
                {" "}
                <div className="absolute text-gray-400 text-sm ">21 JUN</div>
                <ol className=" ml-16 relative border-dashed border-l-2 border-black">
                  <li className="ml-4 ">
                    <div className="absolute w-3 h-3 bg-black rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-black"></div>
                    <div className="pt-0">
                      <time className="mb-1 text-xs font-normal text-gray-400">11.25 AM</time>
                      <div className="text-sm font-normal text-black">Accepted</div>
                    </div>
                  </li>
                </ol>
              </div>
              <div>
                {" "}
                <div className="absolute text-gray-400 text-sm ">22 JUN</div>
                <ol className=" ml-16 relative border-dashed border-l-2 border-black">
                  <li className="ml-4 ">
                    <div className="absolute w-3 h-3 bg-black rounded-full items-center justify-between mb-3 sm:flex  -left-1.5 border border-black"></div>
                    <div className="pt-0">
                      <time className="mb-1 text-xs font-normal text-gray-400">09.00 AM</time>
                      <div className="text-sm font-normal text-black">Wash</div>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Close Tracking View */}
      </div>
      {/* close left */}

      {/* right */}
      {tracker.map((item) => (
        <div className="bg-gray-200 p-7 w-full " key={item._id}>
          <h1 className="md:mt-28 text-lg font-bold">Tracking view</h1>
          {item.status.status === "processing" ? (
            <div className="p-3 bg-white rounded-md  md:w-[630px] ">
              <div className="flex  ">
                <div className="step-item in-active">
                  <div className="step">
                    <div className="steps in-active ">
                      <img src={Check} className="m-3 " alt="" />
                    </div>
                  </div>

                  <p className="text-[#537FE7] font-semibold">-</p>
                  <p className="text-xs text-center">-</p>
                </div>
                <div className="step-item in-active">
                  <div className="step">
                    <div className="steps">
                      <img src={Transit} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">-</p>
                  <p className="text-xs text-center">-</p>
                </div>
                <div className="step-item in-active">
                  <div className="step">
                    <div className="steps">
                      <img src={Acc} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">-</p>
                  <p className="text-xs text-center">-</p>
                </div>
                <div className="step-item in-active">
                  <div className="step">
                    <div className="steps ">
                      <img src={Wash} className="" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">-</p>
                  <p className="text-xs text-center">-</p>
                </div>
                <div className="step-item in-active">
                  <div className="step">
                    <div className="steps ">
                      <img src={Dry} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">-</p>
                  <p className="text-xs text-center">-</p>
                </div>
                <div className="step-item in-active">
                  <div className="step">
                    <div className="steps ">
                      <img src={Acc} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">-</p>
                  <p className="text-xs text-center">-</p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {item.status.status === "processing" ? (
            <div className="p-3 bg-white rounded-md    md:w-[630px] ">
              <div className="flex">
                <div className="step-item active">
                  <div className="step">
                    <div className="steps active ">
                      <img src={Check} className="m-3 " alt="" />
                    </div>
                  </div>

                  <p className="text-[#537FE7] font-semibold">Cheking</p>
                  <p className="text-xs text-center">21-06-2023 08.15</p>
                </div>
                <div className="step-item in-active">
                  <div className="step">
                    <div className="steps">
                      <img src={Transit} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">-</p>
                  <p className="text-xs text-center">-</p>
                </div>
                <div className="step-item in-active">
                  <div className="step">
                    <div className="steps">
                      <img src={Acc} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">-</p>
                  <p className="text-xs text-center">-</p>
                </div>
                <div className="step-item in-active">
                  <div className="step">
                    <div className="steps ">
                      <img src={Wash} className="" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">-</p>
                  <p className="text-xs text-center">-</p>
                </div>
                <div className="step-item in-active">
                  <div className="step">
                    <div className="steps ">
                      <img src={Dry} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">-</p>
                  <p className="text-xs text-center">-</p>
                </div>
                <div className="step-item in-active">
                  <div className="step">
                    <div className="steps ">
                      <img src={Acc} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">-</p>
                  <p className="text-xs text-center">-</p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {item.status.status === "processing" ? (
            <div className="p-3 bg-white rounded-md    md:w-[630px] ">
              <div className="flex">
                <div className="step-item active">
                  <div className="step">
                    <div className="steps active ">
                      <img src={Check} className="m-3 " alt="" />
                    </div>
                  </div>

                  <p className="text-[#537FE7] font-semibold">Cheking</p>
                  <p className="text-xs text-center">21-06-2023 08.15</p>
                </div>
                <div className="step-item active">
                  <div className="step">
                    <div className="steps">
                      <img src={Transit} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">In transit</p>
                  <p className="text-xs text-center">21-06-2023 10.10</p>
                </div>
                <div className="step-item in-active">
                  <div className="step">
                    <div className="steps">
                      <img src={Acc} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">-</p>
                  <p className="text-xs text-center">-</p>
                </div>
                <div className="step-item in-active">
                  <div className="step">
                    <div className="steps ">
                      <img src={Wash} className="" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">-</p>
                  <p className="text-xs text-center">-</p>
                </div>
                <div className="step-item in-active">
                  <div className="step">
                    <div className="steps ">
                      <img src={Dry} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">-</p>
                  <p className="text-xs text-center">-</p>
                </div>
                <div className="step-item in-active">
                  <div className="step">
                    <div className="steps ">
                      <img src={Acc} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">-</p>
                  <p className="text-xs text-center">-</p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {item.status.status === "processing" ? (
            <div className="p-3 bg-white rounded-md    md:w-[630px] ">
              <div className="flex">
                <div className="step-item active">
                  <div className="step">
                    <div className="steps active ">
                      <img src={Check} className="m-3 " alt="" />
                    </div>
                  </div>

                  <p className="text-[#537FE7] font-semibold">Cheking</p>
                  <p className="text-xs text-center">21-06-2023 08.15</p>
                </div>
                <div className="step-item active">
                  <div className="step">
                    <div className="steps">
                      <img src={Transit} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">In transit</p>
                  <p className="text-xs text-center">21-06-2023 10.10</p>
                </div>
                <div className="step-item active">
                  <div className="step">
                    <div className="steps">
                      <img src={Acc} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">Accepted</p>
                  <p className="text-xs text-center">21-06-2023 11.25</p>
                </div>
                <div className="step-item in-active">
                  <div className="step">
                    <div className="steps ">
                      <img src={Wash} className="" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">-</p>
                  <p className="text-xs text-center">-</p>
                </div>
                <div className="step-item in-active">
                  <div className="step">
                    <div className="steps ">
                      <img src={Dry} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">-</p>
                  <p className="text-xs text-center">-</p>
                </div>
                <div className="step-item in-active">
                  <div className="step">
                    <div className="steps ">
                      <img src={Acc} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">-</p>
                  <p className="text-xs text-center">-</p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {item.status.status === "processing" ? (
            <div className="p-3 bg-white rounded-md    md:w-[630px] ">
              <div className="flex">
                <div className="step-item active">
                  <div className="step">
                    <div className="steps active ">
                      <img src={Check} className="m-3 " alt="" />
                    </div>
                  </div>

                  <p className="text-[#537FE7] font-semibold">Cheking</p>
                  <p className="text-xs text-center">21-06-2023 08.15</p>
                </div>
                <div className="step-item active">
                  <div className="step">
                    <div className="steps">
                      <img src={Transit} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">In transit</p>
                  <p className="text-xs text-center">21-06-2023 10.10</p>
                </div>
                <div className="step-item active">
                  <div className="step">
                    <div className="steps">
                      <img src={Acc} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">Accepted</p>
                  <p className="text-xs text-center">21-06-2023 11.25</p>
                </div>
                <div className="step-item active">
                  <div className="step">
                    <div className="steps ">
                      <img src={Wash} className="" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">Wash</p>
                  <p className="text-xs text-center">22-06-2023 09.00</p>
                </div>
                <div className="step-item in-active">
                  <div className="step">
                    <div className="steps ">
                      <img src={Dry} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">-</p>
                  <p className="text-xs text-center">-</p>
                </div>
                <div className="step-item in-active">
                  <div className="step">
                    <div className="steps ">
                      <img src={Acc} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">-</p>
                  <p className="text-xs text-center">-</p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {item.status.status === "processing" ? (
            <div className="p-3 bg-white rounded-md    md:w-[630px] ">
              <div className="flex">
                <div className="step-item active">
                  <div className="step">
                    <div className="steps active ">
                      <img src={Check} className="m-3 " alt="" />
                    </div>
                  </div>

                  <p className="text-[#537FE7] font-semibold">Cheking</p>
                  <p className="text-xs text-center">21-06-2023 08.15</p>
                </div>
                <div className="step-item active">
                  <div className="step">
                    <div className="steps">
                      <img src={Transit} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">In transit</p>
                  <p className="text-xs text-center">21-06-2023 10.10</p>
                </div>
                <div className="step-item active">
                  <div className="step">
                    <div className="steps">
                      <img src={Acc} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">Accepted</p>
                  <p className="text-xs text-center">21-06-2023 11.25</p>
                </div>
                <div className="step-item active">
                  <div className="step">
                    <div className="steps ">
                      <img src={Wash} className="" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">Wash</p>
                  <p className="text-xs text-center">22-06-2023 09.00</p>
                </div>
                <div className="step-item active">
                  <div className="step">
                    <div className="steps ">
                      <img src={Dry} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">Dry </p>
                  <p className="text-xs text-center">21-06-2023 08.15</p>
                </div>
                <div className="step-item in-active">
                  <div className="step">
                    <div className="steps ">
                      <img src={Acc} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">-</p>
                  <p className="text-xs text-center">-</p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {item.status.status === "processing" ? (
            <div className="p-3 bg-white rounded-md  md:w-[630px] ">
              <div className="flex">
                <div className="step-item active">
                  <div className="step">
                    <div className="steps active ">
                      <img src={Check} className="m-3 " alt="" />
                    </div>
                  </div>

                  <p className="text-[#537FE7] font-semibold">Cheking</p>
                  <p className="text-xs text-center">21-06-2023 08.15</p>
                </div>
                <div className="step-item active">
                  <div className="step">
                    <div className="steps">
                      <img src={Transit} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">In transit</p>
                  <p className="text-xs text-center">21-06-2023 10.10</p>
                </div>
                <div className="step-item active">
                  <div className="step">
                    <div className="steps">
                      <img src={Acc} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">Accepted</p>
                  <p className="text-xs text-center">21-06-2023 11.25</p>
                </div>
                <div className="step-item active">
                  <div className="step">
                    <div className="steps ">
                      <img src={Wash} className="" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">Wash</p>
                  <p className="text-xs text-center">22-06-2023 09.00</p>
                </div>
                <div className="step-item active">
                  <div className="step">
                    <div className="steps ">
                      <img src={Dry} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">Dry </p>
                  <p className="text-xs text-center">21-06-2023 08.15</p>
                </div>
                <div className="step-item complete">
                  <div className="step">
                    <div className="steps ">
                      <img src={Acc} className="m-3" alt="" />
                    </div>
                  </div>
                  <p className="text-[#537FE7] font-semibold">Done</p>
                  <p className="text-xs text-center">21-06-2023 08.15</p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="pt-3 text-black font-semibold text-xl">Main Info</div>
          <div className="bg-white border border-gray-200 rounded-lg shadow">
            <div className="p-3 text-black font-semibold">
              <h1>Driver Information</h1>
            </div>
            <hr className=" h-1 bg-gray-100 border-0 rounded  " />

            <div className="flex flex-col items-center  md:flex-row md:max-w-xl ">
              <img className="md:h-auto " src={Mbl} alt="" />
              <div className="w-full pb-5">
                <h5 className=" pt-3 mb-2  text-xl font-bold tracking-tight text-gray-900 text-center">
                  Mercedes-Benz Sprinter
                </h5>
                <hr className="bg-black h-0" />
                <div className="flex pl-3">
                  <div className="w-full pt-5">
                    <h1>Driver</h1>
                    <h1 className="font-semibold text-black">John Doe</h1>
                  </div>
                  <div className="pl-20 w-full pt-5">
                    <h1>License Plate</h1>
                    <h1 className="font-semibold text-black">F 8689 GN</h1>
                  </div>
                </div>
                <div className="flex pl-3">
                  <div className=" w-full pt-5">
                    <h1>Weight</h1>
                    <h1 className="font-semibold text-black">5, 470 KG</h1>
                  </div>
                  <div className="pl-20 w-full pt-5">
                    <h1>Load Volume </h1>
                    <h1 className="font-semibold text-black">244,32 in3</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white mt-3 border border-gray-200 rounded-lg shadow">
            <div className="p-3 text-black font-semibold">
              <h1>Driver Information</h1>
            </div>
            <hr className=" h-1 bg-gray-100 border-0 rounded  " />

            <div className="flex flex-col items-center  md:flex-row md:max-w-xl ">
              <img className="md:h-auto pl-10" src={Baju} alt="" />
              <div className="w-full pb-5">
                <h5 className=" pt-3 mb-2  text-xl font-bold tracking-tight text-gray-900 text-center">
                  Mercedes-Benz Sprinter
                </h5>
                <hr className="bg-black h-0" />
                <div className="flex pl-3">
                  <div className="w-full pt-5">
                    <h1>Category</h1>
                    <h1 className="font-semibold text-black">Hospital Gown</h1>
                  </div>
                  <div className="pl-20 w-full pt-5">
                    <h1>Amount</h1>
                    <h1 className="font-semibold text-black">60pcs</h1>
                  </div>
                </div>
                <div className="flex pl-3">
                  <div className=" w-full pt-5">
                    <h1>Weight</h1>
                    <h1 className="font-semibold text-black">25KG</h1>
                  </div>
                  <div className="pl-20 w-full pt-5">
                    <h1>Quality</h1>
                    <h1 className="font-semibold text-black">Good</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
  );
};

export default Tracking;
