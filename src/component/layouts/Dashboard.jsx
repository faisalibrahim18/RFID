import React, { useEffect, useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import Ds from "../../assets/ds.png";
import Bro from "../../assets/bro1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Doughnut from "../data/chart/DoughnutComponent";
import BarComponent from "../data/chart/BarComponent";
import { FaHospitalAlt, FaRegListAlt } from "react-icons/fa";

const Dashboard = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [name_customer, setNameCustomer] = useState("");
  const [quality, setQuality] = useState("");
  const [service, setService] = useState("");

  const [weight, setWeight] = useState("");
  const [note, setNote] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [custumer, setCustumer] = useState([]);
  const [dataHospital, setdataHospital] = useState([]);
  const [datauser, setdataUser] = useState([]);
  const [dataDistribusi, setdataDistribusi] = useState([]);
  const [privilege, setPrivilege] = useState({
    Dashboard: true,
  });
  useEffect(() => {
    const fetchData = async () => {
      const API_URL = import.meta.env.VITE_API_KEY;
      const res = await axios.get(`${API_URL}/api/v1/rfid/distribusi`);
      setChartData(res.data.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getDataHospital = async () => {
      const API_URL = import.meta.env.VITE_API_KEY;
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/v1/rfid/hospitalCount`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data.data);
      setdataHospital(response.data.data);
    };
    getDataHospital();
  }, []);
  useEffect(() => {
    const getDataUser = async () => {
      const API_URL = import.meta.env.VITE_API_KEY;
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/v1/rfid/userCount`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data.data);
      setdataUser(response.data.data);
    };
    getDataUser();
  }, []);

  useEffect(() => {
    getDataDistribusi();
  }, []);

  const getDataDistribusi = async () => {
    const API_URL = import.meta.env.VITE_API_KEY;
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/api/v1/rfid/distribusiCount`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data.data);
    setdataDistribusi(response.data.data);
  };
  useEffect(() => {
    getCustumer();
  }, []);

  const getCustumer = async () => {
    const API_URL = import.meta.env.VITE_API_KEY;
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/api/v1/rfid/hospital`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

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
        // console.log("file", file);
        // console.log("customer", name_customer);
        // // console.log("category", category);
        // console.log("quality", quality);
        // console.log("service", service);
        // // console.log("dateIn", dateIn);
        // // console.log("dateOut", dateOut);
        // console.log("weight", weight);
        // console.log("note", note);
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("customer", name_customer);
      formData.append("quality", quality);
      formData.append("service", service);
      // formData.append("dateIn", dateIn);
      // formData.append("dateOut", dateOut);
      formData.append("weight", weight);
      formData.append("note", note);

      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const API_URL = import.meta.env.VITE_API_KEY;
      const response = await axios
        .post(`${API_URL}/api/v1/rfid/distribusi`, formData, config)
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            text: data.message,
          });
        });
      // console.log(response);
      navigate("/distribusi");
    } catch (error) {
      // console.log(error);
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
    try {
      const API_URL = import.meta.env.VITE_API_KEY;
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API_URL}/api/v1/rfid/getUserSignedIn`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const rolePrivileges = response.data.data.role.rolePrivileges;

      // console.log("rolePrivileges:", rolePrivileges);

      const allowValues = rolePrivileges.map((privilege) => privilege.allow);

      // console.log("allowValues:", allowValues);

      // Memperbarui state privilege dengan hasil allowValues
      setPrivilege((prevPrivilege) => ({
        ...prevPrivilege,
        Dashboard: allowValues[0],
      }));

      // Mengecek izin akses dan mengambil tindakan yang sesuai
      if (
        allowValues.every((allow, index) => {
          const privilegeName = Object.keys(privilege)[index];
          if (allow) {
            // console.log(`Pengguna diizinkan untuk ${privilegeName}`);
            // Tindakan yang diambil jika izin adalah true
            return true;
          } else {
            // console.log(`Pengguna tidak diizinkan untuk ${privilegeName}`);
            // Tindakan yang diambil jika izin adalah false
            return false;
          }
        })
      ) {
        // console.log("Semua izin diizinkan");
        // Tindakan yang diambil jika semua izin bernilai true
      } else {
        // console.log("Tidak semua izin diizinkan");
        // Tindakan yang diambil jika ada izin yang bernilai false
      }

      // console.log("response data:", response.data.data);
      setUsers([response.data.data]);
    } catch (error) {
      console.log("Error:", error.response); // Memperbaiki penanganan kesalahan
    }
  };
  const changeChart = async () => {
    const API_URL = import.meta.env.VITE_API_KEY;
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/api/v1/rfid/distribusi`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data);
  };

  const [selectedHospital, setSelectedHospital] = useState("");
  const [hospitalOptions, setHospitalOptions] = useState([]);

  useEffect(() => {
    fetchHospitalOptions(selectedHospital);
    // fetchDistribusiOptions();
  }, [selectedHospital]);

  const fetchHospitalOptions = async (selectedHospital) => {
    try {
      const API_URL = import.meta.env.VITE_API_KEY;
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/v1/rfid/hospital`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          hospital: selectedHospital,
        },
      });

      const data = response.data.data;
      // console.log(response.data.data);

      if (data && data.length > 0) {
        setHospitalOptions(data);
      } else {
        setHospitalOptions([]);
        console.log("No Data Available");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [selectedStatus, setSelectedStatus] = useState("");
  const [distribusiOptions, setDistribusiOptions] = useState([]);

  const fetchDistribusiOptions = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_KEY;
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/v1/rfid/distribusi`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.data; // Modify this based on the API response structure

      if (data && data.length > 0) {
        const options = data.map((item) => ({
          id: item._id,
          name: item.customer.name,
          ...item,
        }));
        setDistribusiOptions(options);
      } else {
        setDistribusiOptions([]);
        // console.log("No Data Available");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleStatusChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedStatus(selectedValue);
  };
  useEffect(() => {
    fetchDistribusiOptions();
  }, []);

  const handleHospitalChange = (event) => {
    const selectedHospital = event.target.value;
    setSelectedHospital(selectedHospital);
    fetchHospitalOptions(selectedHospital);
  };
  return (
    <>
      <div className="md:p-5 p-2 font-semibold static ">
        <div className="flex flex-wrap flex-row  slide-in-bottom">
          <div className="flex-shrink max-w-full w-full  bg-white rounded-lg shadow-lg mb-6">
            <div className="pl-6 pt-6">
              <div className="flex flex-wrap flex-row">
                <div className="flex-shrink max-w-full w-full">
                  <div className="flex flex-row justify-between pb-2">
                    <div className="flex flex-col">
                      <h3 className="text-xl font-bold">BAKTI KASIH ANUGRAH</h3>
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

                {privilege.Dashboard ? (
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

        {privilege.Dashboard ? (
          <div className="flex flex-wrap flex-row  ">
            <div className="max-w-full px-4 lg:w-auto mb-6 w-full fade-in pl-6">
              <div className="bg-white border-b-4 mb-5 border-[#2DC8A8] rounded-lg shadow-xl p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink text-left md:text-center pr-12">
                    <h1 className="font-semibold text-[#7E92A2] ">Users</h1>
                    <p className="font-semibold text-6xl pl-5">{datauser}</p>
                  </div>
                  <div className="pl-9">
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
                      <FaRegListAlt />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white border-b-4 mb-5 border-[#F64141] rounded-lg shadow-xl p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink text-left md:text-center pr-12">
                    <h1 className="font-semibold text-[#7E92A2] ">Hospital</h1>
                    <p className="font-semibold text-6xl">{dataHospital}</p>
                  </div>
                  <div className="pl-6">
                    <div className="rounded-full bg-gradient-to-b from-[#F64141] to-white items-center text-2xl p-5 text-[#F64141] w-16 h-16 ">
                      <FaHospitalAlt />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-shrink  px-4 w-80 mb-6 ">
              <form>
                <div className="mb-2">
                  {distribusiOptions.length > 0 ? (
                    <select
                      className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      value={selectedStatus}
                      onChange={handleStatusChange}
                    >
                      <option value="">All Hospitals</option>
                      {distribusiOptions.map((distribusi, index) => (
                        <option
                          value={distribusi.id}
                          key={`${distribusi.id}-${index}`}
                        >
                          {distribusi.name}{" "}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </form>
              <div className="bg-white rounded-lg shadow-lg h-auto p-6">
                <div className="flex flex-row justify-between pb-3">
                  <div className="flex flex-col">
                    <h3 className="text-base ">
                      {/* <b>Info today</b> : 22 June 2023 */}
                    </h3>
                  </div>
                  <div className="relative">Status Data</div>
                </div>
                <div className="relative pt-5 ">
                  <Doughnut selectedHospital={selectedStatus} />
                </div>
              </div>
            </div>
            <div className="flex-shrink w-1/1 px-4  mb-6">
              <form className="w-full" onSubmit={changeChart}>
                <div className="mb-2">
                  <select
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={selectedHospital}
                    onChange={handleHospitalChange}
                  >
                    <option value="">All Hospitals</option>

                    {hospitalOptions.map((hospital) => (
                      <option value={hospital.name} key={hospital.id}>
                        {hospital.name}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
              <div className="bg-white rounded-lg shadow-lg h-auto p-6">
                <div className="flex flex-row justify-between pb-3">
                  <div className="flex flex-col">
                    <h3 className="text-base ">
                      {/* <b>Info today</b> : 22 June 2023 */}
                    </h3>
                  </div>
                  <div className="relative">Rumah Sakit Data</div>
                </div>
                <div className="relative pt-5 ">
                  <BarComponent selectedHospital={selectedHospital} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
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
                  <form className="w-full" onSubmit={saveDistribusi}>
                    <div className="mb-2">
                      <select
                        className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={name_customer}
                        onChange={(e) => setNameCustomer(e.target.value)}
                      >
                        <option selected>Pilih Hospital : </option>

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
                        <option value="Cuci">Cuci</option>
                      </select>
                    </div>

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
    </>
  );
};

export default Dashboard;
