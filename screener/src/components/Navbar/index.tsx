import React from 'react'
import svg from "../../assets/sws-logo.svg"

const index = () => {
  return (
    <div>
        <div className="flex justify-between items-center px-40">
                <div className="flex items-center gap-4">
                <div className="icon">
                  <img src={svg} alt="" className="w-full h-10 m-4"/>
                </div>
                <ul className="options flex gap-4 pl-8">
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Plans</li>
                    <li>Careers</li>
                </ul>
                </div>

                <div className="auth flex items-center gap-4">
                    <p className="register bg-white px-4 py-2 border-gray-300 border-2 rounded-md">Register for a Free Plan</p>
                    <p className="login">Login</p>
                </div>

        </div>
    </div>
  )
}

export default index