import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
const Permintaan = ({ distribusi }) => {
  const [showDone, setShowDone] = React.useState(false);

  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [heavy, setHeavy] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState([]);
  const { id } = useParams();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  //Done
  useEffect(() => {
    handleShowDone();
  }, [id]);
  const handleShowDone = async (id) => {
    setShowDone(id, true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:9000/api/v1/rfid/tracker/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setStatus([response.data.data]);
      // console.log(response.data.data);
    } catch (error) {
      if (error.response) {
        // console.log(error.response);
      }
    }
  };
  const updateDone = async (id, e) => {
    e.preventDefault();
    try {
      if (file) {
        console.log("done", file);
        console.log("name", name);
        console.log("email", email);
        console.log("no_hp", no_hp);
        console.log("heavy", heavy);
        console.log("note", note);
      }
      const formData = new FormData();
      formData.append("done", file);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("no_hp", no_hp);
      formData.append("heavy", heavy);
      formData.append("note", note);
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios
        .put(`http://localhost:9000/api/v1/rfid/tracker/done/${id}`, formData, config)
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            text: data.message,
          });
        });
      console.log(response);
      // navigate("/distribusi");
      window.location.reload();
      // e.preventDefault();
    } catch (error) {
      console.log(error);
      if (error.response) {
        Swal.fire({
          text: error.response.data.msg,
          icon: "error",
        });
        // console.log(error.response.data.message);
        // setMsg(error.response.data.msg);
      } else {
        // console.log(error.response.message);
        Swal.fire({
          text: error.response.msg,
          icon: "error",
        });
      }
    }
  };
  return (
    <>
      {" "}
      <table className=" w-full ltr:text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="border-b bg-white font-medium">
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
                {item.quality === "baik" ? <span>Baik</span> : ""}
                {item.quality === "kurang baik" ? <span>Kurang Baik</span> : ""}
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
                  <span className="bg-[#FEBF00]  pr-2 pl-2 rounded-lg">Transit</span>
                ) : (
                  ""
                )}
                {item?.status?.status === "transit to laundry" ? (
                  <span className="bg-[#5eebc7]  pr-2 pl-2 rounded-lg">Accepted</span>
                ) : (
                  ""
                )}
                {item?.status?.status === "accepted" ? (
                  <span className="bg-[#65a0f8]  pr-2 pl-2 rounded-lg">Wash</span>
                ) : (
                  ""
                )}
                {item?.status?.status === "wash" ? (
                  <span className="bg-[#82f865] pr-2 pl-2 rounded-lg">Dry</span>
                ) : (
                  ""
                )}
                {item?.status?.status === "drying" ? (
                  <span className="bg-[#54e2f5]  pr-2 pl-2 rounded-lg">Delivery</span>
                ) : (
                  ""
                )}
                {item?.status?.status === "transit to hospital" ? (
                  <button
                    onClick={() => handleShowDone(item.status._id)}
                    className="bg-[#4dcfe0] hover:bg-[#9becf7] pr-2 pl-2 rounded-lg"
                  >
                    Done
                  </button>
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
      {showDone ? (
        <>
          <div className=" overflow-x-hidden m-4  scrollbars fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Done</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-red-600  hover:text-red-400 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowDone(false)}
                  >
                    <span className=" text-red-500  hover:text-red-300  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                {status.map((item) => (
                  <div className="relative p-6 flex-auto" key={item._id}>
                    <form className="w-full" onSubmit={(e) => updateDone(item._id, e)}>
                      <div className="mb-2">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Done by"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="E-mail"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          value={no_hp}
                          onChange={(e) => setNo_hp(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Phone number"
                        />
                      </div>

                      <div className="mb-2">
                        <input
                          type="text"
                          value={heavy}
                          onChange={(e) => setHeavy(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Heavy"
                        />
                      </div>
                      <div className="mb-2">
                        <textarea
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          cols="30"
                          rows="5"
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          placeholder="Notes"
                        ></textarea>
                      </div>
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

export default Permintaan;
