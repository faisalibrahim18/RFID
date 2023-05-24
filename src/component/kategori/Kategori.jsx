import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Kategori = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    getCategory();
  }, []);
  const getCategory = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:9000/api/v1/rfid/category", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data);
    setCategory(response.data.data);
  };
  const deleteCategory = async (CategoryId) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
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
    await axios
      .delete(`http://localhost:9000/api/v1/rfid/category/${CategoryId}`, {
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
        getCategory();
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };
  return (
    <>
      <div className=" p-2">
        <div className="flex flex-wrap flex-row">
          <div className="flex-shrink max-w-full px-4 w-1/2">
            <h1 className="text-3xl font-semibold mt-3 mb-5">Kategori List</h1>
          </div>
          <div className="flex w-full mb-5 ml-5 md:ml-auto mr-4 font-semibold justify-between md:w-1/3 md:justify-end">
            <Link
              to={"/kategori/add"}
              className="bg-[#96CDF4] mb-2 pl-3 pr-3 rounded-md p-2 hover:bg-blue-200"
            >
              Add Kategori
            </Link>
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
                      <th className="td-head">Kode Kategori</th>
                      <th className="td-head">Nama Kategori</th>
                      <th className="td-head">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.map((item, index) => (
                      <tr key={item._id}>
                        <td class="td-class">{index + 1}</td>
                        <td class="td-class">{item.kode}</td>
                        <td class="td-class">{item.name}</td>
                        <td class="td-class">
                          <Link
                            to={`/kategori/edit/${item._id}`}
                            className="bg-[#96CDF4] pl-3 pr-3 rounded-md p-2 hover:bg-blue-400 m-3 text-white"
                          >
                            Edit
                          </Link>
                          <Link
                            onClick={() => deleteCategory(item._id)}
                            className="bg-[#FF1818] pl-3 pr-3 rounded-md p-2 text-white hover:bg-red-600"
                          >
                            Hapus
                          </Link>
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
    </>
  );
};

export default Kategori;
