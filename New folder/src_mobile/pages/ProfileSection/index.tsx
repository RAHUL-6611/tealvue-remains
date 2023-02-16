import React from 'react'
import { Layout } from 'components';
// import TopNavigation from '../../components/Navigation/TopNavigation';


const Profile = () => {
  return (
      <Layout>
        {/* <TopNavigation/> */}
    <div className="flex w-full gap-6 p-6">
        <div className="flex flex-col lg:flex-[0.7] gap-6">
            <div className="flex shadow-md gap-6 p-6">
                        <div className="avatar">
                            <img  
                             className=" rounded-full"
                             src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=280&q=80" alt="" />
                        </div>
                        <div className="details p-2 py-6 flex flex-col w-full">
                            <div className="flex flex-1 justify-between">
                                <div className="user_name text-3xl py-2">GuruMoorthy</div>
                                <div className="flex gap-4">
                                    <span className="icon-user"></span>
                                    <span className="icon-user"></span>
                                    <span className="icon-user"></span>
                                </div>
                            </div>
                            <div className="pro flex">
                                <p className="bg-gray-200 p-2 rounded-xl text-teal-500 font-bold">
                                    Pro Account
                                    </p> 
                                </div>
                                <div className="address py-2">
                                    <p>Chennai - TamilNadu</p>
                                </div>
                                <div className="contact flex lg:gap-16 ">
                                    <p className="flex gap-2 items-center">
                                        <span className="icon-advice"></span>
                                        <span> Guru@tealvue.com</span>
                                    </p>
                                    <p className="flex gap-2 items-center">
                                        <span className="icon-advice">
                                        </span>
                                        <span>
                                            +01245676543
                                        </span>
                                    </p>
                                    <p className="flex gap-2 items-center">
                                        <span className="icon-advice"></span>
                                        <span>Share</span>
                                    </p>

                                </div>
                        </div>
            </div>
            <div className="flex gap-6">
                
                <div className="account p-4 shadow-lg rounded-xl">
                    <div className="flex flex-col">
                        <p className="text-white bg-teal-700 p-4 w-fit rounded-xl">Tealvue Account</p>
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between pt-6">
                                <p>Options</p>
                                <p><span className="icon-dots-three"></span></p>
                            </div>
                            <OptionComponent option="Compare Plans" icon="Settings"/>
                            <OptionComponent option="Reports" icon="settings"/>
                            <OptionComponent option="Settings" icon="settings"/>
                            <OptionComponent option="Reports" icon="settings"/>
                            <OptionComponent option="Log out" icon="settings"/>
                            <OptionComponent option="Notice" icon="settings"/>
                            <OptionComponent option="Privacy Policy" icon="settings"/>
                            <OptionComponent option="Terms & Condition" icon="settings"/>
                            <OptionComponent option="Contact Info" icon="settings"/>

                        </div>
                    </div>
                </div>
    <div className="flex flex-wrap justify-start h-fit">

                <div className="shadow-md py-4 px-2 px-8 rounded-xl h-fit">
                    <h1>Guru 999</h1>
                    <p>pro plan</p>
                </div>
                <div className="shadow-md p-4 px-8 rounded-xl  h-fit">
                    <h1>Guru 999</h1>
                    <p>pro plan</p>
                </div>
                <div className="shadow-md p-4 px-8 rounded-xl  h-fit">
                    <h1>Guru 999</h1>
                    <p>pro plan</p>
                </div>
                <div className="shadow-md p-4 px-8 rounded-xl  h-fit">
                    <h1>Guru 999</h1>
                    <p>pro plan</p>
                </div>
                <div className="shadow-md p-4 px-8 rounded-xl  h-fit">
                    <h1>Guru 999</h1>
                    <p>pro plan</p>
                </div>
    </div>
            </div>
        </div>
        <div className="flex h-full w-full lg:flex-[0.3] flex-col gap-6">
                <div className="p-4 flex-col shadow-md">
                <div className="flex p-2 justify-between w-full">
                    <p>Newest (4)</p>
                    <p><span className="icon-dots-three rotate-90"></span></p> 
                </div>
                <div className="flex flex-col gap-2">
                <MessageComponent/>
                <MessageComponent/>
                {/* <MessageComponent/> */}
                </div>
                </div>

                <div className="advertisement p-6 bg-teal-400 rounded-lg">
                    <div className="bg-white p-4 w-fit rounded-full ml-6">
                    <img 
                    className="rounded-full"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=80&q=80" alt="" />
                    </div>
                    <div>
                        <p className="text-white px-4 py-4">
                            lorem ipsum dolor sit amet, con
                            lorem ipsum dolor sit amet, con
                            lorem ipsum dolor
                        </p>
                        <p className="text-xs px-4 py-2 text-white font-light">
                            lorem ipsum dolor sit amet, con
                            lorem ipsum dolor sit amet, con
                            lorem ipsum dolor sit amet, con
                            lorem ipsu
                        </p>
                        <p className="bg-white text-teal-500 p-2 w-fit rounded-xl ml-4 font-semibold">Learn More</p>
                    </div>
                </div>
        </div>
    </div>
      </Layout>

  )
}

export default Profile

const MessageComponent = ()=>{

    return (
        <div className="border-2 border-gray-200 rounded-lg px-2 py-4 flex gap-2">
        <div>
            <span className="w-2 h-2  rounded-full text-teal-500 text-3xl">
                •
            </span> 
            </div>
        <div>
            <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adip</p>
            <div className="flex justify-between items-center">
                <div className="time">
                        <p className="text-sm text-gray-400">24m ago</p>
                </div>
                <div>
                    <p className="text-teal-400 font-semibold text-sm">Mark as read</p>
                </div>
            </div>
        </div>
        </div>
    )
}



const OptionComponent = ({option,icon}:{option:string,icon:string})=>{

    return (
         <div className="flex gap-4">
            <p><span className={`icon-${icon}`}></span></p>
            <p>{option}</p>
        </div>
    )
}