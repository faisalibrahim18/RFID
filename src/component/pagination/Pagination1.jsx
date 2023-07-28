import React, { useState } from 'react';

const Pagination1 = ({ currentPage, totalPages, onPageChange }) => {
  const [minPage, setMinPage] = useState(1);
  const [maxPage, setMaxPage] = useState(5); // Adjust the value as needed

  // Helper function to generate an array of page numbers between min and max (inclusive)
  const generatePageNumbers = () => {
    const pages = [];
    for (let i = minPage; i <= maxPage && i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="pagination flex justify-center mt-4">
      <button
        className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-md disabled:bg-gray-300"
        disabled={currentPage === 1}
        onClick={() => {
          onPageChange(currentPage - 1);
          if (currentPage === minPage) {
            setMinPage((prevMinPage) => Math.max(prevMinPage - 1, 1));
            setMaxPage((prevMaxPage) => Math.max(prevMaxPage - 1, 5));
          }
        }}
      >
        Previous
      </button>
      {generatePageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          className={`px-4 py-2 mx-1 text-white ${
            pageNumber === currentPage
              ? 'bg-blue-500'
              : 'bg-gray-500 hover:bg-blue-600'
          } rounded-md`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-md disabled:bg-gray-300"
        disabled={currentPage === totalPages}
        onClick={() => {
          onPageChange(currentPage + 1);
          if (currentPage === maxPage) {
            setMinPage((prevMinPage) => prevMinPage + 1);
            setMaxPage((prevMaxPage) => prevMaxPage + 1);
          }
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination1;