import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const User = ({ users, loading, searchResults }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

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
        window.location.reload();
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
        window.location.reload();
      });
  };
  return (
    <>
      {" "}
      <table className=" w-full ltr:text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="border-b bg-white font-medium ">
          <tr>
            <th scope="col" className="px-6 py-4">
              No
            </th>
            <th scope="col" className="px-6 py-4">
              Name
            </th>
            <th scope="col" className="px-6 py-4">
              Usename
            </th>
            <th scope="col" className="px-6 py-4">
              Email
            </th>
            <th scope="col" className="px-6 py-4">
              Role
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
              <td className="whitespace-nowrap px-6 py-4">{item.username}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.email}</td>
              <td className="whitespace-nowrap px-6 py-4">
                {item.role === "admin" ? (
                  <span className="rounded-md bg-[#96CDF4] px-4 py-px text-xs font-semibold uppercase text-gray-900 antialiased">
                    Admin
                  </span>
                ) : (
                  ""
                )}
                {item.role === "super_admin" ? (
                  <span className="rounded-md bg-[#eebc72] px-4 py-px text-xs font-semibold uppercase text-gray-900 antialiased">
                    Super Admin
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
                {item.role === "user_laundry" ? (
                  <span className=" rounded-md bg-[#005f57] px-4 py-px text-xs font-semibold uppercase text-gray-200 antialiased">
                    User Laundry
                  </span>
                ) : (
                  ""
                )}
                {item.role === "user_pabrik" ? (
                  <span className=" rounded-md bg-[#dbe645] px-4 py-px text-xs font-semibold uppercase text-gray-500 antialiased">
                    User Pabrik
                  </span>
                ) : (
                  ""
                )}
                {item.role === "delivery" ? (
                  <span className=" rounded-md bg-[#e645cb] px-4 py-px text-xs font-semibold uppercase text-gray-200 antialiased">
                    Delivery
                  </span>
                ) : (
                  ""
                )}
                {item.role === "rs" ? (
                  <span className=" rounded-md bg-[#4ee692] px-4 py-px text-xs font-semibold uppercase text-gray-100 antialiased">
                    User Rumah Sakit
                  </span>
                ) : (
                  ""
                )}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
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
    </>
  );
};

export default User;
