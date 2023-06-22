import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddKategori = () => {
  const [name, setName] = useState("");
  const [expired, setExpired] = useState("");
  const [unit, setUnit] = useState("");
  const [message, setMsg] = useState("");
  const navigate = useNavigate();
  const saveKategori = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios
        .post(
          "http://localhost:9000/api/v1/rfid/category",
          {
            name: name,
            expired: expired,
            unit: unit,
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

      navigate("/kategori");
    } catch (error) {
      if (error.response) {
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
          <h1>Add Kategori</h1>
        </div>

        <div className="flex w-full pt-1 content-center justify-between md:w-1/2 md:justify-end"></div>
      </div>

      <div className="container mx-auto w-96 bg-white rounded-md p-10 shadow-md">
        {Object.keys(message).length > 0 && (
          <p className="alert alert-danger rounded text-center p-2 shadow m-3">{message}</p>
        )}
        <form className="" onSubmit={saveKategori}>
          <div className="mb-2">
            <label for="Nama Kategori" className=" text-sm font-semibold text-gray-800">
              Nama Kategori
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Masukan Nama Kategori..."
            />
          </div>
          <div className="mb-2">
            <label for="Nama Kategori" className=" text-sm font-semibold text-gray-800">
              Expired
            </label>
            <input
              type="date"
              value={expired}
              onChange={(e) => setExpired(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label for="Nama Kategori" className=" text-sm font-semibold text-gray-800">
              Unit
            </label>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="Masukan Unit..."
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6 flex ">
            <Link
              to={"/kategori"}
              className=" bg-transparent mr-2 w-1/2  border text-center py-2 px-2 pl-5 pr-5 border-black hover:border-transparent text-black hover:text-white rounded-md hover:bg-blue-950"
            >
              Back
            </Link>
            <button className="color w-1/2 px-2 py-0 tracking-wide text-white transition-colors duration-200 transform bg-blue-950 rounded-md hover:bg-blue-900 focus:outline-none focus:bg-blue-500">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddKategori;
