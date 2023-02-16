import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import styled from 'styled-components';

export default function SideBar() {
  const { pathname } = useLocation();
  const history = useHistory();

  const [showLabel, setShowLabel] = useState(false);
  const [showWelcomeText, setShowWelcomeText] = useState(false);

  useEffect(() => {
    const sideBar = document.querySelector('.sidebar') as HTMLDivElement;
    if (sideBar) {
      sideBar.style.width = showLabel ? 'auto' : 'auto';
      sideBar.style.minWidth = showLabel ? '180px' : '5vw';
    }
    if (showLabel) {
      setTimeout(() => {
        setShowWelcomeText(true);
      }, 100);
    } else {
      setShowWelcomeText(false);
    }
  }, [showLabel]);

  const links = [
    {
      text: 'Future',
      icon: 'icon-future',
      matchPath: 'future',
      path: '/future',
    },
    {
      text: 'Option',
      icon: 'icon-option',
      matchPath: 'option',
      path: '/option',
    },
    {
      text: 'Strategy',
      icon: 'icon-strategy',
      matchPath: 'strategy',
      path: '/strategy',
    },
    {
      text: 'Volatility',
      icon: 'icon-volatility',
      matchPath: 'volatility',
      path: '/volatility',
    },
    {
      text: 'Open Interest',
      icon: 'icon-open-interest',
      matchPath: 'open-interest',
      path: '/open-interest',
    },
  ];

  return (
    <Nav className="sidebar" onMouseEnter={() => setShowLabel(true)} onMouseLeave={() => setShowLabel(false)}>
      <Title>
        {showWelcomeText && <h6>Welcome !</h6>}
        <MenuIcon onClick={() => setShowLabel((old) => !old)}>
          <span></span>
          <span></span>
        </MenuIcon>
      </Title>
      <ul>
        {links.map((value, ind) => {
          return (
            <NavItem key={ind} active={pathname.includes(value.matchPath)} onClick={() => history.push(value.path)}>
              <span className={value.icon} />
              {showLabel && <span className="text">{value.text}</span>}
            </NavItem>
          );
        })}
      </ul>
    </Nav>
  );
}

const Nav = styled.nav`
  color: ${(p) => p.theme.palette.white};
  h6 {
    padding: 1em;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const MenuIcon = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  align-items: flex-end;
  margin: 1em;
  span {
    display: inline-block;
    background-color: ${(p) => p.theme.palette.white};
    width: 4rem;
    height: 5px;
    margin: 3px;
    border-radius: 15px;
    transition: all 0.2s;

    &:nth-of-type(2) {
      width: 2.5rem;
    }
  }
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 5px;
`;

const NavItem = styled.li<{ active: boolean }>`
  font-size: 1.5rem;
  font-weight: 600;
  padding: 1em;
  padding-right: 5px;
  background-color: rgba(243, 242, 255, 0.16);
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.1s;
  position: relative;

  &:hover {
    background-color: rgba(243, 242, 255, 0.3);
  }

  span {
    font-size: 2.3rem;
    margin-right: 1em;

    &.text {
      font-size: 1.5rem;
      flex-grow: 1;
    }

    &::before {
      color: ${(p) => p.theme.palette.white};
    }
  }

  &:not(:last-child) {
    margin-bottom: 0.2em;
  }

  ${({ active, theme }) => {
    if (active) {
      return `
        background-color: ${theme.palette.white};
        box-shadow: ${theme.style.boxShadow};
        color: ${theme.palette.primary};
        width: 100%;
        z-index: 100;
         /* border-top-right-radius: 1.2em;
         border-bottom-right-radius: 1.2em; */

        span {

          &::before {
            color: ${theme.palette.primary};
          }
        }

      `;
    }
  }}
`;
