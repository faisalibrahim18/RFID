import React from "react";

const Pagination = ({
  postPerPage,
  totalPosts,
  paginateFront,
  paginate,
  paginateBack,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="py-2">
        <div>
          <p className="text-sm text-gray-700 ">
            Showing
            <span className="font-medium pl-1 pr-1">
              {currentPage * postPerPage - 10}
            </span>
            to
            <span className="font-medium"> {currentPage * postPerPage} </span>
            of
            <span className="font-medium"> {totalPosts} </span>
            results
          </p>
        </div>
        <nav className="block"></nav>
        <div>
          <nav aria-label="Page navigation example">
            <ul className="inline-flex items-center -space-x-px ">
              <li>
                <button
                  onClick={() => {
                    paginateBack();
                  }}
                  disabled={currentPage === 1}
                  className="bg-white border-gray-300 disabled:bg-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-l-lg "
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>

              <li>
                {pageNumbers.map((number) => (
                  <a
                    onClick={() => {
                      paginate(number);
                    }}
                    href="#"
                    className={
                      currentPage === number
                        ? "bg-blue border-red-300 text-red-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    }
                  >
                    {number}
                  </a>
                ))}
              </li>

              <li>
                <button
                  onClick={() => {
                    paginateFront();
                  }}
                  disabled={totalPosts === currentPage}
                  className="bg-white border-gray-300 disabled:bg-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-r-lg  "
                >
                  <span className="sr-only">Next</span>
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Pagination;
