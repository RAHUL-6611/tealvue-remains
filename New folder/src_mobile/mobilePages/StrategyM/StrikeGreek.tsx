// import styled from 'styled-components';

// import { floatFormatter } from 'functions';
import { commonObject } from 'interfaces';
import styled from 'styled-components';
import { floatFormatter } from '../../functions';
import { Content } from './style';

export default function StrikeWise({ wholeData }: { wholeData: commonObject }) {
  const data = [
    {
      title: 'DELTA',
      value: 'delta',
    },
    {
      title: 'THETA',
      value: 'theta',
    },
    {
      title: 'DECAY',
      value: 'decay',
    },
    {
      title: 'GAMMA',
      value: 'gamma',
    },
    {
      title: 'VEGA',
      value: 'vega',
    },
  ];

  return (
    <div className="">
      <CustomContent>
        <h1>Greeks</h1>

        <div className="content">
          {data.map((val, ind) => {
            return (
              <div key={ind}>
                <p>{val.title}</p>
                <p>{floatFormatter(wholeData['greeks'][val.value], 4)}</p>
              </div>
            );
          })}
        </div>
      </CustomContent>
    </div>
  );
}

const CustomContent = styled(Content)`
  h1 {
    color: ${(p) => p.theme.palette.primary};
    font-size: 2rem;
    margin-bottom: 1em;
  }
  padding: 0px;

  div {
    display: grid;
    grid-gap: 1.5em;
    grid-template-columns: repeat(2, 1fr);

    p {
      color: ${(p) => p.theme.palette.secondary};
      font-weight: 600;
      font-size: 1.5rem;
    }
  }
`;
