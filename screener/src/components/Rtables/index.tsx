import React from 'react'
import Tables from "./RTables"
import {tableDataProps} from "../../interfaces"

const index = ({tableData,columnFormat}:tableDataProps) => {
  return (
    <div>
        <Tables tableData={tableData} columnFormat={columnFormat}/>
    </div>
  )
}

export default index