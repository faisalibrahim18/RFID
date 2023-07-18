import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const User = ({ users, loading, searchResults }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      const result = await Swal.fire({
        title: "Konfirmasi Delete",
        text: "Apakah Anda yakin ingin menghapus user ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const API_URL = import.meta.env.VITE_API_KEY;
        const response = await axios.delete(
          `${API_URL}/api/v1/rfid/user/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log(response.data);

        Swal.fire("Deleted!", "User berhasil dihapus.", "success");
        window.location.reload();
      } else {
        Swal.fire("Cancelled", "Data Anda telah disimpan.", "info");
        // window.location.reload();
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error!", "Terjadi kesalahan saat menghapus User.", "error");
      // window.location.reload();
    }
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
              <td className="whitespace-nowrap px-6 py-4">{item.role.name}</td>
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
