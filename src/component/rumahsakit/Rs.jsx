import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import Rumah_Sakit from "../data/rs/rumah_sakit";
import Loading from "../Spinners/Loading";
import SearchRS from "../search/SearchRS";
import Swal from "sweetalert2";

const Rs = () => {
  const [showAdd, setShowAdd] = React.useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [number_phone, setNumber_phone] = useState("");
  const [address, setAddress] = useState("");
  const [msg, setMsg] = useState("");

  const [rumah_sakit, setRs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchRs, setSearchRs] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  useEffect(() => {
    getRs();
  }, []);
  const getRs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:9000/api/v1/rfid/hospital", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data.data);
      setSearchRs(response.data.data);
      setRs(response.data.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  // Get current posts
  const indexOfLastUsers = currentPage * postPerPage;
  const indexOfFistPost = indexOfLastUsers - postPerPage;
  const currentPost = searchRs.slice(indexOfFistPost, indexOfLastUsers);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const saveHospital = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios
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
      // console.log(response);
      window.location.reload();
    } catch (error) {
      if (error.response) {
        // console.log(error.response.data.msg);
        // setMsg(error.response.data.msg);
        Swal.fire({
          text: error.response.data.msg,
          icon: "error",
        });
      } else {
        // console.log(error.response.data.msg);
        Swal.fire({
          text: error.data.msg,
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
            <h1 className="text-3xl font-semibold mt-3 mb-5">Rumah Sakit List</h1>
          </div>
          <div className="flex w-full mb-5 ml-5 md:ml-auto mr-4 font-semibold justify-between md:w-1/3 md:justify-end">
            <button
              onClick={() => setShowAdd(true)}
              className="bg-[#96CDF4] pl-3 pr-3 mb-2 rounded-md p-2 hover:bg-blue-200"
            >
              <i className="fa-solid fa-plus"></i> Add Rumah Sakit
            </button>
          </div>
        </div>

        <div className="flex flex-wrap flex-row">
          <div className="flex-shrink max-w-full px-4 w-full">
            <div className="p-6 bg-white  rounded-lg shadow-lg mb-6">
              <SearchRS rumah_sakit={rumah_sakit} setSearchRs={setSearchRs} />
              {loading ? (
                <Loading />
              ) : (
                <div className="overflow-x-auto">
                  <Rumah_Sakit searchRs={currentPost} />
                  <Pagination
                    postPerPage={postPerPage}
                    totalPosts={rumah_sakit.length}
                    paginateBack={paginateBack}
                    paginate={paginate}
                    paginateFront={paginateFront}
                    currentPage={currentPage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showAdd ? (
        <>
          <div className=" overflow-x-hidden m-4  scrollbars fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-2xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Add Rumah Sakit</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-red-600  hover:text-red-400 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowAdd(false)}
                  >
                    <span className=" text-red-500  hover:text-red-300  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}

                <div className="relative p-6 flex-auto">
                  {Object.keys(msg).length > 0 && (
                    <p className="alert alert-danger rounded text-center p-2 shadow m-3">{msg}</p>
                  )}
                  <form className="w-full" onSubmit={saveHospital}>
                    <div className="mb-4">
                      <label className=" text-sm font-semibold text-gray-800">Kode Rumah Sakit</label>
                      <input
                        required
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Masukan Kode Rumah Sakit..."
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-800">Nama Rumah Sakit</label>
                      <input
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="masukan Nama Rumah Sakit..."
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-800">No Telepon</label>
                      <input
                        required
                        type="text"
                        value={number_phone}
                        onChange={(e) => setNumber_phone(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="masukan No Telepon..."
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-800">Alamat</label>
                      <textarea
                        required
                        type="text"
                        rows={6}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="masukan Alamat..."
                      />
                    </div>

                    {/*footer*/}
                    <div className="flex justify-center pt-10">
                      <button
                        className="bg-[#A4BC92] text-white active:bg-[#C7E9B0] font-semibold text-sm px-5 py-2 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Save
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

export default Rs;
