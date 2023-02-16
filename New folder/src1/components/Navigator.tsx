import { useHistory, useLocation } from 'react-router';
import styled from 'styled-components';

import { NavigatorProps } from 'interfaces';

export default function Navigator({ title, items }: NavigatorProps) {
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <Section>
      {/* <div>
        <h2 className="text-sm">{title}</h2> */}
      {/* <h3 id="active">{items.find((val) => pathname.includes(val.path))?.title}</h3> */}
      {/* </div> */}

      <nav>
        <ul>
          {items.map((item, ind) => {
            return (
              <NavItem key={ind} active={pathname.includes(item.path)} onClick={() => history.push(item.path)}>
                {item.title}
              </NavItem>
            );
          })}
        </ul>
      </nav>
    </Section>
  );
}

const Section = styled.section`
  border-bottom: ${(p) => p.theme.style.borderLight1};
  /* margin-bottom: 0.5em; */
  background-color: ${(p) => p.theme.palette.white};
  /* padding: 1rem; */

  h2 {
    color: ${(p) => p.theme.palette.primary};
    font-size: 1.2rem;
  }

  /* div {
    padding: 1rem;
  } */

  h3 {
    color: ${(p) => p.theme.palette.secondary};
    font-weight: 400;
    margin-top: 0.2em;
    font-size: 1rem;
  }

  nav {
    padding: 1rem;
  }

  ul {
    display: flex;
    white-space: nowrap;
    padding-bottom: 0.6em;

    overflow-x: auto;

    ::-webkit-scrollbar {
      height: 3px;
      border-radius: 3px;
    }
  }
`;

const NavItem = styled.li<{ active: boolean }>`
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  color: ${(p) => (p.active ? p.theme.palette.primary : p.theme.palette.secondary)};
  position: relative;
  user-select: none;

  &:not(:last-child) {
    margin-right: 2em;
  }

  ${({ active, theme }) => {
    if (active) {
      return `
        &::after {
          content: '';
          display: inline-block;
          background-color: ${theme.palette.primary};
          width: 40%;
          height: 4px;
          border-radius: 3px;
          position: absolute;
          left: 0%;
          top: 96%;
        }
      `;
    }
  }}
`;
