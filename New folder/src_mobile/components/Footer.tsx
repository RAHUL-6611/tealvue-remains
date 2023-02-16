import styled from 'styled-components';

export default function Footer() {
  return (
    <Container>
      <p>Copyrights &copy; {new Date().getFullYear()} All rights reserved</p>
    </Container>
  );
}

const Container = styled.footer`
  padding: 4em 1.5em 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #171313;

  p {
    color: ${(p) => p.theme.palette.white};
    font-size: 1rem;
  }
`;
