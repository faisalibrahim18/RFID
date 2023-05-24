import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Laporan = () => {
  const [showLaporan, setShowLaporan] = useState(false);
  const [dateIn, setDateIn] = useState([]);
  const [dateOut, setDateOut] = useState([]);
  const [laporan, setLaporan] = useState([]);

  useEffect(() => {
    getLaporan();
  });

  const getLaporan = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:9000/api/v1/rfid/distribusi?dateIn=${dateIn}&dateOut=${dateOut}`,
        {
          dateIn: dateIn,
          dateOut: dateOut,
        },
      );
      // console.log(response.data.data);
      setLaporan(response.data.data);
      setShowLaporan(true);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <div className=" p-2">
        <div className="flex flex-wrap flex-row">
          <div className="flex-shrink max-w-full px-4 w-1/2">
            <h1 className="text-3xl font-semibold mt-3 mb-5">Laporan</h1>
          </div>
          <form className="w-full" onSubmit={getLaporan}>
            <div className="flex w-full mb-5 ml-5 md:ml-auto mr-4 font-semibold justify-between md:w-1/3 md:justify-end">
              <div className="flex flex-wrap ">
                <div className="md:w-1/2  md:mb-2  w-full">
                  <div className="mb-2">
                    <label className="block text-sm font-semibold text-gray-800">Tanggal Awal</label>
                    <input
                      type="date"
                      required
                      value={dateIn}
                      onChange={(e) => setDateIn(e.target.value)}
                      className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                </div>
                <div className=" md:w-1/2  lg:pl-3 md:pl-3  w-full">
                  {" "}
                  <div className="mb-2">
                    <label className="block text-sm font-semibold text-gray-800">Tanggal Akhir</label>
                    <input
                      type="date"
                      required
                      value={dateOut}
                      onChange={(e) => setDateOut(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#FEBF00]  m-1 rounded-md p-2 hover:bg-yellow-400">
                  Laporan
                </button>
              </div>
            </div>
          </form>
        </div>
        {showLaporan ? (
          <div className="flex flex-wrap flex-row">
            <div className="flex-shrink max-w-full px-4 w-full">
              <div className="p-6 bg-white  rounded-lg shadow-lg mb-6">
                <div className="flex lg:flex-wrap mb-2">
                  <div className=" w-1/2 text-3xl font-semibold "></div>

                  <div className="flex pr-3  pt-1   content-center font-semibold  w-1/2 justify-end">
                    <button
                      type="file"
                      className="bg-[#FF1818] text-white  m-1 pl-3 pr-3 rounded-md p-2 hover:bg-red-600"
                    >
                      Cetak
                    </button>
                  </div>
                </div>
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
                        <th className="td-head">Proses</th>
                      </tr>
                    </thead>
                    <tbody>
                      {laporan.map((item, index) => (
                        <tr key={item._id}>
                          <td className="td-class">{index + 1}</td>
                          <td className="td-class">{item.customer.name}</td>
                          <td className="td-class">{item.dateIn}</td>
                          <td className="td-class">{item.dateOut}</td>
                          <td className="td-class">{item.category.name}</td>
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
                          <td className="td-class">
                            {" "}
                            {item.status === null ? (
                              <button
                                onClick={() => handleUpdateProses(item._id)}
                                className="bg-[#b5f1b5] hover:bg-[#88f588] pr-2 pl-2 rounded-lg"
                              >
                                confirm
                              </button>
                            ) : (
                              ""
                            )}
                            {item?.status?.status === "processing" ? (
                              <button
                                onClick={() => setShowProses(true)}
                                className="bg-[#b5f1b5] hover:bg-[#88f588] pr-2 pl-2 rounded-lg"
                              >
                                CheckIn
                              </button>
                            ) : (
                              ""
                            )}
                          </td>
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Laporan;
