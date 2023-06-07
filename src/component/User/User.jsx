import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import Users from "../data/user/User";
import Loading from "../Spinners/Loading";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:9000/api/v1/rfid/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data.data.msg);

      setUsers(response.data.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  // console.log(token);
  // Get current posts
  const indexOfLastUsers = currentPage * postPerPage;
  const indexOfFistPost = indexOfLastUsers - postPerPage;
  const currentUsers = users.slice(indexOfFistPost, indexOfLastUsers);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className=" p-2">
        <div className="flex flex-wrap flex-row">
          <div className="flex-shrink max-w-full px-4 w-1/2">
            <h1 className="text-3xl font-semibold mt-3 mb-5">UserList</h1>
          </div>
          <div className="flex w-full mb-7 ml-5 md:ml-auto mr-4  font-semibold justify-between md:w-1/3 md:justify-end">
            <Link to={"/users/add"} className="bg-[#96CDF4] p-2 rounded-md  hover:bg-blue-200">
              <i className="fa-solid fa-user-plus"></i> Add User
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
                  <Users users={currentUsers} />
                  <Pagination
                    postPerPage={postPerPage}
                    totalPosts={users.length}
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

export default User;
