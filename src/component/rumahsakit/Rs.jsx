import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Pagination from "../pagination/Pagination";
import Rumah_Sakit from "../data/rs/rumah_sakit";
import Loading from "../Spinners/Loading";

const Rs = () => {
  const [rumah_sakit, setRs] = useState([]);
  const [loading, setLoading] = useState(false);
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
      setRs(response.data.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  // Get current posts
  const indexOfLastUsers = currentPage * postPerPage;
  const indexOfFistPost = indexOfLastUsers - postPerPage;
  const currentPost = rumah_sakit.slice(indexOfFistPost, indexOfLastUsers);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className=" p-2">
        <div className="flex flex-wrap flex-row">
          <div className="flex-shrink max-w-full px-4 w-1/2">
            <h1 className="text-3xl font-semibold mt-3 mb-5">Rumah Sakit List</h1>
          </div>
          <div className="flex w-full mb-5 ml-5 md:ml-auto mr-4 font-semibold justify-between md:w-1/3 md:justify-end">
            <Link
              to={"/rumah_sakit/add"}
              className="bg-[#96CDF4] pl-3 pr-3 mb-2 rounded-md p-2 hover:bg-blue-200"
            >
              <i className="fa-solid fa-plus"></i> Add Rumah Sakit
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap flex-row">
          <div className="flex-shrink max-w-full px-4 w-full">
            <div className="p-6 bg-white  rounded-lg shadow-lg mb-6">
              {loading ? (
                <Loading />
              ) : (
                <div className="overflow-x-auto">
                  <Rumah_Sakit rumah_sakit={currentPost} />
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
    </>
  );
};

export default Rs;
