import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
const Permintaan = ({ distribusi }) => {
  const [showTransit, setShowTransit] = React.useState(false);
  const [showDelivery, setShowDelivery] = React.useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [license, setLicense] = useState("");
  const [amount, setAmount] = useState("");
  const [heavy, setHeavy] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState([]);
  const [msg, setMsg] = useState("");
  const { id } = useParams();

  //Transit
  useEffect(() => {
    handleShowTransit();
  }, [id]);
  const handleShowTransit = async (id) => {
    setShowTransit(id, true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:9000/api/v1/rfid/tracker/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setStatus([response.data.data]);
      // console.log(response.data.data);
    } catch (error) {
      if (error.response) {
        // console.log(error.response);
        // setMsg(error.response.data.);
      }
    }
  };
  const updateTransit = async (id, e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios
        .put(
          `http://localhost:9000/api/v1/rfid/tracker/transit/${id}`,

          {
            name: name,
            email: email,
            no_hp: no_hp,
            vehicle: vehicle,
            license: license,
            amount: amount,
            heavy: heavy,
            note: note,
          },

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            text: data.message,
          });
        });

      // navigate("/distribusi");
      // e.preventDefault();
      window.location.reload();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        // console.log(error.response.data);
      } else {
        // console.log(error.data);
      }
    }
  };

  //Delivery
  useEffect(() => {
    handleShowDelivery();
  }, [id]);
  const handleShowDelivery = async (id) => {
    setShowDelivery(id, true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:9000/api/v1/rfid/tracker/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setStatus([response.data.data]);
      // console.log(response.data.data);
    } catch (error) {
      if (error.response) {
        // console.log(error.response);
        // setMsg(error.response.data.);
      }
    }
  };
  const updateDelivery = async (id, e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios
        .put(
          `http://localhost:9000/api/v1/rfid/tracker/delivery/${id}`,

          {
            name: name,
            email: email,
            no_hp: no_hp,
            vehicle: vehicle,
            license: license,
            amount: amount,
            heavy: heavy,
            note: note,
          },

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            text: data.message,
          });
        });
      // console.log(response);
      // navigate("/distribusi");
      window.location.reload();
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          text: error.response.data.msg,
        });
        console.log(error.response.data);
        // setMsg(error.response.data.msg);
      } else {
        console.log(error.data);
      }
    }
  };

  return (
    <>
      <table className=" w-full ltr:text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="border-b bg-white font-medium">
          <tr>
            <th scope="col" className="px-6 py-4">
              No
            </th>
            <th scope="col" className="px-6 py-4">
              Customer
            </th>
            <th scope="col" className="px-6 py-4">
              Tanggal Masuk
            </th>
            <th scope="col" className="px-6 py-4">
              Tanggal Keluar
            </th>

            <th scope="col" className="px-6 py-4">
              Kualitas Linen
            </th>

            <th scope="col" className="px-6 py-4">
              Jumlah Linen
            </th>

            <th scope="col" className="px-6 py-4">
              Proses
            </th>
          </tr>
        </thead>
        <tbody>
          {distribusi.map((item, index) => (
            <tr key={item._id} className="border-b text-center text-gray-600">
              <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.customer.name}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.dateIn}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.dateOut}</td>

              <td className="whitespace-nowrap px-6 py-4">
                {item.quality === "baik" ? <span>Baik</span> : ""}
                {item.quality === "kurang baik" ? <span>Kurang Baik</span> : ""}
              </td>

              <td className="whitespace-nowrap px-6 py-4">{item.amount}</td>

              <td className="whitespace-nowrap px-6 py-4">
                {" "}
                {item.status === null ? (
                  <span className="bg-[#b5f1b5]  pr-2 pl-2 rounded-lg">Confirm</span>
                ) : (
                  ""
                )}
                {item?.status?.status === "processing" ? (
                  <span className="bg-[#96CDF4]  pr-2 pl-2 rounded-lg">CheckIn</span>
                ) : (
                  ""
                )}
                {item?.status?.status === "checking" ? (
                  <button
                    onClick={() => handleShowTransit(item.status._id)}
                    className="bg-[#FEBF00] hover:bg-[#f8db84] pr-2 pl-2 rounded-lg"
                  >
                    Transit
                  </button>
                ) : (
                  ""
                )}
                {item?.status?.status === "transit to laundry" ? (
                  <span className="bg-[#5eebc7] pr-2 pl-2 rounded-lg">Accepted</span>
                ) : (
                  ""
                )}
                {item?.status?.status === "accepted" ? (
                  <span className="bg-[#65a0f8]  pr-2 pl-2 rounded-lg">Wash</span>
                ) : (
                  ""
                )}
                {item?.status?.status === "wash" ? (
                  <span className="bg-[#82f865] pr-2 pl-2 rounded-lg">Dry</span>
                ) : (
                  ""
                )}
                {item?.status?.status === "drying" ? (
                  <button
                    onClick={() => handleShowDelivery(item.status._id)}
                    className="bg-[#54e2f5] hover:bg-[#9becf7] pr-2 pl-2 rounded-lg"
                  >
                    Delivery
                  </button>
                ) : (
                  ""
                )}
                {item?.status?.status === "transit to hospital" ? (
                  <span className="bg-[#40e6ae]  pr-2 pl-2 rounded-lg">Done</span>
                ) : (
                  ""
                )}
                {item?.status?.status === "success" ? (
                  <span className=" rounded-md bg-[#10e04f] px-4 py-px text-xs font-semibold uppercase text-gray-900 antialiased">
                    Success
                  </span>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showTransit ? (
        <>
          <div className=" overflow-x-hidden m-4  scrollbars fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    Transit <input type="text" />
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-red-600  hover:text-red-400 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowTransit(false)}
                  >
                    <span className=" text-red-500  hover:text-red-300  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                {status.map((item) => (
                  <div className="relative p-6 flex-auto" key={item._id}>
                    {Object.keys(msg).length > 0 && (
                      <div className="font-semibold">
                        <p className="bg-red-200 uppercase opacity-75 font-sans  text-red-500 rounded text-center p-2 m-3">
                          {msg}
                        </p>
                      </div>
                    )}
                    <form className="w-full" onSubmit={(e) => updateTransit(item._id, e)}>
                      <div className="mb-2">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Driver name"
                        />
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="md:w-1/2 md:mb-2  w-full">
                          <div className="mb-2">
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                              placeholder="Email"
                            />
                          </div>
                        </div>
                        <div className=" md:w-1/2  lg:pl-3 md:pl-3  w-full">
                          {" "}
                          <div className="mb-2">
                            <input
                              type="text"
                              value={no_hp}
                              onChange={(e) => setNo_hp(e.target.value)}
                              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                              placeholder="Phone number"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="md:w-1/2 md:mb-2  w-full">
                          <div className="mb-2">
                            <select
                              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                              value={vehicle}
                              onChange={(e) => setVehicle(e.target.value)}
                            >
                              <option selected>Vehicle type : </option>

                              <option value="car">Car</option>
                              <option value="motorcycle">Motorcycle</option>
                            </select>
                          </div>
                        </div>
                        <div className=" md:w-1/2  lg:pl-3 md:pl-3  w-full">
                          {" "}
                          <div className="mb-2">
                            <input
                              type="text"
                              value={license}
                              onChange={(e) => setLicense(e.target.value)}
                              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                              placeholder="License plate"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mb-2">
                        <input
                          type="text"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Amount"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          value={heavy}
                          onChange={(e) => setHeavy(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Heavy"
                        />
                      </div>
                      <div className="mb-2">
                        <textarea
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          cols="30"
                          rows="5"
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          placeholder="Notes"
                        ></textarea>
                      </div>

                      {/*footer*/}
                      <div className="flex justify-center pt-10">
                        <button
                          className="bg-[#A4BC92] text-white active:bg-[#C7E9B0] font-semibold text-sm px-5 py-2 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                          type="submit"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showDelivery ? (
        <>
          <div className=" overflow-x-hidden m-4  scrollbars fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Delivery</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-red-600  hover:text-red-400 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowDone(false)}
                  >
                    <span className=" text-red-500  hover:text-red-300  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                {status.map((item) => (
                  <div className="relative p-6 flex-auto" key={item._id}>
                    <form className="w-full" onSubmit={(e) => updateDelivery(item._id, e)}>
                      <div className="mb-2">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Driver name"
                        />
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="md:w-1/2 md:mb-2  w-full">
                          <div className="mb-2">
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                              placeholder="Email"
                            />
                          </div>
                        </div>
                        <div className=" md:w-1/2  lg:pl-3 md:pl-3  w-full">
                          {" "}
                          <div className="mb-2">
                            <input
                              type="text"
                              value={no_hp}
                              onChange={(e) => setNo_hp(e.target.value)}
                              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                              placeholder="Phone number"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="md:w-1/2 md:mb-2  w-full">
                          <div className="mb-2">
                            <select
                              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                              value={vehicle}
                              onChange={(e) => setVehicle(e.target.value)}
                            >
                              <option selected>Vehicle type : </option>

                              <option value="car">Car</option>
                              <option value="motorcycle">Motorcycle</option>
                            </select>
                          </div>
                        </div>
                        <div className=" md:w-1/2  lg:pl-3 md:pl-3  w-full">
                          {" "}
                          <div className="mb-2">
                            <input
                              type="text"
                              value={license}
                              onChange={(e) => setLicense(e.target.value)}
                              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                              placeholder="License plate"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mb-2">
                        <input
                          type="text"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Amount"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          value={heavy}
                          onChange={(e) => setHeavy(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Heavy"
                        />
                      </div>
                      <div className="mb-2">
                        <textarea
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          cols="30"
                          rows="5"
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          placeholder="Notes"
                        ></textarea>
                      </div>

                      {/*footer*/}
                      <div className="flex justify-center pt-10">
                        <button
                          className="bg-[#A4BC92] text-white active:bg-[#C7E9B0] font-semibold text-sm px-5 py-2 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                          type="submit"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Permintaan;
