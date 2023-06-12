import React from "react";

const SearchLinen = ({ linen, setSearchResults }) => {
  const handleSubmit = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResults(linen);

    const resultsArray = linen.filter(
      (item) => item.epc.includes(e.target.value) || item.category.name.includes(e.target.value),
    );

    setSearchResults(resultsArray);
  };

  return (
    <div className="flex justify-end">
      {" "}
      <form className="max-w-sm px-4" onSubmit={handleSubmit}>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            onChange={handleSearchChange}
            placeholder="Search"
            className="w-full py-3 pl-12 pr-4 text-gray-400 border rounded-full outline-none bg-gray-50 focus:bg-white focus:border-blue-100"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchLinen;
