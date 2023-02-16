import styled from 'styled-components';

import { Container, Content, Top } from './style';
import { useAppSelector } from 'redux/hooks';

export default function BaseDetails() {
  const activeStock = useAppSelector((state) => state.global.stock.value);

  return (
    <Container>
      <Top>
        <h1>{activeStock.value}</h1>
        <button>
          GO TO SCREENER <span className="icon-play_arrow" />
        </button>
      </Top>
      <ContentMod>
        <h2>VOLUME & OI</h2>
        <div className="inner">
          <div>
            <h3>OI CHANGE</h3>
            <h3>3.7%</h3>
            <h3>LOW</h3>
          </div>
          <div>
            <h3>VOLUME</h3>
            <h3> - -</h3>
            <h3>&nbsp;</h3>
          </div>
        </div>
      </ContentMod>
    </Container>
  );
}

const ContentMod = styled(Content)`
  h2 {
    color: ${(p) => p.theme.palette.primary};
    font-size: 2rem;
  }

  .inner {
    border-radius: ${(p) => p.theme.style.borderRadius};
    color: ${(p) => p.theme.palette.secondary};
    background-color: ${(p) => p.theme.palette.ashGrey};
    padding: 1em 2em;
    margin-top: 1em;

    div {
      margin: 1em 0;
      display: grid;
      grid-gap: 1em;
      grid-template-columns: repeat(3, 1fr);
    }

    h3 {
      font-size: 1.5rem;
    }
  }
`;
