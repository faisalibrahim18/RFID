import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Rs = () => {
  const [rumah_sakit, setRs] = useState([]);

  useEffect(() => {
    getRs();
  }, []);
  const getRs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:9000/api/v1/rfid/hospital", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data.data);
      setRs(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  const deleteHospital = async (hospitalId) => {
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
    await axios
      .delete(`http://localhost:9000/api/v1/rfid/hospital/${hospitalId}`, {
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
        getRs();
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
            <h1 className="text-3xl font-semibold mt-3 mb-5">Rumah Sakit List</h1>
          </div>
          <div className="flex w-full mb-5 ml-5 md:ml-auto mr-4 font-semibold justify-between md:w-1/3 md:justify-end">
            <Link
              to={"/rumah_sakit/add"}
              className="bg-[#96CDF4] pl-3 pr-3 mb-2 rounded-md p-2 hover:bg-blue-200"
            >
              <i className="fa-solid fa-plus"></i> Add Rumah Sakit
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
                      <th className="td-head">No</th>
                      <th className="td-head">Kode</th>
                      <th className="td-head">Nama Rumah Sakit</th>
                      <th className="td-head">No Telepon</th>
                      <th className="td-head">Alamat</th>
                      <th className="td-head">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rumah_sakit.map((item, index) => (
                      <tr key={item._id}>
                        <td className="td-class">{index + 1}</td>
                        <td className="td-class">{item.code}</td>
                        <td className="td-class">{item.name}</td>
                        <td className="td-class">{item.number_phone}</td>
                        <td className="td-class">{item.address}</td>
                        <td className="td-class">
                          <Link to={`/rumah_sakit/edit/${item._id}`} className="m-3">
                            <i className="fa-solid fa-pen-to-square text-[#96CDF4] hover:text-blue-400"></i>
                          </Link>
                          <Link onClick={() => deleteHospital(item._id)}>
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

export default Rs;
