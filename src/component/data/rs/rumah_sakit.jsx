import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const rumah_sakit = ({ loading, searchRs, rumah_sakit }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  const [showEdit, setShowEdit] = React.useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [number_phone, setNumber_phone] = useState("");
  const [address, setAddress] = useState("");
  const [msg, setMsg] = useState("");
  const [rumahsakit, setRumahSakit] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    handleShowEditHospital(id);
  }, [id]);
  const handleShowEditHospital = async (id) => {
    setShowEdit(id, true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:9000/api/v1/rfid/hospital/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response);
      setRumahSakit([response.data.data]);
      setCode(response.data.data.code);
      setName(response.data.data.name);
      setNumber_phone(response.data.data.number_phone);
      setAddress(response.data.data.address);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  const updateHospital = async (id, e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios
        .put(
          `http://localhost:9000/api/v1/rfid/hospital/${id}`,
          {
            code: code,
            name: name,
            number_phone: number_phone,
            address: address,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            text: data.message,
          });
        });
      window.location.reload();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      } else {
        Swal.fire({
          text: error.data.message,
          icon: "error",
        });
      }
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
        <thead className="border-b bg-white font-medium ">
          <tr>
            <th scope="col" className="px-6 py-4">
              No
            </th>
            <th scope="col" className="px-6 py-4">
              Kode
            </th>
            <th scope="col" className="px-6 py-4">
              Nama Rumah Sakit
            </th>
            <th scope="col" className="px-6 py-4">
              No Telepon
            </th>
            <th scope="col" className="px-6 py-4">
              Alamat
            </th>
            <th scope="col" className="px-6 py-4">
              Stok Linen
            </th>
            <th scope="col" className="px-6 py-4">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {searchRs.map((item, index) => (
            <tr key={item._id} className="border-b text-center text-gray-600">
              <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.code}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.name}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.number_phone}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.address}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.stock}</td>
              <td className="whitespace-nowrap px-6 py-4">
                <button onClick={() => handleShowEditHospital(item._id)} className="m-3">
                  <i className="fa-solid fa-pen-to-square text-[#96CDF4] hover:text-blue-400"></i>
                </button>
                <Link onClick={() => deleteHospital(item._id)}>
                  <i className="fa-solid fa-trash-can text-[#FF1818] hover:text-red-400"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEdit ? (
        <>
          <div className=" overflow-x-hidden m-4  scrollbars fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Edit Hospital</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-red-600  hover:text-red-400 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowEdit(false)}
                  >
                    <span className=" text-red-500  hover:text-red-300  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                {rumahsakit.map((item) => (
                  <div className="relative p-6 flex-auto" key={item._id}>
                    <form className="w-full" onSubmit={(e) => updateHospital(item._id, e)}>
                      <div className="mb-4">
                        <label className=" text-sm font-semibold text-gray-800">Kode Rumah Sakit</label>
                        <input
                          required
                          type="text"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Masukan Kode Rumah Sakit..."
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-800">Nama Rumah Sakit</label>
                        <input
                          required
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="masukan Nama Rumah Sakit..."
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-800">No Telepon</label>
                        <input
                          required
                          type="text"
                          value={number_phone}
                          onChange={(e) => setNumber_phone(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="masukan No Telepon..."
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-800">Alamat</label>
                        <textarea
                          required
                          type="text"
                          rows={6}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="masukan Alamat..."
                        />
                      </div>
                      {/*footer*/}
                      <div className="flex justify-center pt-10">
                        <button
                          className="bg-[#A4BC92] text-white active:bg-[#C7E9B0] font-semibold text-sm px-5 py-2 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                          type="submit"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default rumah_sakit;
