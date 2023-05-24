import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Distribusi = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [showProses, setShowProses] = React.useState(false);
  const [distribusi, setDistribusi] = useState([]);
  const [status, setStatus] = useState([]);
  const { id } = useParams();

  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    getDistribusi();
  }, []);
  const getDistribusi = async () => {
    const response = await axios.get("http://localhost:9000/api/v1/rfid/distribusi");
    // console.log(response.data.data);
    setDistribusi(response.data.data);
  };
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

    await axios
      .delete(`http://localhost:9000/api/v1/rfid/distribusi/${distribusiId}`)
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

  const handleUpdateProses = async (id) => {
    console.log(id);

    fetch("http://localhost:9000/api/v1/rfid/tracker", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Nama Tracker Baru",
        description: "Deskripsi Tracker Baru",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const newTrackerId = data.data._id;
        // console.log(data.data._id);
        fetch(`http://localhost:9000/api/v1/rfid/distribusi/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newTrackerId,
          }),
        })
          .then(() => {
            Swal.fire({
              icon: "success",
              text: "Entitas tracker dan distribusi berhasil dibuat dan diperbarui",
            });
            // console.log("Entitas tracker dan distribusi berhasil dibuat dan diperbarui");
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              text: 'Permintaan ke endpoint "/distribusi" gagal',
            });
            // console.error('Permintaan ke endpoint "/distribusi" gagal');
          });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          text: 'Permintaan ke endpoint "/tracker" gagal',
        });
        // console.error('Permintaan ke endpoint "/tracker" gagal');
      });
  };
  return (
    <>
      {" "}
      <div className=" p-2">
        <div className="flex flex-wrap flex-row">
          <div className="flex-shrink max-w-full px-4 w-1/2">
            <h1 className="text-3xl font-semibold mt-3 mb-5">Distribusi List</h1>
          </div>
          <div className="flex flex-wrap pr-5 pl-5 w-full pt-1 mb-2 content-center font-semibold justify-between md:w-1/2 md:justify-end">
            <button
              type="button"
              className="bg-[#FEBF00]  m-1 pl-3 pr-3 rounded-md p-2 hover:bg-yellow-400"
              onClick={() => setShowModal(true)}
            >
              Upload
            </button>
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
                      <th className="td-head">Customer</th>
                      <th className="td-head">Tanggal Masuk</th>
                      <th className="td-head">Tanggal Keluar</th>
                      <th className="td-head">Linen</th>
                      <th className="td-head">Kualitas Linen</th>
                      <th className="td-head">Jenis Linen</th>
                      <th className="td-head">Jumlah Linen</th>
                      <th className="td-head">Status</th>
                      <th className="td-head">Action</th>
                      <th className="td-head">Proses</th>
                    </tr>
                  </thead>
                  <tbody>
                    {distribusi.map((item, index) => (
                      <tr key={item._id}>
                        <td className="td-class">{index + 1}</td>
                        <td className="td-class">{item.customer.name}</td>
                        <td className="td-class">{item.dateIn}</td>
                        <td className="td-class">{item.dateOut}</td>
                        <td className="td-class">{item.linen.name}</td>
                        <td className="td-class">
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
                        <td className="td-class">{item.category.name}</td>
                        <td className="td-class">{item.amount}</td>
                        <td className="td-class">
                          {item.service === "cuci" ? (
                            <span class="rounded-md bg-[#FEBF00] px-4 py-px text-xs font-semibold uppercase text-gray-900 antialiased">
                              cuci
                            </span>
                          ) : (
                            ""
                          )}
                          {item.service === "wash" ? (
                            <span class=" rounded-md bg-[#009800] px-4 py-px text-xs font-semibold uppercase text-gray-900 antialiased">
                              Wash
                            </span>
                          ) : (
                            ""
                          )}
                          {item.service === "setrika" ? (
                            <span class="float-right rounded-md bg-[#96CDF4] px-4 py-px text-xs font-semibold uppercase text-gray-900 antialiased">
                              Setrika
                            </span>
                          ) : (
                            ""
                          )}
                        </td>

                        <td className="td-class">
                          <Link
                            to={`/distribusi/edit/${item._id}`}
                            className="bg-[#96CDF4] pl-3 pr-3 rounded-md p-2 hover:bg-blue-400 m-3 text-white"
                          >
                            Edit
                          </Link>
                          <Link
                            onClick={() => deleteDistribusi(item._id)}
                            className="bg-[#FF1818] pl-3 pr-3 rounded-md p-2 text-white hover:bg-red-600"
                          >
                            Hapus
                          </Link>
                        </td>
                        <td className="td-class">
                          {" "}
                          {item.status === null ? (
                            <button
                              onClick={() => handleUpdateProses(item._id)}
                              className="bg-[#b5f1b5] hover:bg-[#88f588] pr-2 pl-2 rounded-lg"
                            >
                              {isLoading ? "Loading.." : "Confirm"}
                            </button>
                          ) : (
                            ""
                          )}
                          {item?.status?.status === "processing" ? (
                            <button
                              onClick={() => setShowProses(item._id, true)}
                              className="bg-[#b5f1b5] hover:bg-[#88f588] pr-2 pl-2 rounded-lg"
                            >
                              CheckIn
                            </button>
                          ) : (
                            ""
                          )}
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
      {/* Modal */}
      {showModal ? (
        <>
          <div className=" overflow-x-hidden m-4  scrollbars fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Upload</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-red-600  hover:text-red-400 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className=" text-red-500  hover:text-red-300  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form className="w-full">
                    <div className="mb-2">
                      <input
                        type="file"
                        className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder=" Hospital name"
                      />
                    </div>

                    {/*footer*/}
                    <div className="flex justify-center pt-10">
                      <button
                        className="bg-[#A4BC92] text-white active:bg-[#C7E9B0] font-semibold text-sm px-5 py-2 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Upload
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showProses ? (
        <>
          <div className=" overflow-x-hidden m-4  scrollbars fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">CheckIn</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-red-600  hover:text-red-400 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowProses(false)}
                  >
                    <span className=" text-red-500  hover:text-red-300  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form className="w-full">
                    <div className="mb-2">
                      <input
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Checked by"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="E-mail"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Phone number"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Amount"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Heavy"
                      />
                    </div>
                    <div className="mb-2">
                      <textarea
                        className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        cols="30"
                        rows="5"
                        // value={note}
                        // onChange={(e) => setNote(e.target.value)}
                        placeholder="Notes"
                      ></textarea>
                    </div>

                    {/*footer*/}
                    <div className="flex justify-center pt-10">
                      <button
                        className="bg-[#A4BC92] text-white active:bg-[#C7E9B0] font-semibold text-sm px-5 py-2 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Distribusi;
