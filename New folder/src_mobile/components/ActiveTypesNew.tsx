import { activePropsTwo } from 'interfaces'
import React from 'react'
import styled from 'styled-components';

const ActiveTypesNew = ({values,action}:activePropsTwo) => {
  return (
    <div className="">
        <select className="w-[100px] h-[30px] border-2 border-black">
            {values?.map((val, ind) => {
                <Options 
                 value={val.title}
                 key={ind+val.title}
                // active={active.id === val.id}
                // disabled={!!disabled}
                 >
                     {val.title}
                     </Options>
            })}
        </select>
    </div>
  )
}

export default ActiveTypesNew


const Options = styled.option`
    padding: 0.5rem 1rem;
    cursor: pointer;
    user-select: none;
    font-size: 0.8rem;
  font-weight: 400;
  transition: all 0.3s;
  white-space: nowrap;
  background:white;
  `
//   cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
  //   background-color: ${(p) => (p.active ? p.theme.palette.primary : p.theme.palette.grey)};
    //   color: ${(p) => p.theme.palette.white};
  //   font-weight: ${(p) => (p.active ? 'bold' : 'normal')};
