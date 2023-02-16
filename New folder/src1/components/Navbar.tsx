import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

import { BREAKPOINTS } from 'constants/breakpoints';

export default function Navbar({ openNav, setOpenNav }: { openNav: boolean; setOpenNav: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <Container>
      <NavButton className={openNav ? 'active' : ''} onClick={() => setOpenNav((old) => !old)}>
        <span>&nbsp;</span>
        <span></span>
        <span></span>
      </NavButton>
      <Logo to="/">
        <img src="/assets/logo_with_text.png" alt="logo" />
      </Logo>
      <Link to="/profile">
        <Profile>
          <div className="round">
            <span className="icon-user"></span>
          </div>
        </Profile>
      </Link>
    </Container>
  );
}

const Container = styled.nav`
  position: fixed;
  height: 10vh;
  width: 100vw;
  padding: 2em;
  display: flex;
  align-items: center;
  background-color: #fff;
  /* backdrop-filter: blur(8px); */
  z-index: 999;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;

  div {
    font-size: 2rem;
    font-weight: 500;
  }

  h4,
  h5 {
    font-size: 1.6rem;
    font-weight: 500;
    color: ${(p) => p.theme.palette.secondary};

    @media (max-width: ${BREAKPOINTS.md}) {
      display: none;
    }
  }

  h5 {
    font-size: 1rem;
  }

  .round {
    background-color: ${(p) => p.theme.palette.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2em;
    height: 2em;
    border-radius: 50%;
    margin-right: 0.5em;
    color: ${(p) => p.theme.palette.white};
    span {
      font-size: 2rem;
    }
  }
`;

const Logo = styled(NavLink)`
  flex-grow: 1;
  img {
    width: 14rem;
  }
`;

const NavButton = styled.button`
  display: flex;
  flex-direction: column;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  margin-right: 1rem;

  @media (min-width: ${BREAKPOINTS.md}) {
    display: none;
  }

  span {
    display: inline-block;
    background-color: ${(p) => p.theme.palette.primary};
    width: 40px;
    height: 5px;
    margin: 3px;
    border-radius: 15px;
    transition: all 0.2s;

    &:nth-of-type(2) {
      width: 25px;
    }

    &:nth-of-type(3) {
      width: 15px;
    }
  }

  &.active {
    span {
      &:nth-of-type(1) {
        background-color: transparent;
      }

      &:nth-of-type(2) {
        width: 30px;
        transform: translate(7px, 2px) rotate(50deg);
      }

      &:nth-of-type(3) {
        width: 30px;
        transform: translate(7px, -10px) rotate(130deg);
      }
    }
  }
`;
