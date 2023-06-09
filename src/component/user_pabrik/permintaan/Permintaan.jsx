import React, { useEffect, useState } from "react";
import Ds from "../../../assets/ds.png";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Permintaan = () => {
  const [distribusi, setDistribusi] = useState([]);
  const [showProses, setShowProses] = React.useState(false);

  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [heavy, setHeavy] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState([]);
  const [msg, setMsg] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getDistribusi();
  }, []);
  const getDistribusi = async () => {
    const response = await axios.get("http://localhost:9000/api/v1/rfid/distribusi");
    // console.log(response.data.data);
    setDistribusi(response.data.data);
  };

  //Checkin
  const handleShowCheck = async (id) => {
    setShowProses(id, true);
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
  useEffect(() => {
    handleShowCheck();
  }, [id]);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const setShowProses1 = async (id, e) => {
    // console.log(id);
    e.preventDefault();
    try {
      if (file) {
        // console.log("check", file);
        // console.log("name", name);
        // console.log("email", email);
        // console.log("no_hp", no_hp);
        // console.log("heavy", heavy);
        // console.log("note", note);
      }
      const formData = new FormData();
      formData.append("check", file);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("no_hp", no_hp);
      formData.append("heavy", heavy);
      formData.append("note", note);
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios
        .put(`http://localhost:9000/api/v1/rfid/tracker/checking/${id}`, formData, config)
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            text: data.message,
          });
        });
      // console.log(response);
      // navigate("/distribusi");
      window.location.reload();
      // e.preventDefault();
    } catch (error) {
      console.log(error);
      if (error.response) {
        Swal.fire({
          text: error.response.data.message,
          icon: "error",
        });
        // console.log(error.response.data.message);
        setMsg(error.response.data.message);
      } else {
        // console.log(error.response.message);
        Swal.fire({
          text: error.data.message,
          icon: "error",
        });
      }
    }
  };

  return (
    <>
      <div className=" p-2">
        <div className="flex flex-wrap flex-row">
          <div className="flex-shrink max-w-full px-4 w-1/2">
            <h1 className="text-3xl font-semibold mt-3 mb-5">Laporan</h1>
          </div>
          <div className="flex w-full mb-7 ml-5 md:ml-auto mr-4  font-semibold justify-between md:w-1/3 md:justify-end">
            {/* <Link to={"/users/add"} className="bg-[#96CDF4] p-2 rounded-md  hover:bg-blue-200">
      <i className="fa-solid fa-user-plus"></i> Add User
    </Link> */}
          </div>
        </div>

        <div className="flex flex-wrap flex-row px-4 ">
          <div className="flex-shrink max-w-full w-full rounded-md bg-white shadow-lg">
            <div className="p-6  rounded-lg ">
              <div className="overflow-x-auto">
                <table className=" w-full ltr:text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="border-b bg-white font-medium ">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        No
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Custumer
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Tgl Masuk
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Tgl Keluar
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
                          {item.quality === "baik" ? (
                            <span className=" rounded-md bg-[#96CDF4] px-4 py-px text-xs font-semibold uppercase text-gray-900 antialiased">
                              Baik
                            </span>
                          ) : (
                            ""
                          )}
                          {item.quality === "kurang baik" ? (
                            <span className="float-right rounded-md bg-[#FEBF00] px-4 py-px text-xs font-semibold uppercase text-gray-900 antialiased">
                              Kurang Baik
                            </span>
                          ) : (
                            ""
                          )}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">{item.amount}</td>

                        <td className="whitespace-nowrap px-6 py-4">
                          {" "}
                          {item.status === null ? (
                            <span
                              // onClick={() => handleUpdateProses(item._id)}
                              className="bg-[#b5f1b5] pr-2 pl-2 rounded-lg"
                            >
                              Confirm
                            </span>
                          ) : (
                            ""
                          )}
                          {item?.status?.status === "processing" ? (
                            <button
                              onClick={() => handleShowCheck(item.status._id)}
                              className="bg-[#96CDF4] hover:bg-[#a4d1f1] pr-2 pl-2 rounded-lg"
                            >
                              CheckIn
                            </button>
                          ) : (
                            ""
                          )}
                          {item?.status?.status === "checking" ? (
                            <span className="bg-[#FEBF00] pr-2 pl-2 rounded-lg">Transit</span>
                          ) : (
                            ""
                          )}
                          {item?.status?.status === "transit" ? (
                            <span className="bg-[#5eebc7]  pr-2 pl-2 rounded-lg">Accepted</span>
                          ) : (
                            ""
                          )}
                          {item?.status?.status === "accepted" ? (
                            <span className="bg-[#65a0f8]  pr-2 pl-2 rounded-lg">Wash</span>
                          ) : (
                            ""
                          )}
                          {item?.status?.status === "washing" ? (
                            <span className="bg-[#82f865]  pr-2 pl-2 rounded-lg">Dry</span>
                          ) : (
                            ""
                          )}
                          {item?.status?.status === "drying" ? (
                            <span className="bg-[#54e2f5]  pr-2 pl-2 rounded-lg">Done</span>
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
              </div>
            </div>
            <div className="relative">
              <img src={Ds} alt="" className="rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {showProses ? (
        <>
          <div className=" overflow-x-hidden m-4  scrollbars fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    CheckIn <input type="text" />
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-red-600  hover:text-red-400 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowProses(false)}
                  >
                    <span className=" text-red-500  hover:text-red-300  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}

                {status.map((item) => (
                  <div className="relative p-6 flex-auto" key={item._id}>
                    <form className="w-full" onSubmit={(e) => setShowProses1(item._id, e)}>
                      <div className="mb-2">
                        <input
                          type="text"
                          value={name}
                          // onChange={(e) => setStatus(e.target.value)}
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Checked by"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="E-mail"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          value={no_hp}
                          onChange={(e) => setNo_hp(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Phone number"
                        />
                      </div>
                      {/* <div className="mb-2">
                        <input
                          type="text"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Amount"
                        />
                      </div> */}
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
                      <div className="mb-2">
                        <input
                          type="file"
                          onChange={handleFileChange}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
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
