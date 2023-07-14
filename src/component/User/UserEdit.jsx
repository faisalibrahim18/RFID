import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UserEdit = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [number_phone, Setnumber_phone] = useState("");
  const [role, setRole] = useState("");
  const [message, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [datarole, SetDataRole] = useState([]);

  useEffect(() => {
    const getRole = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:9000/api/v1/rfid/role",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response);
        SetDataRole(response.data.data);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getRole();
  }, []);

  useEffect(() => {
    const getUserById = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:9000/api/v1/rfid/user/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data.data.role.name);

        setName(response.data.data.name);
        setUsername(response.data.data.username);
        // setPassword(response.data.data.password);
        // setConfpassword(response.data.data.confPassword);
        setEmail(response.data.data.email);
        Setnumber_phone(response.data.data.number_phone);
        setRole(response.data.data.role._id);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios
        .put(
          `http://localhost:9000/api/v1/rfid/user/${id}`,
          {
            name: name,
            username: username,
            password: password,
            confirmPassword: confirmPassword,
            email: email,
            number_phone: number_phone,
            role: role,
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
      navigate("/users");
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
    <>
      <div className="p-6">
        {/* Title */}
        <div className="lg:flex lg:flex-wrap pb-6">
          <div className=" lg:w-1/2 text-3xl font-semibold  ">
            <h1>Edit User</h1>
          </div>

          <div className="flex w-full pt-1 content-center justify-between md:w-1/2 md:justify-end"></div>
        </div>

        <div className="container mx-auto bg-white rounded-md  p-10 shadow-md">
          {Object.keys(message).length > 0 && (
            <div className="font-semibold">
              <p className="bg-red-200 uppercase opacity-75 font-sans  text-red-500 rounded text-center p-2 m-3">
                {message}
              </p>
            </div>
          )}
          <form className="w-full" onSubmit={updateUser}>
            <div className="mb-2">
              <label
                for="nama"
                className=" text-sm font-semibold text-gray-800"
              >
                Nama
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Masukan Nama..."
              />
            </div>
            <div className="mb-2">
              <label
                for="username"
                className="block text-sm font-semibold text-gray-800"
              >
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="masukan Username..."
              />
            </div>
            <div className="flex flex-wrap ">
              <div className="md:w-1/2  md:mb-2  w-full">
                <div className="mb-2">
                  <label
                    for="password"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="*********"
                  />
                </div>
              </div>
              <div className=" md:w-1/2  lg:pl-3 md:pl-3  w-full">
                {" "}
                <div className="mb-2">
                  <label
                    for="confrim_password"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Confrim Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="*********"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="md:w-1/2   w-full">
                <div className="mb-2">
                  <label
                    for="email"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>
              <div className=" md:w-1/2 lg:pl-3 md:pl-3  w-full">
                {" "}
                <div className="mb-2">
                  <label
                    for="no_handphone"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    No Handphone
                  </label>
                  <input
                    type="text"
                    value={number_phone}
                    onChange={(e) => Setnumber_phone(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Masukan No Handphone..."
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="md:w-1/2   w-full">
                <div className="mb-2">
                  <label
                    for="email"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Pilih Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="block w-full px-2 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  >
                    {/* <option>Pilih Role :</option> */}

                    {datarole.map((i) => (
                      <option value={i._id}>{i.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className=" md:w-1/2 lg:pl-3 md:pl-3  w-full">
                {" "}
                <div className="mt-6 flex ">
                  <Link
                    to={"/users"}
                    className=" bg-transparent mr-2 w-1/2  border text-center py-2 px-2 pl-5 pr-5 border-black hover:border-transparent text-black hover:text-white rounded-md hover:bg-blue-950"
                  >
                    Back
                  </Link>
                  <button className="color w-1/2 px-2 py-0 tracking-wide text-white transition-colors duration-200 transform bg-blue-950 rounded-md hover:bg-blue-900 focus:outline-none focus:bg-blue-500">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserEdit;
