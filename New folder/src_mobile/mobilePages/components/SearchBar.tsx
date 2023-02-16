import React from 'react'

const SearchBar = () => {
  return (
    <div className="bg-white py-4 px-4 w-full rounded-lg flex items-center relative">
      <span className="icon-search px-2 text-gray-600 text-xl"></span>
      <input type="absolute w-full h-full border-0 outline-0 text-xl" placeholder="Search Settings" />
    </div>
  );
}

export default SearchBar