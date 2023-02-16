import React from 'react'
import SearchComponent from "../SearchComponent"
import mainPageSvg from "../../assets/main.jpeg"

const Mainpage = () => {
  return (
    <div> 
      <div className="justify-center items-center gap-0 ">
      <div className="flex flex-row pl-40 w-full">
        <div className="w-full flex flex-col justify-center gap-4">
        <h1 className="font-bold text-5xl text-left leading-15">Make <span className="text-cyan-400"> confident  </span> 
          investment  decisions</h1>
          <p className="text-gray-800 font-semibold text-md text-left ">
            Unique, exhaustive analysis on every listed stock  worldwide at your fingertips. Save countless hours trawling  through reports and remove emotion from your decisions.
          </p>

          <SearchComponent />
        </div>
      <img src={mainPageSvg} alt=""  className="w-full"/>
        </div>
      {/* <div className="relative w-full h-screen overflow-hidden flex-2 -right-60">
      </div> */}
      </div>
      </div>
  )
}

export default Mainpage