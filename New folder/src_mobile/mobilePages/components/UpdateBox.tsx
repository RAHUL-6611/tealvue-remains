import React from 'react'

interface updateBoxProps{
    updates: { text: string | undefined }[];
}

const UpdateBox = ({ updates }: updateBoxProps) => {
    
    return (
        <div className="flex overflow-x-scroll gap-4 p-2 w-full no-scrollbar">
            {updates.map((update,i) => {
                return (
                    <div key={i} className="flex py-4 px-6 rounded-md items-center bg-white shadow-xl w-full">
                        <h1 className="float-left p-2 text-3xl">{update.text}</h1>
                        <div>
                            <span className="icon-intersect text-[100px] p-2"></span>
                        </div>
                    </div>
                )
            })}
  </div>
)
}

export default UpdateBox