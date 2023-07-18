import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Kategori = ({ category, loading, searchResults }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  const [showEdit, setShowEdit] = React.useState(false);
  const [name, setName] = useState("");
  const [expired, setExpired] = useState("");
  const [unit, setUnit] = useState("");
  const [kategori, setKategori] = useState([]);
  const [message, setMsg] = useState("");
  const { id } = useParams();
  useEffect(() => {
    handleShowEditKategori(id);
  }, [id]);
  const handleShowEditKategori = async (id) => {
    setShowEdit(id, true);
    try {
      const API_URL = import.meta.env.VITE_API_KEY;
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API_URL}/api/v1/rfid/category/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      setKategori([response.data.data]);

      setExpired(response.data.data.expired);
      setName(response.data.data.name);
      setUnit(response.data.data.unit);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  const updatekategori = async (id, e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_KEY;
      const token = localStorage.getItem("token");
      await axios
        .put(
          `${API_URL}/api/v1/rfid/category/${id}`,
          {
            name: name,
            expired: expired,
            unit: unit,
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
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      } else {
        Swal.fire({
          text: error.data.msg,
          icon: "error",
        });
      }
    }
  };
  const deleteCategory = async (CategoryId) => {
    try {
      const token = localStorage.getItem("token");

      const result = await Swal.fire({
        title: "Konfirmasi Delete",
        text: "Apakah Anda yakin ingin menghapus Kategori ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const API_URL = import.meta.env.VITE_API_KEY;
        const response = await axios.delete(
          `${API_URL}/api/v1/rfid/category/${CategoryId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log(response.data);

        Swal.fire("Deleted!", "Kategori berhasil dihapus.", "success");
        window.location.reload();
      } else {
        Swal.fire("Cancelled", "Data Anda telah disimpan.", "info");
        // window.location.reload();
      }
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error!",
        "Terjadi kesalahan saat menghapus Kategori.",
        "error"
      );
      // window.location.reload();
    }
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
              Nama Kategori
            </th>
            <th scope="col" className="px-6 py-4">
              Unit
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
              <td className="whitespace-nowrap px-6 py-4">{item.unit}</td>
              <td className="whitespace-nowrap px-6 py-4">
                <button
                  onClick={() => handleShowEditKategori(item._id)}
                  className="m-3"
                >
                  <i className="fa-solid fa-pen-to-square text-[#96CDF4] hover:text-blue-400"></i>
                </button>
                <Link onClick={() => deleteCategory(item._id)}>
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
                  <h3 className="text-2xl font-semibold">Edit Kategori</h3>
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
                {kategori.map((item) => (
                  <div className="relative p-6 flex-auto" key={item._id}>
                    <form
                      className="w-full"
                      onSubmit={(e) => updatekategori(item._id, e)}
                    >
                      <div className="mb-2">
                        <label
                          for="Nama Kategori"
                          className=" text-sm font-semibold text-gray-800"
                        >
                          Nama Kategori
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Masukan Nama Kategori..."
                        />
                      </div>

                      {/* <div className="mb-2">
                        <label
                          for="Nama Kategori"
                          className=" text-sm font-semibold text-gray-800"
                        >
                          Expired
                        </label>
                        <input
                          type="date"
                          value={expired}
                          onChange={(e) => setExpired(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div> */}

                      <div className="mb-2">
                        <label
                          for="Nama Kategori"
                          className=" text-sm font-semibold text-gray-800"
                        >
                          Unit
                        </label>
                        <input
                          value={unit}
                          onChange={(e) => setUnit(e.target.value)}
                          type="text"
                          placeholder="Masukan Unit..."
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
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

export default Kategori;
