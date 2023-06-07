import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Pagination from "../pagination/Pagination";
import Linen from "../data/linen/Linen";
import Loading from "../Spinners/Loading";

const Linen1 = () => {
  const [linen, setLinen] = useState([]);
  const [datacategory, setDataCategory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  useEffect(() => {
    getCategory();
  }, []);
  const getCategory = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get("http://localhost:9000/api/v1/rfid/category", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data);
    setDataCategory(response.data.data);
  };

  useEffect(() => {
    getlinen();
  }, []);
  const getlinen = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    const response = await axios.get("http://localhost:9000/api/v1/rfid/linen", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data);
    setLinen(response.data.data);
    setLoading(false);
  };

  // Get current posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = linen.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Upload
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  //Upload
  const uploadData = async (e) => {
    e.preventDefault();

    try {
      if (file) {
        // console.log("file", file);
        // console.log("category", category);
      }

      const formData = new FormData();
      formData.append("linens", file);
      formData.append("category", category);

      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios
        .post("http://localhost:9000/api/v1/rfid/importLinen", formData, config)
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            text: data.message,
          });
        });
      // console.log(response);
      navigate("/inventory");
    } catch (error) {
      if (error.response) {
        Swal.fire({
          text: error.response.data.message,
          icon: "error",
        });
        // console.log(error.response.data.message);
        // setMsg(error.response.data.msg);
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
            <h1 className="text-3xl font-semibold mt-3 mb-5">Linen List</h1>
          </div>
          <div className="flex w-full mb-5 ml-5 md:ml-auto mr-4 font-semibold justify-between md:w-1/3 md:justify-end">
            <button
              type="button"
              className="bg-[#FEBF00]  m-1 pl-3 pr-3 rounded-md p-2 hover:bg-yellow-400"
              onClick={() => setShowModal(true)}
            >
              <i className="fa-solid fa-upload"></i> Upload
            </button>
            {/* <Link to={"/linen/add"} className="bg-[#96CDF4] pl-3 pr-3 mb-2 rounded-md p-2 hover:bg-blue-200">
              <i className="fa-solid fa-plus"></i> Add Linen
            </Link> */}
          </div>
        </div>

        <div className="flex flex-wrap flex-row">
          <div className="flex-shrink max-w-full px-4 w-full">
            <div className="p-6 bg-white  rounded-lg shadow-lg mb-6">
              {loading ? (
                <Loading />
              ) : (
                <div className="overflow-x-auto">
                  <Linen linen={currentPost} />
                  <Pagination
                    postPerPage={postPerPage}
                    totalPosts={linen.length}
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
      {/* Modal */}
      {showModal ? (
        <>
          <div className=" overflow-x-hidden m-4  scrollbars fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Upload</h3>
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
                  <form className="w-full" onSubmit={uploadData}>
                    <div className="mb-5">
                      <label className=" text-sm font-semibold text-gray-800">Kategori</label>
                      <select
                        className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option selected>Pilih Kategori </option>

                        {datacategory.map((d, i) => (
                          <option value={d._id}>
                            {d.kode} - {d.name}
                          </option>
                        ))}
                      </select>
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
                        Upload
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

export default Linen1;
