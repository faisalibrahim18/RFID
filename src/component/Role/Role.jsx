import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Switch } from "@headlessui/react";
import Swal from "sweetalert2";
import Role1 from "../data/role/Role";
import SearchRole from "../search/SearchRole";
import Loading from "../Spinners/Loading";
import Pagination from "../pagination/Pagination";

const Role = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [privilege, setPrivilege] = useState([]);
  const [role, setRole] = useState([]);
  const [newRoleName, setNewRoleName] = useState("");
  const [frontEndPrivileges, setFrontEndPrivileges] = useState({});
  const [backEndPrivileges, setBackEndPrivileges] = useState({});
  const [editRole, setEditRole] = useState(null);
  const [editRoleName, setEditRoleName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  useEffect(() => {
    getPrivilege();
    getRole();
  }, []);

  const getPrivilege = async () => {
    try {
      const token = localStorage.getItem("token");
      const API_URL = import.meta.env.VITE_API_KEY;
      const response = await axios.get(`${API_URL}/api/v1/rfid/privilege`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data.data);
      setPrivilege(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRole = async () => {
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_KEY;
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/v1/rfid/role`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data.data);
      setSearchResults(response.data.data);
      setRole(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  // Get current posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = searchResults.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrivilegeToggle = (privilegeId, privilegeType) => {
    if (privilegeType === "frontEnd") {
      setFrontEndPrivileges((prevPrivileges) => ({
        ...prevPrivileges,
        [privilegeId]: !prevPrivileges[privilegeId],
      }));
    } else if (privilegeType === "backEnd") {
      setBackEndPrivileges((prevPrivileges) => ({
        ...prevPrivileges,
        [privilegeId]: !prevPrivileges[privilegeId],
      }));
    }
  };

  const handleAddRole = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const newPrivileges = privilege.map((item) => {
        const frontEndEnabled = frontEndPrivileges[item._id] || false;
        const backEndEnabled = backEndPrivileges[item._id] || false;

        return {
          id: item._id,
          allow: frontEndEnabled || backEndEnabled || false,
        };
      });

      const API_URL = import.meta.env.VITE_API_KEY;
      const response = await axios
        .post(
          `${API_URL}/api/v1/rfid/role`,
          {
            name: newRoleName,
            privileges: newPrivileges,
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
      window.location.reload();
      // console.log(response.data);
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setNewRoleName("");
    setFrontEndPrivileges({});
    setBackEndPrivileges({});
  };

  return (
    <>
      <div className="p-2">
        <div className="flex flex-wrap flex-row">
          <div className="flex-shrink max-w-full px-4 w-1/2">
            <h1 className="text-3xl font-semibold mt-3 mb-5">
              Role Management
            </h1>
          </div>
          <div className="flex w-full mb-5 ml-5 md:ml-auto mr-4 font-semibold justify-between md:w-1/3 md:justify-end">
            <button
              onClick={() => {
                setShowAdd(true);
                resetForm();
              }}
              className="bg-[#96CDF4] pl-3 pr-3 mb-2 rounded-md p-2 hover:bg-blue-200"
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
        <div className="flex flex-wrap flex-row">
          <div className="flex-shrink max-w-full px-4 w-full">
            <div className="p-6 bg-white rounded-lg shadow-lg mb-6">
              <SearchRole
                role={role}
                setSearchResults={setSearchResults}
              />
              {loading ? (
                <Loading />
              ) : (
                <div className="overflow-x-auto">
                  <Role1 searchResults={currentPost} />
                  <Pagination
                    postPerPage={postPerPage}
                    totalPosts={role.length}
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
        {showAdd && (
          <>
            <div className="overflow-x-hidden m-4 scrollbar fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-sm">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold">Add Role</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-red-600 hover:text-red-400 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => {
                        setShowAdd(false);
                      }}
                    >
                      <span className="text-red-500 hover:text-red-300 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        x
                      </span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <form className="w-full">
                      <div className="mb-4">
                        <label
                          htmlFor="Nama Role"
                          className="text-sm font-semibold text-gray-800"
                        >
                          Nama
                        </label>
                        <input
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Masukan Role..."
                          onChange={(e) => setNewRoleName(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-shrink overflow-auto">
                        <div className="">
                          <div className="font-bold">Access</div>
                          {privilege
                            .filter(
                              (item) => item.access_id.name === "Frontend"
                            )
                            .map((item) => (
                              <div className="mb-4" key={item._id}>
                                <div className="flex flex-shrink">
                                  <div className="w-1/2">
                                    <label
                                      htmlFor="Nama Role"
                                      className="text-sm font-semibold text-gray-800"
                                    >
                                      {item.name}
                                    </label>
                                  </div>
                                  <div className="w-1/2 pl-36">
                                    <Switch
                                      defaultChecked={
                                        frontEndPrivileges[item._id]
                                      }
                                      onChange={() =>
                                        handlePrivilegeToggle(
                                          item._id,
                                          "frontEnd"
                                        )
                                      }
                                      className={`${
                                        frontEndPrivileges[item._id]
                                          ? "bg-green-400"
                                          : "bg-gray-300"
                                      } relative inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                                    >
                                      <span
                                        aria-hidden="true"
                                        className={`${
                                          frontEndPrivileges[item._id]
                                            ? "translate-x-6 pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                                            : "translate-x-0 pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-gray-100 shadow-lg ring-0 transition duration-200 ease-in-out"
                                        }`}
                                      />
                                    </Switch>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="flex justify-center pt-10">
                        <button
                          className="bg-[#A4BC92] text-white active:bg-[#C7E9B0] font-semibold text-sm px-5 py-2 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                          onClick={handleAddRole}
                        >
                          Add Role
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )}
      </div>
    </>
  );
};

export default Role;
