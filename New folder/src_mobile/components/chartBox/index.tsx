import React from 'react'

interface ChartboxOption {
  data : {
    title : string;
    value : string;
  };
//   children? : React.ReactNode
}

const Chartboxes = ({data}:ChartboxOption) => {
  return (
    <>
    <div className="flex flex-row w-full justify-between">
      <div className=" flex-1 w-full">
        <h1>{data.title}</h1>
        <p className="md:w-[70%]">{data.value}</p>
      </div>
      <div className="flex justify-end item-center h-full">
        <p className="bg-gray-200 rounded-full w-[30px] h-[30px] flex justify-center item-center text-black">&#8594;</p>
      </div>
    </div>
    </>
  )
}

export default Chartboxes



