import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Laporan = ({ searchResults }) => {
  const deleteDistribusi = async (distribusiId) => {
    const isConfirm = await Swal.fire({
      title: "Are youtd_clas sure?",
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
    const response = await axios
      .delete(`http://localhost:9000/api/v1/rfid/distribusi/${distribusiId}`, {
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
        getDistribusi();
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };

  return (
    <table className=" w-full ltr:text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="border-b bg-white font-medium">
        <tr>
          <th scope="col" className="px-6 py-4">
            No
          </th>
          <th scope="col" className="px-6 py-4">
            Custumer
          </th>
          <th scope="col" className="px-6 py-4">
            Tgl Masuk
          </th>
          <th scope="col" className="px-6 py-4">
            Tgl Keluar
          </th>
          <th scope="col" className="px-6 py-4">
            Kualitas Linen
          </th>
          <th scope="col" className="px-6 py-4">
            Jumlah Linen
          </th>
          <th scope="col" className="px-6 py-4">
            Proses
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
            <td className="whitespace-nowrap px-6 py-4">{item.customer.name}</td>
            <td className="whitespace-nowrap px-6 py-4">{item.dateIn}</td>
            <td className="whitespace-nowrap px-6 py-4">{item.dateOut}</td>
            <td className="whitespace-nowrap px-6 py-4">
              {item.quality === "baik" ? (
                <span className=" rounded-md bg-[#96CDF4] px-4 py-px text-xs font-semibold uppercase text-gray-900 antialiased">
                  Baik
                </span>
              ) : (
                ""
              )}
              {item.quality === "kurang baik" ? (
                <span className="float-right rounded-md bg-[#FEBF00] px-4 py-px text-xs font-semibold uppercase text-gray-900 antialiased">
                  Kurang Baik
                </span>
              ) : (
                ""
              )}
            </td>

            <td className="whitespace-nowrap px-6 py-4">{item.amount}</td>
            <td className="whitespace-nowrap px-6 py-4">
              {" "}
              {item.status === null ? (
                <button
                  onClick={() => handleUpdateProses(item._id)}
                  className="bg-[#b5f1b5] hover:bg-[#88f588] pr-2 pl-2 rounded-lg"
                >
                  Confirm
                </button>
              ) : (
                ""
              )}
              {item?.status?.status === "processing" ? (
                <span className="bg-[#96CDF4]  pr-2 pl-2 rounded-lg">CheckIn</span>
              ) : (
                ""
              )}
              {item?.status?.status === "checking" ? (
                <span className="bg-[#FEBF00] pr-2 pl-2 rounded-lg">Transit</span>
              ) : (
                ""
              )}
              {item?.status?.status === "transit" ? (
                <span className="bg-[#5eebc7]  pr-2 pl-2 rounded-lg">Accepted</span>
              ) : (
                ""
              )}
              {item?.status?.status === "accepted" ? (
                <span className="bg-[#65a0f8]  pr-2 pl-2 rounded-lg">Wash</span>
              ) : (
                ""
              )}
              {item?.status?.status === "washing" ? (
                <span className="bg-[#82f865]  pr-2 pl-2 rounded-lg">Dry</span>
              ) : (
                ""
              )}
              {item?.status?.status === "drying" ? (
                <span className="bg-[#54e2f5]  pr-2 pl-2 rounded-lg">Done</span>
              ) : (
                ""
              )}
              {item?.status?.status === "success" ? (
                <span className=" rounded-md bg-[#10e04f] px-4 py-px text-xs font-semibold uppercase text-gray-900 antialiased">
                  Success
                </span>
              ) : (
                ""
              )}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              <Link to={`/laporanL/edit/${item._id}`} className=" m-3 ">
                <i className="fa-solid fa-pen-to-square text-[#96CDF4] hover:text-blue-400"></i>
              </Link>
              <Link onClick={() => deleteDistribusi(item._id)}>
                <i className="fa-solid fa-trash-can text-[#FF1818] hover:text-red-400"></i>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Laporan;
