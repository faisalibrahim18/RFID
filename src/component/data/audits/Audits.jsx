import React from "react";

const Audits = ({ searchResults }) => {
  return (
    <>
      <table className=" w-full ltr:text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="border-b bg-white font-medium ">
          <tr>
            <th scope="col" className="px-6 py-4">
              No
            </th>

            <th scope="col" className="px-6 py-4">
              Tanggal
            </th>
            <th scope="col" className="px-6 py-4">
              Status
            </th>
            <th scope="col" className="px-6 py-4">
              Text
            </th>
            <th scope="col" className="px-6 py-4">
              User
            </th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((item, index) => (
            <tr key={item._id} className="border-b text-center text-gray-600">
              <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.date}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.status}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.task}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.user?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Audits;
