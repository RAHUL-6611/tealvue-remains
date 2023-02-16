import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const openclose = '/assets/svg/openclose.svg';
const tealvue = '/assets/svg/logoanimal.svg';

function Navigation() {
  const [open, setOpen] = useState(true);

  return (
    <div className={`${open ? 'w-64' : 'w-[65px]'} transition-all duration-300 rounded-br-lg pb-6 relative shadow-lg pt-6 h-full`}>
      <div className="pt-4 pb-2 px-6">
        <div className="flex items-center overflow-hidden">
          <img src={tealvue} className={`rounded-md object-fill flex-1 ${open ? '' : 'w-full'}`} alt="Avatar" />

          {open && (
            <div className={`grow ${open ? ' ml-3' : ' ml-10'}`}>
              <p className="text-md font-semibold text-gray-500">TealVue</p>
              <p className="text-xs font-semibold text-gray-400">Growth & Marketing</p>
            </div>
          )}

          <img
            src={openclose}
            alt="close icon"
            className={`text-white bg-white absolute ${open ? 'right-2' : 'right-[-10px]'} cursor-pointer`}
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>

      <div className={`ml-0 pl-0  overflow-hidden`}>
        <ul className="relative py-2">
          <li className="relative">
            <SidebarOption navIcon={'speed'} title={'Home'} link={'/'} />
          </li>

          <h4 className={`text-center font-normal text-gray-300 text-sm pt-5 pb-2 pr-12 ${open ? '' : 'hidden'}`}>SCREENER</h4>

          {[
            {
              title: 'Future',
              symbol: 'future',
              link: '/future',
            },
            {
              title: 'Options',
              symbol: 'options',
              link: '/option',
            },
            {
              title: 'Strategy',
              symbol: 'strategy',
              link: '/strategy',
            },
            {
              title: 'Open Interest',
              symbol: 'open-interest1',
              link: '/open-interest',
            },
            {
              title: 'Volatility',
              symbol: 'chart',
              link: '/volatility',
            },
          ].map((link) => (
            <li className="relative" key={link.title}>
              <SidebarOption title={link.title} navIcon={link.symbol} link={link.link} />
            </li>
          ))}
        </ul>

        {/* <h4 className={`text-center font-bold text-gray-300 text-sm pt-5 pr-12 ${open ? '' : 'hidden'}`}>OTHERS</h4>

        <ul className="relative ">
          {[
            {
              title: 'Social Trading',
              symbol: 'trading',
              link: '/social-trade',
            },
            {
              title: 'Chat Support',
              symbol: 'chat',
              link: '/chat',
            },
            {
              title: 'Expert Advice',
              symbol: 'advice',
              link: '/expert-advice',
            },
          ].map((link) => (
            <li className="relative" key={link.title}>
              <SidebarOption title={link.title} navIcon={link.symbol} link={link.link} />
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}

export default Navigation;

interface ISidebarOption {
  navIcon: string;
  title: string;
  link?: string;
  list?: {
    label: string;
    link: string;
  }[];
}

const SidebarOption = ({ navIcon, title, list, link }: ISidebarOption) => {
  const [listOpen, setListOpen] = useState(false);
  const history = useHistory();
  const location = useLocation();

  return list && list?.length > 0 ? (
    <div className="w-60 flex flex-col pl-2 py-2 cursor-pointer">
      <div
        className={`py-2 px-4 flex justify-between items-center ${
          list.find((l) => l.link === location.pathname) ? 'bg-primary_light' : ''
        }`}
      >
        <div className={`flex justify-between items-center hover:text-primary flex-1`} onClick={() => setListOpen(!listOpen)}>
          <span className={`icon-${navIcon} text-2xl leading-none`} />

          <p className="align-left pl-5  flex-1">{title}</p>
        </div>

        <span className={`icon-arrow ${listOpen ? 'rotate-90' : 'rotate-0'} transition-transform duration-300`}></span>
      </div>

      <ul className="px-16">
        {list &&
          listOpen &&
          list.map((item, e) => (
            <li className={`text-sm py-2 flex items-center gap-2 hover:text-primary `} onClick={() => history.push(`${item.link}`)}>
              <span className={`icon-${location.pathname === item.link ? 'arrow_right' : 'dots-three '}`}></span>
              <span>{item.label}</span>
            </li>
          ))}
      </ul>
    </div>
  ) : (
    <div
      className={`w-60 flex flex-col pl-2 py-2 cursor-pointer hover:text-primary ${
        location.pathname === link ? 'bg-primary_light font-semibold text-primary' : ''
      } transition-all duration-300`}
      onClick={() => history.push(`${link}`)}
    >
      <div className="py-2 px-4 flex justify-between ">
        <div className="flex justify-between items-center">
          <span className={`icon-${navIcon} text-2xl leading-none`} />

          <p className={`align-left pl-5 `}>{title}</p>
        </div>
      </div>
    </div>
  );
};
