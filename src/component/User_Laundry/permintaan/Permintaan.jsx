import React, { useEffect, useState } from "react";
import Ds from "../../../assets/ds.png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Permintaan = () => {
  const [distribusi, setDistribusi] = useState([]);

  useEffect(() => {
    getDistribusi();
  }, []);
  const getDistribusi = async () => {
    const response = await axios.get("http://localhost:9000/api/v1/rfid/distribusi");
    // console.log(response.data.data);
    setDistribusi(response.data.data);
  };

  const handleUpdateProses = async (id) => {
    // console.log(id);

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
    <div className=" p-2">
      <div className="flex flex-wrap flex-row">
        <div className="flex-shrink max-w-full px-4 w-1/2">
          <h1 className="text-3xl font-semibold mt-3 mb-5">Laporan</h1>
        </div>
        <div className="flex w-full mb-7 ml-5 md:ml-auto mr-4  font-semibold justify-between md:w-1/3 md:justify-end">
          {/* <Link to={"/users/add"} className="bg-[#96CDF4] p-2 rounded-md  hover:bg-blue-200">
        <i className="fa-solid fa-user-plus"></i> Add User
      </Link> */}
        </div>
      </div>

      <div className="flex flex-wrap flex-row px-4 ">
        <div className="flex-shrink max-w-full w-full rounded-md bg-white shadow-lg">
          <div className="p-6  rounded-lg ">
            <div className="overflow-x-auto">
              <table className=" w-full ltr:text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="border-b bg-white font-medium ">
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
                  </tr>
                </thead>
                <tbody>
                  {distribusi.map((item, index) => (
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="relative">
            <img src={Ds} alt="" className="rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Permintaan;
