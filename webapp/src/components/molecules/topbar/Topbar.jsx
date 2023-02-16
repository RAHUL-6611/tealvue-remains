import React from 'react'
import FirstBar from '../../atoms/firstbar/FirstBar'
import SecondBar from '../../atoms/secondbar/SecondBar'

function TopNav() {
  return (
    <div className="w-full p-0 m-0">
        <FirstBar />
        <SecondBar />
    </div>
  )
}

export default TopNav