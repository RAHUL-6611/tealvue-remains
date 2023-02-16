import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export default function SimpleNavbar() {
  return (
    <Container>
      <Logo to="/">
        <img src="/assets/logo_with_text.png" alt="logo" />
      </Logo>
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
  background-color: ${(p) => p.theme.palette.white};
  z-index: 999;
`;

const Logo = styled(NavLink)`
  flex-grow: 1;
  img {
    width: 14rem;
  }
`;
