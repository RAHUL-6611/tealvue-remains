import styled, { keyframes } from 'styled-components';

interface props {
  style?: React.CSSProperties;
}

export default function Loader({ style }: props) {
  return (
    <Container style={style}>
      <SVG width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.54035 17.3077H23.8068L25.9935 21.6066L21.6399 30.1649L25.9935 38.7232L23.8068 43.022H6.54035L0 30.1649L6.54035 17.3077Z"
          fill="#008080"
          id="first"
        />
        <path
          d="M37.0798 59.9082L27.8936 45.546L30.4076 41.4253L40.045 40.464L45.0501 32.26L49.8908 31.7771L59.0771 46.1393L51.5582 58.464L37.0798 59.9082Z"
          fill="#008080"
          id="second"
        />
        <path
          d="M58.9211 12.1414L50.9641 27.2046L46.0998 27.1187L40.4273 19.3511L30.7425 19.1799L27.8936 15.2783L35.8503 0.215088L50.3996 0.472502L58.9211 12.1414Z"
          fill="#008080"
          id="third"
        />
      </SVG>
    </Container>
  );
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const SVG = styled.svg`
  animation: ${rotate} 2s linear infinite;
  z-index: 9988;
  position: absolute;
  margin: 2rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
`;
