import React from "react";
import { Link } from "react-router-dom";

const AddDistribusi = () => {
  return (
    <div className="p-7 ">
      {/* Title */}
      <div className="lg:flex lg:flex-wrap pt-20 pb-6">
        <div className="  text-3xl font-semibold  ">
          <h1>Add Distribusi</h1>
        </div>

        <div className="flex w-full pt-1 content-center justify-between md:w-1/2 md:justify-end"></div>
      </div>

      <div className="container mx-auto  bg-white rounded-md p-10 shadow-md">
        <form className="">
          <div className="mb-2">
            <label for="Nama Customer" className=" text-sm font-semibold text-gray-800">
              Nama Customer
            </label>
            <select className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
              <option value="">Pilih Nama Customer</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="mb-2">
            <label for="Jenis Linen" className=" text-sm font-semibold text-gray-800">
              Jenis Linen
            </label>
            <select className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
              <option value="">Pilih Jenis Linen</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="mb-2">
            <label for="Kualitas" className=" text-sm font-semibold text-gray-800">
              Kualitas
            </label>
            <select className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
              <option value="">Pilih Kualitas</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="mb-2">
            <label for="Status" className=" text-sm font-semibold text-gray-800">
              Status
            </label>
            <select className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
              <option value="">Pilih Status</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="flex flex-wrap ">
            <div className="md:w-1/2  md:mb-2  w-full">
              <div className="mb-2">
                <label for="tgl_masuk" className="block text-sm font-semibold text-gray-800">
                  Tanggal Masuk
                </label>
                <input
                  type="date"
                  className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>
            <div className=" md:w-1/2  lg:pl-3 md:pl-3  w-full">
              {" "}
              <div className="mb-2">
                <label for="tgl_keluar" className="block text-sm font-semibold text-gray-800">
                  Tanggal Keluar
                </label>
                <input
                  type="date"
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap ">
            <div className="md:w-1/2  md:mb-2  w-full">
              <div className="mb-2">
                <label for="Linen" className="block text-sm font-semibold text-gray-800">
                  Linen
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Masukan Linen..."
                />
              </div>
            </div>
            <div className=" md:w-1/2  lg:pl-3 md:pl-3  w-full">
              {" "}
              <div className="mb-2">
                <label for="kualitas_linen" className="block text-sm font-semibold text-gray-800">
                  Kualitas Linen
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Masukan Kualitas..."
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap ">
            <div className="md:w-1/2  md:mb-2  w-full">
              <div className="mb-2">
                <label for="jumlah_Linen" className="block text-sm font-semibold text-gray-800">
                  Jumlah Linen
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Masukan Jumlah Linen..."
                />
              </div>
            </div>
            <div className=" md:w-1/2  lg:pl-3 md:pl-3  w-full">
              {" "}
              <div className="mb-2">
                <label for="kategori" className="block text-sm font-semibold text-gray-800">
                  Kategori
                </label>
                <select className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
                  <option value="">Pilih Kategori</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-6 flex ">
            <Link
              to={"/distribusi"}
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

export default AddDistribusi;
