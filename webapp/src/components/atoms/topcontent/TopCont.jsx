import React from 'react'

import { RiArrowDownSLine } from "react-icons/ri"

function TopCont() {
  return (
    <div className='border-r-2 border-gray-400 w-48 m-6 mr-9'>
      <div className='text-gray-400 w-30 flex items-center text-md px-2 tracking-wide'>Nifty 50 <div className='text-xl ml-3'><RiArrowDownSLine/></div></div>
      <div className='flex items-center my-1'>
          <div className='sm:text-md px-2 text-sm'>16,658.40</div>
          <div className='flex px-2 text-green-500 text-[13px]'>
              <span>410.45</span>
              <span>(<span>2.53</span>%)</span>
          </div>
      </div>
    </div>
  )
}

export default TopCont