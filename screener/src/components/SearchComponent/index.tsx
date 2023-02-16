import React from 'react'
import { Link } from "react-router-dom";
const Search = () => {
  return (
    <div className="search flex flex-col gap-2">
        <h1 className="text-left font-semibold text-xl text-gray-500"> Search any stock</h1>
        <div className="input text-black" >

        <input type="text"  className="w-full p-2 rounded-md text-black hover:bg-cyan-100 border-2 hover:placeholder:hidden border-gray-400 outline-none" placeholder="Search any Stock to research for free.."/>
        </div>
        <div className="flex w-full gap-4 justify-center items-center">
            <pre className="text-sm text-gray-400 flex py-2">Popular Stocks </pre>
            <div className="text-cyan-400 flex gap-4 py-2">
                 <Link to={"/Apple"}>Apple</Link>
                 <Link to={"/Tesla"}>Tesla</Link>
                 <Link to={"/Meta"}>Meta</Link>
                 <Link to={"/Alphabet"}>Alphabet</Link>
            
            {/* <span>Tesla</span>
            <span>Amazon</span>
            <span>Meta</span>
            <span>Alphabet</span> */}
            </div>
        </div>
    </div>
  )
}

export default Search