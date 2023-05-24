import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditDistribusi = () => {
  const [name_customer, setNameCustomer] = useState("");
  const [category, setCategory] = useState("");
  const [linenn, setLinen] = useState("");
  const [quality, setQuality] = useState("");
  const [service, setService] = useState("");
  const [dateIn, setDateIn] = useState("");
  const [dateOut, setDateOut] = useState("");
  const [amount, setAmount] = useState("");
  const [weight, setWeight] = useState("");
  const [note, setNote] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [custumer, setCustumer] = useState([]);
  const [dataKategori, setdataKategori] = useState([]);
  const [dataLinen, setdataLinen] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getLinen();
  }, []);

  const getLinen = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:9000/api/v1/rfid/linen", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data.data);
    setdataLinen(response.data.data);
  };

  useEffect(() => {
    getKategori();
  }, []);

  const getKategori = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:9000/api/v1/rfid/category", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data.data);
    setdataKategori(response.data.data);
  };

  useEffect(() => {
    getCustumer();
  }, []);

  const getCustumer = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:9000/api/v1/rfid/hospital", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(response.data.data);
    setCustumer(response.data.data);
  };
  useEffect(() => {
    const getDistribusiById = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:9000/api/v1/rfid/distribusi/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response.data.data);

        setNameCustomer(response.data.data.customer);
        setCategory(response.data.data.category);
        setLinen(response.data.data.linen);
        setQuality(response.data.data.quality);
        setService(response.data.data.Service);
        setDateIn(response.data.data.dateIn);
        setDateOut(response.data.data.dateOut);
        setAmount(response.data.data.amount);
        setWeight(response.data.data.weight);
        setNote(response.data.data.note);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getDistribusiById();
  }, [id]);

  const updateDistribusi = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios
        .put(
          `http://localhost:9000/api/v1/rfid/distribusi/${id}`,
          {
            customer: name_customer,
            category: category,
            linen: linenn,
            quality: quality,
            service: service,
            dateIn: dateIn,
            dateOut: dateOut,
            amount: amount,
            weight: weight,
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
      navigate("/distribusi");
    } catch (error) {
      if (error.response) {
        // console.log(error.response);
        setMsg(error.response.data.msg);
      } else {
        Swal.fire({
          text: error.data.message,
          icon: "error",
        });
      }
    }
  };
  return (
    <div className="p-7 ">
      {/* Title */}
      <div className="lg:flex lg:flex-wrap pb-6">
        <div className="  text-3xl font-semibold  ">
          <h1>Edit Distribusi</h1>
        </div>

        <div className="flex w-full pt-1 content-center justify-between md:w-1/2 md:justify-end"></div>
      </div>

      <div className="container mx-auto  bg-white rounded-md p-10 shadow-md">
        {Object.keys(msg).length > 0 && (
          <p className="alert alert-danger rounded text-center p-2 shadow m-3">{msg}</p>
        )}
        <form className="w-full" onSubmit={updateDistribusi}>
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

          <div className="flex flex-wrap ">
            {/* <div className="  md:mb-2  w-full">
                          <div className="mb-2">
                            <input
                              type="text"
                              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                              placeholder="Hospital e-mail"
                            />
                          </div>
                        </div> */}
            {/* <div className=" md:w-1/2  lg:pl-3 md:pl-3  w-full">
                          {" "}
                          <div className="mb-2">
                            <input
                              type="text"
                              value={custumer.number_phone}
                              onChange={handlePhoneNumberChange}
                              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                              placeholder="Hospital phone number"
                            />
                          </div>
                        </div> */}
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
              <option value="cuci">Cuci</option>
              <option value="setrika">Setrika</option>
              <option value="cuci & setrika">Cuci & Setrika</option>
            </select>
          </div>

          <div className="flex flex-wrap">
            <div className="md:w-1/2   w-full">
              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-800">Pick -up date</label>
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
                <label className="block text-sm font-semibold text-gray-800">Delivery date</label>
                <input
                  type="date"
                  value={dateOut}
                  onChange={(e) => setDateOut(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>
          </div>

          <div className="flex  ">
            <h3 className="text-2xl font-semibold">Linen Information</h3>
          </div>
          <div className="flex flex-wrap">
            <div className="md:w-1/2   w-full">
              <div className="mb-2">
                <select
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option selected>Pilih Category: </option>

                  {dataKategori.map((d, i) => (
                    <option value={d._id}>
                      {d.kode} - {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className=" md:w-1/2 lg:pl-3 md:pl-3  w-full">
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
          <div className="flex flex-wrap">
            <div className="md:w-1/2   w-full">
              <div className="mb-2">
                <select
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={linenn}
                  onChange={(e) => setLinen(e.target.value)}
                >
                  <option selected>Pilih Linen: </option>

                  {dataLinen.map((d, i) => (
                    <option value={d._id}>{d.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="md:w-1/2   w-full">
              <div className="mb-2">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Amount"
                />
              </div>
            </div>
            <div className=" md:w-1/2 lg:pl-3 md:pl-3  w-full">
              {" "}
              <div className="mb-2">
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="weight"
                />
              </div>
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
  );
};

export default EditDistribusi;
