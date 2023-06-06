import axios from "axios";
import React, { useEffect, useState } from "react";

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
      console.log(response.data.data);
      setLaporan(response.data.data);
      setShowLaporan(true);
    } catch (error) {
      console.log(error.response);
    }
  };
  const cetakLaporanExcel = async () => {
    try {
      window.open(`http://localhost:9000/api/v1/rfid/distribusiDownload?dateIn=${dateIn}&dateOut=${dateOut}`);
    } catch (error) {
      console.log(error);
    }
  };
  const cetakLaporanPdf = async () => {
    try {
      window.open(
        `http://localhost:9000/api/v1/rfid/distribusiDownloadPdf?dateIn=${dateIn}&dateOut=${dateOut}`,
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" p-2">
        <div className="">
          <div className=" max-w-full px-4 ">
            <h1 className="text-3xl font-semibold mt-3 mb-5">Laporan</h1>
          </div>
          <form className="w-full" onSubmit={getLaporan}>
            <div className="flex w-full mb-5 md:ml-auto font-semibold justify-center">
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
                  <i class="fa-solid fa-table-list"></i> Laporan
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
                      onClick={cetakLaporanExcel}
                      type="button"
                      className="bg-[#1cc939] text-white  m-1 pl-3 pr-3 rounded-md p-2 hover:bg-[#40d859]"
                    >
                      <i className="fa-solid fa-file-excel"></i> Cetak Excel
                    </button>
                    <button
                      onClick={cetakLaporanPdf}
                      type="button"
                      className="bg-[#FF1818] text-white  m-1 pl-3 pr-3 rounded-md p-2 hover:bg-red-600"
                    >
                      <i className="fa-solid fa-file-pdf"></i> Cetak Pdf
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className=" w-full ltr:text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="border-b bg-white font-medium ">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          No
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Customer
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Tanggal Masuk
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Tanggal Keluar
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Linen
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Kualitas Linen
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Jenis Linen
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Jumlah Linen
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Proses
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {laporan.map((item, index) => (
                        <tr key={item._id} className="border-b text-center text-gray-600">
                          <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
                          <td className="whitespace-nowrap px-6 py-4">{item.customer.name}</td>
                          <td className="whitespace-nowrap px-6 py-4">{item.dateIn}</td>
                          <td className="whitespace-nowrap px-6 py-4">{item.dateOut}</td>
                          <td className="whitespace-nowrap px-6 py-4">{item.linen.epc}</td>
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
                          <td className="whitespace-nowrap px-6 py-4">{item.category.name}</td>
                          <td className="whitespace-nowrap px-6 py-4">{item.amount}</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {item.service === "cuci" ? (
                              <span className="rounded-md bg-[#FEBF00] px-4 py-px text-xs font-semibold uppercase text-gray-900 antialiased">
                                cuci
                              </span>
                            ) : (
                              ""
                            )}
                            {item.service === "wash" ? (
                              <span className=" rounded-md bg-[#009800] px-4 py-px text-xs font-semibold uppercase text-gray-900 antialiased">
                                Wash
                              </span>
                            ) : (
                              ""
                            )}
                            {item.service === "setrika" ? (
                              <span className="float-right rounded-md bg-[#96CDF4] px-4 py-px text-xs font-semibold uppercase text-gray-900 antialiased">
                                Setrika
                              </span>
                            ) : (
                              ""
                            )}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            {" "}
                            {item.status === null ? (
                              <span className="bg-[#b5f1b5]  pr-2 pl-2 rounded-lg">Confirm</span>
                            ) : (
                              ""
                            )}
                            {item?.status?.status === "processing" ? (
                              <span className="bg-[#96CDF4]  pr-2 pl-2 rounded-lg">CheckIn</span>
                            ) : (
                              ""
                            )}
                            {item?.status?.status === "checking" ? (
                              <span className="bg-[#FEBF00]  pr-2 pl-2 rounded-lg">Transit</span>
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
