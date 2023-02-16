import DateComp from '../Date/DateComp'

import { AiOutlineHome } from "react-icons/ai"

function SecondBar() {
  return (
    <div className='flex justify-between w-full'>
        <div className='flex items-center px-3'>
            <div className='text-2xl mx-3'>Options</div>
            <div className='flex items-center text-gray-400 mx-3 text-sm mt-2'><AiOutlineHome /><span className='hidden sm:block'> . Dashboard</span></div>
        </div>
        <div className='flex justify-between'>
           <DateComp value={0} />
           <DateComp value={1} />
        </div>
    </div>
  )
}

export default SecondBar