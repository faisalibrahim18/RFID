import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import Inventory1 from "../data/inventory/Inventory";
import axios from "axios";
import Loading from "../Spinners/Loading";

const Inventory = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  const [inventory, setInventory] = useState([]);
  useEffect(() => {
    getInventory();
  }, []);
  const getInventory = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:9000/api/v1/rfid/inventory", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data);
    setInventory(response.data.data);
    setLoading(false);
  };

  // Get current posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = inventory.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className=" p-2">
        <div className="flex flex-wrap flex-row">
          <div className="flex-shrink max-w-full px-4 w-1/2">
            <h1 className="text-3xl font-semibold mt-3 mb-5">Inventory List</h1>
          </div>
          <div className="flex w-full mb-5 ml-5 md:ml-auto mr-4 font-semibold justify-between md:w-1/3 md:justify-end">
            <Link
              to={"/inventory/add"}
              className="bg-[#96CDF4] mb-2 pl-3 pr-3 rounded-md p-2 hover:bg-blue-200"
            >
              <i className="fa-solid fa-plus"></i> Add Inventory
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
                  <Inventory1 inventory={currentPost} />
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
    </>
  );
};

export default Inventory;
