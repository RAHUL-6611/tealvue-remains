import React from 'react'

const entries = [
  " Peer comparison",
        " Quarterly Results",
        " Profit & Loss",
        " Balance Sheet",
        " Cash Flows",
        " Ratios",
        " Shareholding Pattern",
]
const SideNav = () => {
  return (
    <div className="flex flex-col m-6 mx-16 ml-0 p-6 gap-4 bg-white rounded-md min-w-full">
        <h1 className="font-semibold text-gray-600">Company Overview</h1>
       {entries.map((entry,i)=>(
         <p className=" hover:underline" key={entry+i}>{i+1}.{entry}</p>
       ))
}
    </div>
  )
}

export default SideNav