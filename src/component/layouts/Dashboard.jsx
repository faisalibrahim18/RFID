import React, { useEffect, useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import Ds from "../../assets/ds.png";
import Bro from "../../assets/bro1.png";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip } from "recharts";
import axios from "axios";
import Swal from "sweetalert2";
import Chart from "./Chart";

const Dashboard = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [name_customer, setNameCustomer] = useState("");
  const [category, setCategory] = useState("");
  const [quality, setQuality] = useState("");
  const [service, setService] = useState("");
  const [linenn, setLinen] = useState("");
  const [dateIn, setDateIn] = useState("");
  const [dateOut, setDateOut] = useState("");
  const [amount, setAmount] = useState("");
  const [weight, setWeight] = useState("");
  const [note, setNote] = useState("");
  const [msg, setMsg] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [custumer, setCustumer] = useState([]);
  const [dataKategori, setdataKategori] = useState([]);
  const [dataLinen, setdataLinen] = useState([]);
  const [dataHospital, setdataHospital] = useState([]);
  const [datauser, setdataUser] = useState([]);
  const [dataDistribusi, setdataDistribusi] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:9000/api/v1/rfid/distribusi"
      );
      setChartData(res.data.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getDataHospital = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:9000/api/v1/rfid/hospitalCount",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data.data);
      setdataHospital(response.data.data);
    };
    getDataHospital();
  }, []);
  useEffect(() => {
    const getDataUser = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:9000/api/v1/rfid/userCount",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data.data);
      setdataUser(response.data.data);
    };
    getDataUser();
  }, []);

  useEffect(() => {
    getDataDistribusi();
  }, []);

  const getDataDistribusi = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:9000/api/v1/rfid/distribusiCount",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response.data.data);
    setdataDistribusi(response.data.data);
  };
  useEffect(() => {
    getLinen();
  }, []);

  const getLinen = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:9000/api/v1/rfid/linen",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response.data.data);
    setdataLinen(response.data.data);
  };
  useEffect(() => {
    getKategori();
  }, []);

  const getKategori = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:9000/api/v1/rfid/category",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response.data.data);
    setdataKategori(response.data.data);
  };

  useEffect(() => {
    getCustumer();
  }, []);

  const getCustumer = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:9000/api/v1/rfid/hospital",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log(response.data.data);
    setCustumer(response.data.data);
  };
  //Upload
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const saveDistribusi = async (e) => {
    e.preventDefault();
    try {
      if (file) {
        console.log("file", file);
        console.log("customer", name_customer);
        // console.log("category", category);
        console.log("quality", quality);
        console.log("service", service);
        console.log("dateIn", dateIn);
        console.log("dateOut", dateOut);
        console.log("weight", weight);
        console.log("note", note);
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("customer", name_customer);
      formData.append("quality", quality);
      formData.append("service", service);
      formData.append("dateIn", dateIn);
      formData.append("dateOut", dateOut);
      formData.append("weight", weight);
      formData.append("note", note);

      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios
        .post("http://localhost:9000/api/v1/rfid/distribusi", formData, config)
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            text: data.message,
          });
        });
      console.log(response);
      navigate("/distribusi");
    } catch (error) {
      console.log(error);
      Swal.fire({
        text: error.response.data.msg,
        icon: "error",
      });
      if (error.response) {
        Swal.fire({
          text: error.response.data.msg,
          icon: "error",
        });
        // console.log(error.response.data.msg);
        // setMsg(error.response.data.msg);
      } else {
        // console.log(error.data);
        Swal.fire({
          text: error.data.response.msg,
          icon: "error",
        });
      }
    }
  };
  useEffect(() => {
    const lokasi = custumer.filter((item) => item._id === name_customer);
    setAddress(lokasi[0]?.address);
  }, [name_customer]);

  // console.log(chartData);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:9000/api/v1/rfid/getUserSignedIn",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response.data.data);
    setUsers([response.data.data]);
  };
  return (
    <>
      {users.map((item) => (
        <div className="md:p-5 p-2 font-semibold static ">
          <div className="flex flex-wrap flex-row  slide-in-bottom">
            <div className="flex-shrink max-w-full w-full  bg-white rounded-lg shadow-lg mb-6">
              <div className="pl-6 pt-6">
                <div className="flex flex-wrap flex-row">
                  <div className="flex-shrink max-w-full w-full">
                    <div className="flex flex-row justify-between pb-2">
                      <div className="flex flex-col">
                        <h3 className="text-xl font-bold">
                          BAKTI KASIH ANUGRAH
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink max-w-full w-full xl:w-1/2">
                    <div className="static overflow-x-auto">
                      <p className="w-full pr-5">
                        Kami menyediakan kebutuhan linen untuk Rumah Sakit, kami
                        melayani dengan sistim cuci sewa linen bersih siap pakai
                        dan atau mencuci linen milik RS.
                      </p>
                    </div>
                  </div>
                  {item.role.name === "Superadmin" ? (
                    <div className="flex-shrink max-w-full w-full lg:w-1/2 md:pt-0 pt-10">
                      <button
                        type="button"
                        className="bg-[#A4BC92] p-3 rounded-lg pl-5 pr-3 text-white hover:bg-[#849e6f]"
                        onClick={() => setShowModal(true)}
                      >
                        {" "}
                        <b className="pr-4 text-xl font-semibold">
                          Schedule a pickup
                        </b>
                        <i className=" fa-solid fa-chevron-down fa-rotate-270 fa-xl"></i>
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="relative">
                <img
                  src={Bro}
                  className="md:absolute static w-52 md:right-10 md:pt-0 md:pl-0 pt-14 md:ml-0 ml-36"
                />
                <img src={Ds} alt="" className="rounded-lg" />
              </div>
            </div>
          </div>
          {item.role.name === "Superadmin" ? (
            <div className="flex flex-wrap flex-row  ">
              <div className="max-w-full px-4 lg:w-auto mb-6 w-full fade-in pl-6">
                <div className="bg-white border-b-4 mb-5 border-[#2DC8A8] rounded-lg shadow-xl p-5">
                  <div className="flex flex-row items-center">
                    <div className="flex-shrink text-left md:text-center pr-12">
                      <h1 className="font-semibold text-[#7E92A2] ">Users</h1>
                      <p className="font-semibold text-6xl">{datauser}</p>
                    </div>
                    <div className="pl-3">
                      <div className="rounded-full bg-gradient-to-b from-[#2DC8A8] to-white items-center text-2xl p-5 text-[#2DC8A8] w-16 h-16 ">
                        <BsPeopleFill />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border-b-4 mb-5 border-[#FEBF00] rounded-lg shadow-xl p-5">
                  <div className="flex flex-row items-center">
                    <div className="flex-shrink text-left md:text-center pr-12">
                      <h1 className="font-semibold text-[#7E92A2] ">
                        Distribution
                      </h1>
                      <p className="font-semibold text-6xl">{dataDistribusi}</p>
                    </div>
                    <div className="pr-5">
                      <div className="rounded-full bg-gradient-to-b from-[#FEBF00] to-white items-center text-2xl p-5 text-[#FEBF00] w-16 h-16 ">
                        <BsPeopleFill />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border-b-4 mb-5 border-[#F64141] rounded-lg shadow-xl p-5">
                  <div className="flex flex-row items-center">
                    <div className="flex-shrink text-left md:text-center pr-12">
                      <h1 className="font-semibold text-[#7E92A2] ">
                        Hospital
                      </h1>
                      <p className="font-semibold text-6xl">{dataHospital}</p>
                    </div>
                    <div className="pl-6">
                      <div className="rounded-full bg-gradient-to-b from-[#F64141] to-white items-center text-2xl p-5 text-[#F64141] w-16 h-16 ">
                        <BsPeopleFill />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-shrink max-w-full px-4 w-full lg:w-auto mb-6">
                <div className="bg-white rounded-lg shadow-lg h-auto p-6">
                  <div className="flex flex-row justify-between pb-3">
                    <div className="flex flex-col">
                      <h3 className="text-base ">
                        {/* <b>Info today</b> : 22 June 2023 */}
                      </h3>
                    </div>
                    <div className="relative">Incoming Data</div>
                  </div>
                  <hr />
                  <div className="relative pt-5">
                    <Chart chartData={chartData} />
                    {/* <BarChart width={680} position={"relative"} height={350} data={data} margin={{}} barSize={40}>
                  <XAxis dataKey="name" scale="point" padding={{ left: 30, right: 10 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey="pv" fill="#A4BC92" background={{ fill: "#E5F5E5" }} />
                </BarChart> */}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* Modal */}
          {showModal ? (
            <>
              <div className=" overflow-x-hidden m-4  scrollbars fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-2xl font-semibold">
                        Hospital Information
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-red-600  hover:text-red-400 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className=" text-red-500  hover:text-red-300  h-6 w-6 text-2xl block outline-none focus:outline-none">
                          x
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      {Object.keys(msg).length > 0 && (
                        <div className="font-semibold">
                          <p className="bg-red-200 uppercase opacity-75 font-sans  text-red-500 rounded text-center p-2 m-3">
                            {msg}
                          </p>
                        </div>
                      )}
                      <form className="w-full" onSubmit={saveDistribusi}>
                        <div className="mb-2">
                          <select
                            className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={name_customer}
                            onChange={(e) => setNameCustomer(e.target.value)}
                          >
                            <option selected>Pilih Hospital : </option>
                            {/* <option selected disabled>
                                  Select a Grup:
                                </option> */}

                            {custumer.map((d, i) => (
                              <option value={d._id}>
                                {d.code} - {d.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex flex-wrap">
                          <div className="w-full">
                            <div className="mb-2">
                              <input
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                placeholder="Address"
                                value={address}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mb-2">
                          <select
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            className="block w-full px-2 py-2 mt-2  bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          >
                            <option value="" className="text-gray-200">
                              Service
                            </option>
                            <option value="Dropstock">Dropstock</option>
                            <option value="Peminjaman">Peminjaman</option>
                            <option value="Penambahan">Penambahan</option>
                            <option value="Pengurangan Stock">
                              Pengurangan Stock
                            </option>
                            <option value="Return">Return</option>
                            <option value="Rewash">Rewash</option>
                          </select>
                        </div>
                        {/* <div className="flex flex-wrap">
                          <div className="md:w-1/2   w-full">
                            <div className="mb-2">
                              <label className="block text-sm font-semibold text-gray-800">
                                Pick -up date
                              </label>
                              <input
                                type="date"
                                value={dateIn}
                                onChange={(e) => setDateIn(e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                              />
                            </div>
                          </div>
                          <div className=" md:w-1/2 lg:pl-3 md:pl-3  w-full">
                            {" "}
                            <div className="mb-2">
                              <label className="block text-sm font-semibold text-gray-800">
                                Delivery date
                              </label>
                              <input
                                type="date"
                                value={dateOut}
                                onChange={(e) => setDateOut(e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                              />
                            </div>
                          </div>
                        </div> */}

                        <div className="flex  ">
                          <h3 className="text-2xl font-semibold">
                            Linen Information
                          </h3>
                        </div>
                        <div className="flex flex-wrap">
                          <div className=" w-full">
                            {" "}
                            <div className="mb-2">
                              <select
                                value={quality}
                                onChange={(e) => setQuality(e.target.value)}
                                className="block w-full px-2 py-2 mt-2  bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                              >
                                <option value="" className="text-gray-200">
                                  Quality
                                </option>
                                <option value="baik">Baik</option>
                                <option value="kurang baik">Kurang Baik</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="mb-2">
                          <label className="block text-sm font-semibold text-gray-800">
                            Upload Linen
                          </label>
                          <input
                            type="file"
                            onChange={handleFileChange}
                            className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          />
                        </div>

                        <div className="mb-3">
                          <div className="flex ">
                            <input
                            
                              type="text"
                              value={weight}
                              onChange={(e) => setWeight(e.target.value)}
                              className="rounded-l-lg block w-full px-4 py-2 mt-2 text-black bg-white border  focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                              placeholder="weight"
                            />
                            <span className="inline-flex items-center px-4 py-2 mt-2 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                              Kg
                            </span>
                          </div>
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
                            Save
                            <i className=" fa-solid fa-chevron-down fa-rotate-270 fa-xl ml-5"></i>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
      ))}
    </>
  );
};

export default Dashboard;
