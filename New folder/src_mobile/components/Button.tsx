import styled from 'styled-components';

const StyledButton = styled.button`
  outline: none;
  background-color: ${(p) => p.theme.palette.primary};

  /* color: ${(p) => p.theme.palette.primary}; */
  /* padding: 0.3em 0.3em; */
  border: none;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 0.8rem;
  font-size: 1.2rem;
  border-radius: 1em;
  font-family: inherit;
`;

export default StyledButton;
