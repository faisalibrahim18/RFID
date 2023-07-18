import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Switch } from "@headlessui/react";

const Role = ({ searchResults }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [privilege, setPrivilege] = useState([]);
  const [role, setRole] = useState([]);
  const [newRoleName, setNewRoleName] = useState("");
  const [frontEndPrivileges, setFrontEndPrivileges] = useState({});
  const [backEndPrivileges, setBackEndPrivileges] = useState({});
  const [editRole, setEditRole] = useState(null);
  const [editRoleName, setEditRoleName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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
      setRole(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  const resetForm = () => {
    setNewRoleName("");
    setFrontEndPrivileges({});
    setBackEndPrivileges({});
  };

  const handleShowEditRole = async (e) => {
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
        .put(
          `${API_URL}/api/v1/rfid/role/${editRole._id}`,
          {
            name: editRoleName,
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

      setEditRole(null);
      setEditRoleName("");
      getRole();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteRole = async (roleId) => {
    try {
      const token = localStorage.getItem("token");

      const result = await Swal.fire({
        title: "Konfirmasi Delete",
        text: "Apakah Anda yakin ingin menghapus role ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const API_URL = import.meta.env.VITE_API_KEY;
        const response = await axios.delete(
          `${API_URL}/api/v1/rfid/role/${roleId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log(response.data);

        setEditRole(null);
        setEditRoleName("");
        getRole();
        setShowAdd(false);

        Swal.fire("Deleted!", "Role berhasil dihapus.", "success");
      } else {
        Swal.fire("Cancelled", "Data Anda telah disimpan.", "info");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error!", "Terjadi kesalahan saat menghapus Role.", "error");
    }
  };

  const handleShowEditRoleButton = (Role) => {
    const roleData = role.find((item) => item._id === Role);
    if (roleData) {
      setEditRole(roleData);
      setEditRoleName(roleData.name);

      const updatedFrontEndPrivileges = {};
      const updatedBackEndPrivileges = {};

      roleData.rolePrivileges.forEach((item) => {
        console.log("allow:", item.allow);
        if (item.privilege_id.access_id.name === "Frontend") {
          updatedFrontEndPrivileges[item.privilege_id._id] = item.allow;
        } else if (item.privilege_id.access_id.name === "Backend") {
          updatedBackEndPrivileges[item.privilege_id._id] = item.allow;
        }
      });

      setFrontEndPrivileges(updatedFrontEndPrivileges);
      setBackEndPrivileges(updatedBackEndPrivileges);

      setIsEditing(true);
      setShowEdit(true);
    }
  };
  return (
    <>
      <table className="w-full ltr:text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="border-b bg-white font-medium">
          <tr>
            <th scope="col" className="px-6 py-4">
              No
            </th>
            <th scope="col" className="px-6 py-4">
              Nama Role
            </th>
            <th scope="col" className="px-6 py-4">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((item, index) => (
            <tr key={item._id} className="border-b text-center text-gray-600">
              <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.name}</td>
              <td className="whitespace-nowrap px-6 py-4">
                <button
                  onClick={() => handleShowEditRoleButton(item._id)}
                  className="m-3"
                >
                  <i className="fa-solid fa-pen-to-square text-[#96CDF4] hover:text-blue-400"></i>
                </button>
                <button
                  onClick={() => handleDeleteRole(item._id)}
                  className="m-3"
                >
                  <i className="fa-solid fa-trash-can text-[#FF1818] hover:text-red-400"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEdit && (
        <>
          <div className="overflow-x-hidden m-4 scrollbar fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-2xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    {editRole ? "Edit Role" : "Add Role"}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-red-600 hover:text-red-400 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setEditRole(null);
                      setShowEdit(false);
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
                        placeholder="Masukan Nama Role..."
                        value={isEditing ? editRoleName : newRoleName}
                        onChange={(e) =>
                          isEditing
                            ? setEditRoleName(e.target.value)
                            : setNewRoleName(e.target.value)
                        }
                      />
                    </div>
                    <div className="flex flex-shrink overflow-auto">
                      <div className="w-1/2">
                        <div className="font-bold">Access</div>
                        {privilege
                          .filter((item) => item.access_id.name === "Frontend")
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
                                <div className="w-1/2 pl-20">
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
                      <div className="pl-10 w-1/2">
                        <div className="font-bold">Access Proses</div>
                        {privilege
                          .filter((item) => item.access_id.name === "Backend")
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
                                <div className="w-1/2 pl-20">
                                  <Switch
                                    defaultChecked={backEndPrivileges[item._id]}
                                    onChange={() =>
                                      handlePrivilegeToggle(item._id, "backEnd")
                                    }
                                    className={`${
                                      backEndPrivileges[item._id]
                                        ? "bg-green-400"
                                        : "bg-gray-300"
                                    } relative inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                                  >
                                    <span
                                      aria-hidden="true"
                                      className={`${
                                        backEndPrivileges[item._id]
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
                        onClick={isEditing ? handleShowEditRole : handleAddRole}
                      >
                        {isEditing ? "Update" : showAdd ? "Save" : "Add Role"}
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
    </>
  );
};

export default Role;
