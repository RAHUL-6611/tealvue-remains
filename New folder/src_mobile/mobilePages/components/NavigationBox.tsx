import React from 'react';
import { useHistory, useLocation } from 'react-router';
 interface NavProps{
     title: string;
     leftIcon: string;
     rightIcon: string;
     header?: boolean;
     path?: string ;
}

const NavigationBox = ({ title, leftIcon, rightIcon, header = false,path="" }: NavProps) => {
      const history = useHistory();
      return (
        <div
          className={`flex justify-between w-full py-6 px-4 ${header ? '' : 'shadow-md rounded-lg bg-white'} items-center`}
          onClick={() => !header && history.push(path)}
        >
          <div className={`leftIcon ${leftIcon === 'arrow' ? 'rotate-180' : ' '}`}>
            <span
              className={`icon-${leftIcon} font-xl`}
              onClick={() => history.goBack()}
            ></span>
          </div>
          <div className={`title ${header ? 'text-xl' : 'text-sm'} font-bold `}>{title}</div>
          <div className="rightIcon">
            <span className={`icon-${rightIcon} font-xl`}></span>
          </div>
        </div>
      );
};

export default NavigationBox;
