import React, { useEffect, useState } from "react";
import axios from "axios";
import { Switch } from "@headlessui/react";

const Role = () => {
  const [showAdd, setShowAdd] = React.useState(false);
  const [privilege, setPrivilege] = useState([]);
  const [role, setRole] = useState([]);
  const [enabled, setEnabled] = useState([]);
  const [enabledB, setEnabledB] = useState([]);
  const toggleSwitch = (id) => {
    if (enabled.includes(id)) {
      setEnabled(enabled.filter((enabledId) => enabledId !== id));
    } else {
      setEnabled([...enabled, id]);
    }
  };
  const toggleSwitchB = (id) => {
    if (enabledB.includes(id)) {
      setEnabledB(enabledB.filter((enabledId) => enabledId !== id));
    } else {
      setEnabledB([...enabledB, id]);
    }
  };
  useEffect(() => {
    getPrivilege();
  }, []);
  const getPrivilege = async () => {
    // setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:9000/api/v1/rfid//privilege", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data);
      setPrivilege(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRole();
  }, []);
  const getRole = async () => {
    // setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:9000/api/v1/rfid//role", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data);
      setRole(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  // console.log(process.env);
  return (
    <>
      {" "}
      <div className=" p-2">
        <div className="flex flex-wrap flex-row">
          <div className="flex-shrink max-w-full px-4 w-1/2">
            <h1 className="text-3xl font-semibold mt-3 mb-5">Role Management</h1>
          </div>
          <div className="flex w-full mb-5 ml-5 md:ml-auto mr-4 font-semibold justify-between md:w-1/3 md:justify-end">
            <button
              onClick={() => setShowAdd(true)}
              className="bg-[#96CDF4] pl-3 pr-3 mb-2 rounded-md p-2 hover:bg-blue-200"
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap flex-row">
          <div className="flex-shrink max-w-full px-4 w-full">
            <div className="p-6 bg-white  rounded-lg shadow-lg mb-6">
              <div className="overflow-x-auto">
                <table className=" w-full ltr:text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="border-b bg-white font-medium ">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        No
                      </th>

                      <th scope="col" className="px-6 py-4">
                        Nama Kategori
                      </th>

                      <th scope="col" className="px-6 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {role.map((item, index) => (
                      <tr key={item._id} className="border-b text-center text-gray-600">
                        <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>

                        <td className="whitespace-nowrap px-6 py-4">{item.name}</td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <button onClick={() => handleShowEditKategori(item._id)} className="m-3">
                            <i className="fa-solid fa-pen-to-square text-[#96CDF4] hover:text-blue-400"></i>
                          </button>
                          {/* <Link onClick={() => deleteCategory(item._id)}>
                            <i className="fa-solid fa-trash-can text-[#FF1818] hover:text-red-400"></i>
                          </Link> */}
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
      {showAdd ? (
        <>
          <div className=" overflow-x-hidden m-4  scrollbars fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Add Role</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-red-600  hover:text-red-400 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowAdd(false)}
                  >
                    <span className=" text-red-500  hover:text-red-300  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}

                <div className="relative p-6 flex-auto">
                  <form className="w-full">
                    <div className="mb-4">
                      <label for="Nama Kategori" className=" text-sm font-semibold text-gray-800">
                        Nama
                      </label>
                      <input
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Masukan Nama Kategori..."
                      />
                    </div>
                    <div className="flex flex-shrink overflow-auto">
                      <div className=" w-1/2">
                        <div className="font-bold">FrontEnd</div>
                        {privilege.map((item) => (
                          <div className="mb-4 " key={item._id}>
                            <div className="flex flex-shrink">
                              <div className="w-1/2">
                                <label for="Nama Kategori" className=" text-sm font-semibold text-gray-800">
                                  {item.name}
                                </label>
                              </div>
                              <div className="w-1/2 pl-10">
                                <Switch
                                  onClick={() => toggleSwitch(item._id)}
                                  className={`${enabled.includes(item._id) ? "bg-green-400" : "bg-gray-300"}
                                  relative inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                >
                                  <span className="sr-only">Use setting</span>
                                  <span
                                    aria-hidden="true"
                                    className={`${
                                      enabled.includes(item._id)
                                        ? "translate-x-6 pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                                        : "translate-x-0 pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-gray-100 shadow-lg ring-0 transition duration-200 ease-in-out"
                                    }
       `}
                                  />
                                </Switch>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="w-1/2">
                        <div className="font-bold">BackEnd</div>
                        {privilege.map((item) => (
                          <div className="mb-4 " key={item._id}>
                            <div className="flex flex-shrink">
                              <div className="w-1/2">
                                <label for="Nama Kategori" className=" text-sm font-semibold text-gray-800">
                                  {item.name}
                                </label>
                              </div>
                              <div className="pl-10  w-1/2">
                                <Switch
                                  onClick={() => toggleSwitchB(item._id)}
                                  className={`${enabledB.includes(item._id) ? "bg-green-400" : "bg-gray-300"}
                                  relative inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                >
                                  {/* <span className="sr-only">Use setting</span> */}
                                  <span
                                    aria-hidden="true"
                                    className={`${
                                      enabledB.includes(item._id)
                                        ? "translate-x-6 pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                                        : "translate-x-0 pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-gray-100 shadow-lg ring-0 transition duration-200 ease-in-out"
                                    }
       `}
                                  />
                                </Switch>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/*footer*/}
                    <div className="flex justify-center pt-10">
                      <button
                        className="bg-[#A4BC92] text-white active:bg-[#C7E9B0] font-semibold text-sm px-5 py-2 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Save
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

export default Role;
