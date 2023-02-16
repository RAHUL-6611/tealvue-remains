import React from 'react'

import IconBox from '../IconBox/IconBox'
import TopCont from '../topcontent/TopCont'

function FirstBar() {
  return (
    <div className="part1 flex justify-between items-center w-full">
      <TopCont />           
      <IconBox />
    </div>
  )
}

export default FirstBar