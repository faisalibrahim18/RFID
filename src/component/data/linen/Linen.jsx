import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Linen = ({ searchResults, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  const [showEdit, setShowEdit] = React.useState(false);
  const [epc, setEpc] = useState("");
  const [category, setCategory] = useState("");
  const [dataCategory, setDataCategory] = useState([]);
  const [linen1, setLinen1] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    handleShowEditLinen(id);
  }, [id]);

  const handleShowEditLinen = async (id) => {
    setShowEdit(id, true);
    try {
      const API_URL = import.meta.env.VITE_API_KEY;
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/v1/rfid/linen/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response);
      setLinen1([response.data.data]);

      setEpc(response.data.data.epc);
      setCategory(response.data.data.category);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  const updateLinen = async (id, e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_KEY;
      const token = localStorage.getItem("token");
      await axios
        .put(
          `${API_URL}/api/v1/rfid/linen/${id}`,
          {
            epc: epc,
            category: category,
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

  useEffect(() => {
    getKategori();
  }, []);

  const getKategori = async () => {
    const token = localStorage.getItem("token");
    const API_URL = import.meta.env.VITE_API_KEY;
    const response = await axios.get(`${API_URL}/api/v1/rfid/category`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data.data);
    setDataCategory(response.data.data);
  };

  const deletelinen = async (LinenId) => {
    try {
      const token = localStorage.getItem("token");

      const result = await Swal.fire({
        title: "Konfirmasi Delete",
        text: "Apakah Anda yakin ingin menghapus Linen ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const API_URL = import.meta.env.VITE_API_KEY;
        const response = await axios.delete(
          `${API_URL}/api/v1/rfid/linen/${LinenId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log(response.data);

        Swal.fire("Deleted!", "Linen berhasil dihapus.", "success");
        window.location.reload();
      } else {
        Swal.fire("Cancelled", "Data Anda telah disimpan.", "info");
        // window.location.reload();
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error!", "Terjadi kesalahan saat menghapus Linen.", "error");
      // window.location.reload();
    }
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
                  <span className="bg-gray-400 rounded-lg uppercase px-2 text-gray-100">
                    Linen Tidak Terpakai
                  </span>
                ) : (
                  ""
                )}
                {item.status === "2" ? (
                  <span className="bg-green-400 rounded-lg uppercase px-2 text-green-700">
                    Linen Di Pakai
                  </span>
                ) : (
                  ""
                )}
                {item.status === "3" ? (
                  <span className="bg-orange-400 rounded-lg uppercase px-2 text-orange-700">
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
                <Link
                  onClick={() => handleShowEditLinen(item._id)}
                  className=" m-3"
                >
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

      {showEdit ? (
        <>
          <div className=" overflow-x-hidden m-4  scrollbars fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Edit Linen</h3>
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
                {linen1.map((item) => (
                  <div className="relative p-6 flex-auto" key={item._id}>
                    <form
                      className="w-full"
                      onSubmit={(e) => updateLinen(item._id, e)}
                    >
                      <div className="mb-2">
                        <label className=" text-sm font-semibold text-gray-800">
                          Linen
                        </label>
                        <input
                          type="text"
                          value={epc}
                          onChange={(e) => setName(e.target.value)}
                          hidden
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Masukan Nama Linen..."
                        />
                      </div>
                      <div className="mb-2">
                        <label className=" text-sm font-semibold text-gray-800">
                          Kategori
                        </label>
                        <select
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          value={category}
                          required
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option selected>Pilih Kategori </option>

                          {dataCategory.map((d, i) => (
                            <option value={d._id}>{d.name}</option>
                          ))}
                        </select>
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

export default Linen;
