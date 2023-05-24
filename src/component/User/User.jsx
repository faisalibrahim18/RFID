import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const User = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
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
    } catch (e) {
      console.log(e);
    }
  };
  // console.log(token);
  const deleteUser = async (userId) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
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
    await axios
      .delete(`http://localhost:9000/api/v1/rfid/user/${userId}`, {
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
        getUsers();
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };

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
              <div className="overflow-x-auto">
                <table className=" w-full ltr:text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead>
                    <tr>
                      <th className="td-head ">No</th>
                      <th className="td-head">Name</th>
                      <th className="td-head">Usename</th>
                      <th className="td-head">Email</th>
                      <th className="td-head">Role</th>
                      <th className="td-head">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((item, index) => (
                      <tr key={item._id}>
                        <td className="td-class">{index + 1}</td>
                        <td className="td-class">{item.name}</td>
                        <td className="td-class">{item.username}</td>
                        <td className="td-class">{item.email}</td>
                        <td className="td-class">
                          {item.role === "admin" ? (
                            <span className="rounded-md bg-[#96CDF4] px-4 py-px text-xs font-semibold uppercase text-gray-900 antialiased">
                              Admin
                            </span>
                          ) : (
                            ""
                          )}
                          {item.role === "user" ? (
                            <span className=" rounded-md bg-[#00205F] px-4 py-px text-xs font-semibold uppercase text-gray-200 antialiased">
                              User
                            </span>
                          ) : (
                            ""
                          )}
                        </td>
                        <td className="td-class">
                          <Link to={`/users/edit/${item._id}`} className="m-3 ">
                            <i className="fa-solid fa-pen-to-square text-[#96CDF4] hover:text-blue-400"></i>
                          </Link>
                          <Link onClick={() => deleteUser(item._id)}>
                            <i className="fa-solid fa-trash-can text-[#FF1818] hover:text-red-400"></i>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
