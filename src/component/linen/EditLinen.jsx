import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditLinen = () => {
  const [name, setName] = useState("");
  const [message, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const getLinenById = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:9000/api/v1/rfid/linen/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response);

        setName(response.data.data.name);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getLinenById();
  }, [id]);

  const updateLinen = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios
        .put(
          `http://localhost:9000/api/v1/rfid/linen/${id}`,
          {
            name: name,
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
      navigate("/linen");
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
  return (
    <div className="p-7 ">
      {/* Title */}
      <div className="lg:flex lg:flex-wrap  pb-6">
        <div className="  text-3xl font-semibold  ">
          <h1>Add Linen</h1>
        </div>

        <div className="flex w-full pt-1 content-center justify-between md:w-1/2 md:justify-end"></div>
      </div>

      <div className="container mx-auto w-96 bg-white rounded-md p-10 shadow-md">
        {Object.keys(message).length > 0 && (
          <p className="alert alert-danger rounded text-center p-2 shadow m-3">{message}</p>
        )}
        <form className="" onSubmit={updateLinen}>
          <div className="mb-2">
            <label for="Nama Linen" className=" text-sm font-semibold text-gray-800">
              Nama Linen
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Masukan Nama Linen..."
            />
          </div>

          <div className="mt-6 flex ">
            <Link
              to={"/linen"}
              className=" bg-transparent mr-2 w-1/2  border text-center py-2 px-2 pl-5 pr-5 border-black hover:border-transparent text-black hover:text-white rounded-md hover:bg-blue-950"
            >
              Back
            </Link>
            <button className="color w-1/2 px-2 py-0 tracking-wide text-white transition-colors duration-200 transform bg-blue-950 rounded-md hover:bg-blue-900 focus:outline-none focus:bg-blue-500">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLinen;
