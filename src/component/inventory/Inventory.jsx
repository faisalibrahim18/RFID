import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import Inventory1 from "../data/inventory/Inventory";
import axios from "axios";
import Loading from "../Spinners/Loading";
import SearchInventory from "../search/SearchInventory";
import Swal from "sweetalert2";

const Inventory = () => {
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  const [searchResults, setSearchResults] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [kode, setKode] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    getInventory();
  }, []);
  const getInventory = async () => {
    setLoading(true);
    const API_URL = import.meta.env.VITE_API_KEY;
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/api/v1/rfid/inventory`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data);
    setInventory(response.data.data);
    setSearchResults(response.data.data);
    setLoading(false);
  };

  // Get current posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = searchResults.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const saveInventory = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_KEY;
      const token = localStorage.getItem("token");
      const response = await axios
        .post(
          "${API_URL}/api/v1/rfid/inventory",
          {
            kode: kode,
            name: name,
            amount: amount,
            status: status,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            text: data.message,
          });
        });
      // console.log(response);
      window.location.reload();
      // navigate("/inventory");
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
            <h1 className="text-3xl font-semibold mt-3 mb-5">Inventory List</h1>
          </div>
          <div className="flex w-full mb-5 ml-5 md:ml-auto mr-4 font-semibold justify-between md:w-1/3 md:justify-end">
            <button
              type="button"
              className="bg-[#96CDF4]  m-1 pl-3 pr-3 rounded-md p-2 hover:bg-blue-200"
              onClick={() => setShowAdd(true)}
            >
              <i className="fa-solid fa-plus"></i> Add Inventory
            </button>
            {/* <Link
              to={"/inventory/add"}
              className="bg-[#96CDF4] mb-2 pl-3 pr-3 rounded-md p-2 hover:bg-blue-200"
            >
              <i className="fa-solid fa-plus"></i> Add Inventory
            </Link> */}
          </div>
        </div>

        <div className="flex flex-wrap flex-row">
          <div className="flex-shrink max-w-full px-4 w-full">
            <div className="p-6 bg-white  rounded-lg shadow-lg mb-6">
              <SearchInventory
                inventory={inventory}
                setSearchResults={setSearchResults}
              />
              {loading ? (
                <Loading />
              ) : (
                <div className="overflow-x-auto">
                  <Inventory1 searchResults={currentPost} />
                  <Pagination
                    postPerPage={postPerPage}
                    totalPosts={inventory.length}
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
            <div className="relative w-auto my-6 mx-auto max-w-xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Add Inventory</h3>
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
                  <form className="w-full" onSubmit={saveInventory}>
                    <div className="mb-4">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Nama Barang..."
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Jumlah..."
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="block w-full px-2 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      >
                        <option>Pilih Status :</option>

                        <option value="operasional">Operasional</option>
                        <option value="emergency">Emergency</option>
                      </select>
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

export default Inventory;
