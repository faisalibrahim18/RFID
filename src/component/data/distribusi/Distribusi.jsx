import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Distribusi = ({ distribusi, loading }) => {
  const [showProses, setShowProses] = React.useState(false);
  const [showTransit, setShowTransit] = React.useState(false);
  const [showAcc, setShowAcc] = React.useState(false);
  const [showWash, setShowWash] = React.useState(false);
  const [showDry, setShowDry] = React.useState(false);
  const [showDone, setShowDone] = React.useState(false);

  const [file, setFile] = useState("");
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [license, setLicense] = useState("");
  const [amount, setAmount] = useState("");
  const [heavy, setHeavy] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  if (loading) {
    return <h2>Loading...</h2>;
  }

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
            window.location.reload();
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

  //Checkin
  const handleShowCheck = async (id) => {
    setShowProses(id, true);
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
        // setMsg(error.response.data.);
      }
    }
  };
  useEffect(() => {
    handleShowCheck();
  }, [id]);
  const setShowProses1 = async (id, e) => {
    // console.log(id);
    e.preventDefault();
    try {
      if (file) {
        console.log("file", file);
        console.log("name", name);
        console.log("email", email);
        console.log("no_hp", no_hp);
        console.log("heavy", heavy);
        console.log("note", note);
      }

      const formData = new FormData();
      formData.append("check", file);
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
        .put(`http://localhost:9000/api/v1/rfid/tracker/checking/64803c06f7993415b9637404`, formData, config)
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            text: data.message,
          });
        });
      console.log(response);
      navigate("/inventory");
    } catch (error) {
      if (error.response) {
        Swal.fire({
          text: error.response.data.message,
          icon: "error",
        });
        // console.log(error.response.data.message);
        // setMsg(error.response.data.msg);
      } else {
        // console.log(error.response.message);
        Swal.fire({
          text: error.data.message,
          icon: "error",
        });
      }
    }
  };
  // const setShowProses1 = async (id, e) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios
  //       .put(
  //         `http://localhost:9000/api/v1/rfid/tracker/checking/${id}`,

  //         {

  //             name: name,
  //             email: email,
  //             no_hp: no_hp,
  //             amount: amount,
  //             heavy: heavy,
  //             note: note,
  //           check:
  //         },

  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         },
  //       )
  //       .then(({ data }) => {
  //         Swal.fire({
  //           icon: "success",
  //           text: data.msg,
  //         });
  //       });

  //     navigate("/distribusi");
  //     e.preventDefault();
  //   } catch (error) {
  //     if (error.response) {
  //       console.log(error.response.data);
  //     } else {
  //       console.log(error.data);
  //     }
  //   }
  // };

  //Transit
  useEffect(() => {
    handleShowTransit();
  }, [id]);
  const handleShowTransit = async (id) => {
    setShowTransit(id, true);
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
        // setMsg(error.response.data.);
      }
    }
  };
  const updateTransit = async (id, e) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios
        .put(
          `http://localhost:9000/api/v1/rfid/tracker/transit/${id}`,

          {
            transit: {
              name: name,
              email: email,
              no_hp: no_hp,
              vehicle: vehicle,
              license: license,
              amount: amount,
              heavy: heavy,
              note: note,
            },
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
            text: data.msg,
          });
        });

      navigate("/distribusi");
      e.preventDefault();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error.data);
      }
    }
  };

  //Accepted
  useEffect(() => {
    handleShowAcc();
  }, [id]);
  const handleShowAcc = async (id) => {
    setShowAcc(id, true);
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
        // setMsg(error.response.data.);
      }
    }
  };
  const updateAcc = async (id, e) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios
        .put(
          `http://localhost:9000/api/v1/rfid/tracker/accepted/${id}`,

          {
            accepted: {
              name: name,
              email: email,
              no_hp: no_hp,
              amount: amount,
              heavy: heavy,
              note: note,
            },
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
            text: data.msg,
          });
        });

      navigate("/distribusi");
      e.preventDefault();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error.data);
      }
    }
  };

  //Wash
  useEffect(() => {
    handleShowWash();
  }, [id]);
  const handleShowWash = async (id) => {
    setShowWash(id, true);
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
  const updateWash = async (id, e) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios
        .put(
          `http://localhost:9000/api/v1/rfid/tracker/wash/${id}`,

          {
            wash: {
              name: name,
              email: email,
              no_hp: no_hp,
              amount: amount,
              heavy: heavy,
              note: note,
            },
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
            text: data.msg,
          });
        });

      navigate("/distribusi");
      e.preventDefault();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error.data);
      }
    }
  };

  //Dry
  useEffect(() => {
    handleShowDry();
  }, [id]);
  const handleShowDry = async (id) => {
    setShowDry(id, true);
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
  const updateDry = async (id, e) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios
        .put(
          `http://localhost:9000/api/v1/rfid/tracker/dry/${id}`,

          {
            dry: {
              name: name,
              email: email,
              no_hp: no_hp,
              amount: amount,
              heavy: heavy,
              note: note,
            },
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
            text: data.msg,
          });
        });

      navigate("/distribusi");
      e.preventDefault();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error.data);
      }
    }
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
        // setMsg(error.response.data.);
      }
    }
  };
  const updateDone = async (id, e) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios
        .put(
          `http://localhost:9000/api/v1/rfid/tracker/done/${id}`,

          {
            done: {
              name: name,
              email: email,
              no_hp: no_hp,
              amount: amount,
              heavy: heavy,
              note: note,
            },
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
            text: data.msg,
          });
        });

      navigate("/distribusi");
      e.preventDefault();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        // setMsg(error.response.data.msg);
      } else {
        console.log(error.data);
      }
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
              Action
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
              <td className="whitespace-nowrap px-6 py-4">{item.linen.epc}</td>
              <td className="whitespace-nowrap px-6 py-4">
                {item.quality === "baik" ? <span>Baik</span> : ""}
                {item.quality === "kurang baik" ? <span>Kurang Baik</span> : ""}
              </td>
              <td className="whitespace-nowrap px-6 py-4">{item.category.name}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.amount}</td>
              <td className="whitespace-nowrap px-6 py-4">
                {item.service === "cuci" ? <span>cuci</span> : ""}
                {item.service === "wash" ? <span>Wash</span> : ""}
                {item.service === "setrika" ? <span>Setrika</span> : ""}
              </td>

              <td className="whitespace-nowrap px-6 py-4">
                <Link to={`/distribusi/edit/${item._id}`} className=" m-3 ">
                  <i className="fa-solid fa-pen-to-square text-[#96CDF4] hover:text-blue-400"></i>
                </Link>
                <Link onClick={() => deleteDistribusi(item._id)}>
                  <i className="fa-solid fa-trash-can text-[#FF1818] hover:text-red-400"></i>
                </Link>
              </td>
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
                  <button
                    onClick={() => handleShowCheck(item.status._id)}
                    className="bg-[#96CDF4] hover:bg-[#a4d1f1] pr-2 pl-2 rounded-lg"
                  >
                    CheckIn
                  </button>
                ) : (
                  ""
                )}
                {item?.status?.status === "checking" ? (
                  <button
                    onClick={() => handleShowTransit(item.status._id)}
                    className="bg-[#FEBF00] hover:bg-[#f8db84] pr-2 pl-2 rounded-lg"
                  >
                    Transit
                  </button>
                ) : (
                  ""
                )}
                {item?.status?.status === "transit" ? (
                  <button
                    onClick={() => handleShowAcc(item.status._id)}
                    className="bg-[#5eebc7] hover:bg-[#93f1da] pr-2 pl-2 rounded-lg"
                  >
                    Accepted
                  </button>
                ) : (
                  ""
                )}
                {item?.status?.status === "accepted" ? (
                  <button
                    onClick={() => handleShowWash(item.status._id)}
                    className="bg-[#65a0f8] hover:bg-[#7eabee] pr-2 pl-2 rounded-lg"
                  >
                    Wash
                  </button>
                ) : (
                  ""
                )}
                {item?.status?.status === "washing" ? (
                  <button
                    onClick={() => handleShowDry(item.status._id)}
                    className="bg-[#82f865] hover:bg-[#a2ee8f] pr-2 pl-2 rounded-lg"
                  >
                    Dry
                  </button>
                ) : (
                  ""
                )}
                {item?.status?.status === "drying" ? (
                  <button
                    onClick={() => handleShowDone(item.status._id)}
                    className="bg-[#54e2f5] hover:bg-[#9becf7] pr-2 pl-2 rounded-lg"
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

      {showProses ? (
        <>
          <div className=" overflow-x-hidden m-4  scrollbars fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    CheckIn <input type="text" />
                  </h3>
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
                {status.map((item) => (
                  <div className="relative p-6 flex-auto" key={item._id}>
                    <form className="w-full" onSubmit={() => setShowProses1(item._id)}>
                      <div className="mb-2">
                        <input
                          type="text"
                          value={name}
                          // onChange={(e) => setStatus(e.target.value)}
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Checked by"
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
                      {/* <div className="mb-2">
                        <input
                          type="text"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Amount"
                        />
                      </div> */}
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
                          value={file}
                          // onChange={(e) => setStatus(e.target.value)}
                          onChange={(e) => setFile(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Checked by"
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
      {showTransit ? (
        <>
          <div className=" overflow-x-hidden m-4  scrollbars fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    Transit <input type="text" />
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-red-600  hover:text-red-400 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowTransit(false)}
                  >
                    <span className=" text-red-500  hover:text-red-300  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                {status.map((item) => (
                  <div className="relative p-6 flex-auto" key={item._id}>
                    <form className="w-full" onSubmit={() => updateTransit(item._id)}>
                      <div className="mb-2">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Driver name"
                        />
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="md:w-1/2 md:mb-2  w-full">
                          <div className="mb-2">
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                              placeholder="Email"
                            />
                          </div>
                        </div>
                        <div className=" md:w-1/2  lg:pl-3 md:pl-3  w-full">
                          {" "}
                          <div className="mb-2">
                            <input
                              type="text"
                              value={no_hp}
                              onChange={(e) => setNo_hp(e.target.value)}
                              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                              placeholder="Phone number"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="md:w-1/2 md:mb-2  w-full">
                          <div className="mb-2">
                            <select
                              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                              value={vehicle}
                              onChange={(e) => setVehicle(e.target.value)}
                            >
                              <option selected>Vehicle type : </option>

                              <option value="car">Car</option>
                              <option value="motorcycle">Motorcycle</option>
                            </select>
                          </div>
                        </div>
                        <div className=" md:w-1/2  lg:pl-3 md:pl-3  w-full">
                          {" "}
                          <div className="mb-2">
                            <input
                              type="text"
                              value={license}
                              onChange={(e) => setLicense(e.target.value)}
                              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                              placeholder="License plate"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mb-2">
                        <input
                          type="text"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Amount"
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
      {showAcc ? (
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
                    onClick={() => setShowAcc(false)}
                  >
                    <span className=" text-red-500  hover:text-red-300  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                {status.map((item) => (
                  <div className="relative p-6 flex-auto" key={item._id}>
                    <form className="w-full" onSubmit={() => updateAcc(item._id)}>
                      <div className="mb-2">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Received by"
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
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Amount"
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
      {showWash ? (
        <>
          <div className=" overflow-x-hidden m-4  scrollbars fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Wash</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-red-600  hover:text-red-400 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowWash(false)}
                  >
                    <span className=" text-red-500  hover:text-red-300  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                {status.map((item) => (
                  <div className="relative p-6 flex-auto" key={item._id}>
                    <form className="w-full" onSubmit={() => updateWash(item._id)}>
                      <div className="mb-2">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Washed by"
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
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Amount"
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
      {showDry ? (
        <>
          <div className=" overflow-x-hidden m-4  scrollbars fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Dry</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-red-600  hover:text-red-400 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowDry(false)}
                  >
                    <span className=" text-red-500  hover:text-red-300  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                {status.map((item) => (
                  <div className="relative p-6 flex-auto" key={item._id}>
                    <form className="w-full" onSubmit={() => updateDry(item._id)}>
                      <div className="mb-2">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Dried by"
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
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Amount"
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
                    <form className="w-full" onSubmit={() => updateDone(item._id)}>
                      <div className="mb-2">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Confirmed by"
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
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Amount"
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

export default Distribusi;