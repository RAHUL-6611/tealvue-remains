import React from 'react'
import { useHistory } from "react-router-dom"

const BottomNav = () => {
  const history = useHistory();

  return (
    <div className="flex px-2 py-6 rounded-tl-lg rounded-tr-lg w-[98%] bg-white justify-evenly max-h-screen fixed bottom-0">
      <span className="text-2xl icon-home text-gray-800" onClick={()=> history.push("/Dashboard")}></span>
      <span className="text-2xl icon-bell-outline text-gray-800"></span>
      <span className="text-2xl icon-learning text-gray-800"></span>
      <span className="text-2xl icon-user text-gray-800"></span>
    </div>
  );
}

export default BottomNav