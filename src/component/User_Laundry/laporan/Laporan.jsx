import React, { useEffect, useState } from "react";
import Ds from "../../../assets/ds.png";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Laporan = () => {
  const [file, setFile] = useState("");

  const [distribusi, setDistribusi] = useState([]);
  const [show, setShowModal] = useState(false);

  const navigate = useNavigate();

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

  //Upload
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  //Upload
  const uploadData = async (e) => {
    e.preventDefault();

    try {
      if (file) {
        console.log("file", file);
      }

      const formData = new FormData();
      formData.append("excel", file);

      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios
        .post("http://localhost:9000/api/v1/rfid/distribusi/upload", formData, config)
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            text: data.message,
          });
        });

      navigate("/laporanL");
    } catch (error) {
      if (error.response) {
        Swal.fire({
          text: error.response.data.message,
          icon: "error",
        });
        // console.log(error.response);
        setMsg(error.response.data.message);
      } else {
        // console.log(error.response);
        Swal.fire({
          text: error.data.message,
          icon: "error",
        });
      }
    }
  };
  return (
    <div className=" p-2">
      <div className="flex flex-wrap flex-row">
        <div className="flex-shrink max-w-full px-4 w-1/2">
          <h1 className="text-3xl font-semibold mt-3 mb-5">Laporan</h1>
        </div>
        {/* <div className="flex w-full mb-7 ml-5 md:ml-auto mr-4  font-semibold justify-between md:w-1/3 md:justify-end">
          <button
            type="button"
            className="bg-[#FEBF00]  m-1 pl-3 pr-3 rounded-md p-2 hover:bg-yellow-400"
            onClick={() => setShowModal(true)}
          >
            <i className="fa-solid fa-upload"></i> Upload
          </button>
        </div> */}
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
                      Action
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
            </div>
          </div>
          <div className="relative">
            <img src={Ds} alt="" className="rounded-lg" />
          </div>
        </div>
      </div>
      {show ? (
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
                  <form className="w-full" onSubmit={uploadData}>
                    <div className="mb-2">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    {/*footer*/}
                    <div className="flex justify-center pt-10">
                      <button
                        className="bg-[#A4BC92] text-white active:bg-[#C7E9B0] font-semibold text-sm px-5 py-2 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                        type="submit"
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
    </div>
  );
};

export default Laporan;
