import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const Invoice = ({ searchResults }) => {
  const [inventory1, setInventory] = useState([]);
  const { id } = useParams();

  const handleCetakInvoice = async (id) => {
    try {
      const API_URL = import.meta.env.VITE_API_KEY;
      const token = localStorage.getItem("token");
      // console.log(token);
      window.open(`${API_URL}/api/v1/rfid/invoiceExport/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <table className=" w-full ltr:text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="border-b bg-white font-medium ">
        <tr>
          <th scope="col" className="px-6 py-4">
            No
          </th>

          <th scope="col" className="px-6 py-4">
            Nomor Transaksi
          </th>
          <th scope="col" className="px-6 py-4">
            Nama
          </th>
          <th scope="col" className="px-6 py-4">
            price
          </th>
        </tr>
      </thead>
      <tbody>
        {searchResults.map((item, index) => (
          <tr key={item._id} className="border-b text-center text-gray-600">
            <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
            <td className="whitespace-nowrap px-6 py-4">
              {item.transactionNumber}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              {item.hospital.name}
            </td>
            <td className="whitespace-nowrap px-6 py-4">{item.price}</td>
            {/* <td className="whitespace-nowrap px-6 py-4">
              <button
                onClick={() => handleShowEditInventory(item._id)}
                className="m-3 "
              >
                <i className="fa-solid fa-pen-to-square text-[#96CDF4] hover:text-blue-400"></i>
              </button>
              <Link onClick={() => deleteInventory(item._id)}>
                <i className="fa-solid fa-trash-can text-[#FF1818] hover:text-red-400"></i>
              </Link>
            </td> */}
            <td className="whitespace-nowrap px-6 py-4">
              <button
                onClick={() => handleCetakInvoice(item._id)}
                className="bg-[#eb0d0d] text-white hover:bg-[#e93434] p-2 rounded-lg"
              >
                Cetak Invoice
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Invoice;
