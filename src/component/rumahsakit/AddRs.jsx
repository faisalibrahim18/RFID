import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddRs = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [number_phone, setNumber_phone] = useState("");
  const [address, setAddress] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const saveHospital = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios
        .post(
          "http://localhost:9000/api/v1/rfid/hospital",
          {
            code: code,
            name: name,
            number_phone: number_phone,
            address: address,
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

      navigate("/rumah_sakit");
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        setMsg(error.response.data.msg);
      } else {
        Swal.fire({
          text: error.data.msg,
          icon: "error",
        });
      }
    }
  };
  return (
    <div className="p-7 ">
      {/* Title */}
      <div className="lg:flex lg:flex-wrap pt-20 pb-6">
        <div className="  text-3xl font-semibold  ">
          <h1>Add Rumah Sakit</h1>
        </div>

        <div className="flex w-full pt-1 content-center justify-between md:w-1/2 md:justify-end"></div>
      </div>

      <div className="container mx-auto w-96 bg-white rounded-md p-10 shadow-md">
        {Object.keys(msg).length > 0 && (
          <p className="alert alert-danger rounded text-center p-2 shadow m-3">{msg}</p>
        )}
        <form className="" onSubmit={saveHospital}>
          <div className="mb-2">
            <label className=" text-sm font-semibold text-gray-800">Kode Rumah Sakit</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Masukan Kode Rumah Sakit..."
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">Nama Rumah Sakit</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="masukan Nama Rumah Sakit..."
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">No Telepon</label>
            <input
              type="text"
              value={number_phone}
              onChange={(e) => setNumber_phone(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="masukan No Telepon..."
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">Alamat</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="masukan Alamat..."
            />
          </div>

          <div className="mt-6 flex ">
            <Link
              to={"/rumah_sakit"}
              className=" bg-transparent mr-2 w-1/2  border text-center py-2 px-2 pl-5 pr-5 border-black hover:border-transparent text-black hover:text-white rounded-md hover:bg-blue-950"
            >
              Back
            </Link>
            <button
              type="submit"
              className="color w-1/2 px-2 py-0 tracking-wide text-white transition-colors duration-200 transform bg-blue-950 rounded-md hover:bg-blue-900 focus:outline-none focus:bg-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRs;
