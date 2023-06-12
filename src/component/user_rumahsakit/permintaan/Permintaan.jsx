import React, { useEffect, useState } from "react";
import Ds from "../../../assets/ds.png";

import axios from "axios";
import Loading from "../../Spinners/Loading";
import Pagination from "../../pagination/Pagination";
import Permintaan1 from "../../data/Rumahsakit/Permintaan";
const Permintaan = () => {
  const [distribusi, setDistribusi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

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

  // Get current posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = distribusi.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className=" p-2">
      <div className="flex flex-wrap flex-row">
        <div className="flex-shrink max-w-full px-4 w-1/2">
          <h1 className="text-3xl font-semibold mt-3 mb-5">Permintaan</h1>
        </div>
        <div className="flex w-full mb-7 ml-5 md:ml-auto mr-4  font-semibold justify-between md:w-1/3 md:justify-end">
          {/* <Link to={"/users/add"} className="bg-[#96CDF4] p-2 rounded-md  hover:bg-blue-200">
          <i className="fa-solid fa-user-plus"></i> Add User
        </Link> */}
        </div>
      </div>

      <div className="flex flex-wrap flex-row px-4 ">
        <div className="flex-shrink max-w-full w-full rounded-md bg-white shadow-lg">
          <div className="p-6  rounded-lg ">
            {loading ? (
              <Loading />
            ) : (
              <div className="overflow-x-auto">
                <Permintaan1 distribusi={currentPost} />
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
    </div>
  );
};

export default Permintaan;
