import React from 'react'
import { AiOutlineSearch } from "react-icons/ai";
const SearchInput = () => {
  return (
    <div className="bg-gray-100 flex items-center px-2 py-2 rounded-md"> 
        <AiOutlineSearch className="text-gray-400 text-xl mx-3"/>
        <input type="text" className="border-none outline-none bg-transparent placeholder:text-gray-400" placeholder="Search"/>
    </div>
  )
}

export default SearchInput