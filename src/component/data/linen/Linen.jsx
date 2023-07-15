import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Linen = ({ linen, searchResults, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  const deletelinen = async (LinenId) => {
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
    const API_URL = import.meta.env.VITE_API_KEY;
    const token = localStorage.getItem("token");
    await axios
      .delete(`${API_URL}/api/v1/rfid/linen/${LinenId}`, {
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
      <table className=" w-full ltr:text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="border-b bg-white font-medium">
          <tr>
            <th scope="col" className="px-6 py-4">
              No
            </th>
            <th scope="col" className="px-6 py-4">
              Kode
            </th>
            <th scope="col" className="px-6 py-4">
              Rumah Sakit
            </th>
            <th scope="col" className="px-6 py-4">
              Linen
            </th>
            <th scope="col" className="px-6 py-4">
              Kategori
            </th>

            <th scope="col" className="px-6 py-4">
              Count
            </th>
            <th scope="col" className="px-6 py-4">
              Status
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
              <td className="whitespace-nowrap px-6 py-4">{item.code}</td>
              <td className="whitespace-nowrap px-6 py-4">
                {item.hospital?.name}
              </td>
              <td className="whitespace-nowrap px-6 py-4">{item.epc}</td>
              <td className="whitespace-nowrap px-6 py-4">
                {item.category?.name}
              </td>
              <td className="whitespace-nowrap px-6 py-4">{item.counter}</td>
              <td className="whitespace-nowrap px-6 py-4">
                {item.status === "1" ? (
                  <span className="bg-gray-400 rounded-lg uppercase px-2 text-gray-700">
                    Linen Tidak Terpakai
                  </span>
                ) : (
                  ""
                )}
                {item.status === "2" ? (
                  <span className="bg-green-400 rounded-lg uppercase px-2 text-grenn-700">
                    Linen Di Pakai
                  </span>
                ) : (
                  ""
                )}
                {item.status === "3" ? (
                  <span className="bg-yellow-400 rounded-lg uppercase px-2 text-yellow-700">
                    Linen Di Pakai Sudah 40x
                  </span>
                ) : (
                  ""
                )}
                {item.status === "4" ? (
                  <span className="bg-yellow-400 rounded-lg uppercase px-2 text-yellow-700">
                    Linen Di Pakai Sudah 80x
                  </span>
                ) : (
                  ""
                )}
                {item.status === "5" ? (
                  <span className="bg-red-400 rounded-lg uppercase px-2 text-red-700">
                    Linen Sudah Expired
                  </span>
                ) : (
                  ""
                )}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <Link to={`/linen/edit/${item._id}`} className=" m-3">
                  <i className="fa-solid fa-pen-to-square text-[#96CDF4] hover:text-blue-400"></i>
                </Link>
                <Link onClick={() => deletelinen(item._id)}>
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

export default Linen;
