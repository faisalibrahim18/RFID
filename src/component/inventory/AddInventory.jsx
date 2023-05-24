import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddInventory = () => {
  const [kode, setKode] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMsg] = useState("");

  const navigate = useNavigate();

  const saveInventory = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios
        .post(
          "http://localhost:9000/api/v1/rfid/inventory",
          {
            kode: kode,
            name: name,
            amount: amount,
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

      navigate("/inventory");
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
          <h1>Add Inventory</h1>
        </div>

        <div className="flex w-full pt-1 content-center justify-between md:w-1/2 md:justify-end"></div>
      </div>

      <div className="container mx-auto w-96 bg-white rounded-md p-10 shadow-md">
        {Object.keys(message).length > 0 && (
          <p className="alert alert-danger rounded text-center p-2 shadow m-3">{message}</p>
        )}
        <form className="" onSubmit={saveInventory}>
          <div className="mb-2">
            <label for="Kode Barang" className=" text-sm font-semibold text-gray-800">
              Kode Barang
            </label>
            <input
              type="text"
              value={kode}
              onChange={(e) => setKode(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Masukan Kode Barang..."
            />
          </div>
          <div className="mb-2">
            <label for="Nama Barang" className=" text-sm font-semibold text-gray-800">
              Nama Barang
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Masukan Nama Barang..."
            />
          </div>
          <div className="mb-2">
            <label for="Jumlah" className=" text-sm font-semibold text-gray-800">
              Jumlah
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Masukan Jumlah..."
            />
          </div>

          <div className="mt-6 flex ">
            <Link
              to={"/inventory"}
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

export default AddInventory;
