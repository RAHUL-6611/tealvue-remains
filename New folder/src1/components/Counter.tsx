import styled from 'styled-components';

interface props {
  small?: boolean;
  value: number;
  onPlusClick: () => void;
  onMinusClick: () => void;
}

export default function Counter({ small, value, onMinusClick, onPlusClick }: props) {
  return (
    <Container small={!!small}>
      <p onClick={onMinusClick}>-</p>
      <p>{value}</p>
      <p onClick={onPlusClick}>+</p>
    </Container>
  );
}

const Container = styled.div<{ small: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  /* box-shadow: ${(p) => p.theme.style.boxShadow}; */
  border-radius: ${(p) => p.theme.style.borderRadius};
  border: ${(p) => p.theme.style.border};

  p {
    font-size: 1rem;
    padding: 0.5em;
    font-weight: 600;
    /* color: ${(p) => p.theme.palette.secondary}; */
    cursor: pointer;
    user-select: none;

    &:nth-child(2) {
      /* font-size: 1rem; */
      /* color: ${(p) => p.theme.palette.primary}; */
      border: ${(p) => p.theme.style.border};
      border-top: none;
      cursor: default;
      border-bottom: none;
    }

    ${({ small }) => {
      if (small)
        return `
        font-size: 1rem;
        padding: 0.5em;

        &:nth-child(2) {
          font-size: 0.8rem;
        }
        `;
    }}
  }
`;
