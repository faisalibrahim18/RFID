import React, { useEffect, useState } from "react";
import Ds from "../../../assets/ds.png";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Spinners/Loading";
import Pagination from "../../pagination/Pagination";
import Laporan1 from "../../data/pabrik/Laporan";

const Laporan = () => {
  const [file, setFile] = useState("");

  const [distribusi, setDistribusi] = useState([]);
  const [show, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  const [openTab, setOpenTab] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    getDistribusi();
  }, []);
  const getDistribusi = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:9000/api/v1/rfid/distribusi");
    // console.log(response.data.data);
    setDistribusi(response.data.data);
    setLoading(false);
  };
  const deleteDistribusi = async (distribusiId) => {
    const isConfirm = await Swal.fire({
      title: "Are youtd_clas sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }
    const token = localStorage.getItem("token");
    const response = await axios
      .delete(`http://localhost:9000/api/v1/rfid/distribusi/${distribusiId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        getDistribusi();
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };

  //Upload
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  //Upload
  const uploadData = async (e) => {
    e.preventDefault();

    try {
      if (file) {
        console.log("file", file);
      }

      const formData = new FormData();
      formData.append("excel", file);

      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios
        .post("http://localhost:9000/api/v1/rfid/distribusi/upload", formData, config)
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            text: data.message,
          });
        });

      navigate("/laporanP");
      window.location.reload();
    } catch (error) {
      if (error.response) {
        Swal.fire({
          text: error.response.data.msg,
          icon: "error",
        });
        // console.log(error.response);
        setMsg(error.response.data.msg);
      } else {
        // console.log(error.response);
        Swal.fire({
          text: error.data.msg,
          icon: "error",
        });
      }
    }
  };

  // Get current posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = distribusi.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // export excel
  const donwloadTemplate = async () => {
    try {
      window.open("http://localhost:9000/api/v1/rfid/distribusiDownloadTemplate");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" p-2">
      <div className="flex flex-wrap flex-row">
        <div className="flex-shrink max-w-full px-4 w-1/2">
          <h1 className="text-3xl font-semibold mt-3 mb-5">Laporan</h1>
        </div>
        <div className="flex w-full mb-7 ml-5 md:ml-auto mr-4  font-semibold justify-between md:w-1/3 md:justify-end">
          <button
            type="button"
            className="bg-[#FEBF00]  m-1 pl-3 pr-3 rounded-md p-2 hover:bg-yellow-400"
            onClick={() => setShowModal(true)}
          >
            <i className="fa-solid fa-upload"></i> Upload
          </button>
        </div>
      </div>

      <div className="flex flex-wrap flex-row px-4 ">
        <div className="flex-shrink max-w-full w-full rounded-md bg-white shadow-lg">
          <div className="p-6  rounded-lg ">
            {loading ? (
              <Loading />
            ) : (
              <div className="overflow-x-auto">
                <Laporan1 distribusi={currentPost} />
                <Pagination
                  postPerPage={postPerPage}
                  totalPosts={distribusi.length}
                  paginateBack={paginateBack}
                  paginate={paginate}
                  paginateFront={paginateFront}
                  currentPage={currentPage}
                />
              </div>
            )}
          </div>
          <div className="relative">
            <img src={Ds} alt="" className="rounded-lg" />
          </div>
        </div>
      </div>
      {show ? (
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
                  <div className="container mx-auto">
                    <div className="flex flex-col max-w-xl">
                      <ul className="flex ">
                        <li>
                          <a
                            href="#"
                            onClick={() => setOpenTab(1)}
                            className={` ${
                              openTab === 1 ? "border-b-4 border-green-200 text-black" : ""
                            } inline-block px-4 py-2 text-gray-600 hover:border-b-4 border-green-200 `}
                          >
                            Upload File Excel
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={() => setOpenTab(2)}
                            className={` ${
                              openTab === 2 ? "border-b-4 border-green-200" : ""
                            } inline-block px-4 py-2 text-gray-600 hover:border-b-4 border-green-200`}
                          >
                            Download Template Excel
                          </a>
                        </li>
                      </ul>
                      <div className="pt-4">
                        <div className={openTab === 1 ? "block" : "hidden"}>
                          <form className="w-full" onSubmit={uploadData}>
                            <div className="mb-2">
                              <label htmlFor="file" className="font-semibold text-gray-500">
                                Upload File
                              </label>
                              <input
                                type="file"
                                onChange={(e) => handleFileChange(e)}
                                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                              />
                            </div>

                            {/*footer*/}
                            <div className="flex justify-center md:pl-28 pt-10">
                              <button
                                className="bg-[#A4BC92] text-white active:bg-[#C7E9B0] font-semibold text-sm px-5 py-2 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                                type="submit"
                              >
                                Upload
                              </button>
                            </div>
                          </form>
                        </div>
                        <div className={openTab === 2 ? "block" : "hidden"}>
                          <button
                            onClick={donwloadTemplate}
                            type="button"
                            className="bg-[#1cc939] text-white  m-1 pl-3 pr-3 rounded-md p-2 hover:bg-[#40d859]"
                          >
                            <i className="fa-solid fa-file-excel"></i> Cetak Excel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default Laporan;
