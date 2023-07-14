import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";
import Loading from "../Spinners/Loading";
import Invoice1 from "../data/Invoice/Invoice";
import Price1 from "../data/price/Price";
import SearchPrice from "../search/SearchPrice";
import SearchInvoice from "../search/SearchInvoice";

const Invoice = () => {
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState([]);
  const [price, setPrice] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResults2, setSearchResults2] = useState([]);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  const [openTab, setOpenTab] = useState(1);

  useEffect(() => {
    getPrice();
  }, []);
  const getPrice = async () => {
    setLoading(true);
    const API_URL = import.meta.env.VITE_API_KEY;
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/api/v1/rfid/price`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data);
    setPrice(response.data.data);
    setSearchResults2(response.data.data);
    setLoading(false);
  };
  useEffect(() => {
    getInvoice();
  }, []);
  const getInvoice = async () => {
    setLoading(true);
    const API_URL = import.meta.env.VITE_API_KEY;
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/api/v1/rfid/invoice`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data);
    setInvoice(response.data.data);
    setSearchResults(response.data.data);
    setLoading(false);
  };

  // Get current posts
  const indexOfLastPost2 = currentPage2 * postPerPage;
  const indexOfFirstPost2 = indexOfLastPost2 - postPerPage2;
  const currentPost2 = searchResults2.slice(
    indexOfFirstPost2,
    indexOfLastPost2
  );

  // Change page
  const paginateFront2 = () => setCurrentPage2(currentPage2 + 1);
  const paginateBack2 = () => setCurrentPage2(currentPage2 - 1);

  const paginate2 = (pageNumber) => setCurrentPage2(pageNumber);
  // Get current posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = searchResults.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className=" p-2">
        <div className="flex flex-wrap flex-row">
          <div className="flex-shrink max-w-full px-4 w-1/2">
            <h1 className="text-3xl font-semibold mt-3 mb-5">Invoice</h1>
          </div>
          <div className="flex w-full mb-5 ml-5 md:ml-auto mr-4 font-semibold justify-between md:w-1/3 md:justify-end"></div>
        </div>

        <div className="flex flex-wrap flex-row">
          <div className="flex-shrink max-w-full px-4 w-full">
            <div className="p-6 bg-white  rounded-lg shadow-lg mb-6">
              <div>
                <ul className="flex ">
                  <li>
                    <a
                      href="#"
                      onClick={() => setOpenTab(1)}
                      className={` ${
                        openTab === 1
                          ? "border-b-4 border-green-200 text-black"
                          : ""
                      } inline-block px-4 py-2 text-gray-600 hover:border-b-4 border-green-200 `}
                    >
                      Invoice
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={() => setOpenTab(2)}
                      className={` ${
                        openTab === 2 ? "border-b-4 border-green-200" : ""
                      } inline-block px-4 py-2 text-gray-600 hover:border-b-4 border-green-200`}
                    >
                      price
                    </a>
                  </li>
                </ul>
              </div>
              <div className={openTab === 1 ? "block" : "hidden"}>
                <SearchInvoice
                  invoice={invoice}
                  setSearchResults={setSearchResults}
                />
                {loading ? (
                  <Loading />
                ) : (
                  <div className="overflow-x-auto">
                    <Invoice1 searchResults={currentPost} />
                    <Pagination
                      postPerPage={postPerPage}
                      totalPosts={invoice.length}
                      paginateBack={paginateBack}
                      paginate={paginate}
                      paginateFront={paginateFront}
                      currentPage={currentPage}
                    />
                  </div>
                )}
              </div>
              <div className={openTab === 2 ? "block" : "hidden"}>
                <SearchPrice
                  price={price}
                  setSearchResults2={setSearchResults2}
                />
                {loading ? (
                  <Loading />
                ) : (
                  <div className="overflow-x-auto">
                    <Price1 searchResults2={currentPost2} />
                    <Pagination
                      postPerPage={postPerPage2}
                      totalPosts={price.length}
                      paginateBack={paginateBack2}
                      paginate={paginate}
                      paginateFront={paginateFront2}
                      currentPage={currentPage}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
