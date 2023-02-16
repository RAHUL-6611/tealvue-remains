import styled from 'styled-components';

import { commonObject } from 'interfaces';
// import { Container, Content, Top } from './style';
// import StrikeGreek from './StrikeGreek';
// import { floatFormatter, perFormatter } from 'functions';

export default function Analysis({ wholeData }: { wholeData: commonObject }) {
  const data = [
    {
      title: 'Max Profit',
      value: 'UNLIMITED',
      type: 'profit',
      key: 'max_profit',
    },
    {
      title: 'Max Loss',
      value: '0',
      type: 'loss',
      key: 'max_loss',
    },
    {
      title: 'Risk / Reward Ratio',
      value: 'NA',
      type: '',
      key: 'risk_reward_ratio',
    },
    {
      title: 'Return',
      value: '0',
      type: '',
    },
    {
      title: 'Funds Needed',
      value: '0',
      type: '',
    },
    {
      title: 'Margin Required',
      value: '0',
      type: '',
    },
  ];

  return (
    <div className="shadow-3xl rounded-lg p-4 h-full w-full">
      <div className=" font-semibold pb-3">
        <h1 className="text-lg">Analysis</h1>
      </div>

      <div className="flex flex-col justify-between">
        {data?.map((val, ind) => {
          return (
            <Item key={ind} type={val.type}>
              <h3>{val.title}</h3>
              <h3>{val.key ? wholeData[val.key] : val.value}</h3>
            </Item>
          );
        })}

        {/* <BreakLevelContainer>
          <h1>BREAKEVEN LEVELS</h1>
          <ul>
            <li className="top">
              <p>AT</p>
              <p>Pay Off</p>
              <p>Change</p>
            </li>

            {wholeData?.['breakevents_at_expiry']?.map((val: commonObject, ind: number) => (
              <li key={ind}>
                <p>{val?.at}</p>
                <p>{perFormatter(val?.change)}</p>
                <p>{floatFormatter(val?.payoff)}</p>
              </li>
            ))}
          </ul>
        </BreakLevelContainer> */}

        {/* <StrikeGreek wholeData={wholeData} /> */}
      </div>
    </div>
  );
}

const Item = styled.div<{ type: string }>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 2rem;
  margin: 0 0 1rem 0;

  h3 {
    font-size: 1rem;

    &:first-child {
      color: ${(p) => p.theme.palette.black};
    }
    &:nth-child(2) {
      color: ${(p) =>
        p.type === 'profit' ? p.theme.palette.primary : p.type === 'loss' ? p.theme.palette.danger : p.theme.palette.secondary};
    }
  }
`;

// const BreakLevelContainer = styled.div`
//   margin: 1.2em 0;
//   h1 {
//     color: ${(p) => p.theme.palette.primary};
//     font-size: 2rem;
//     margin-bottom: 0.2em;
//   }

//   ul {
//     margin-bottom: 0.8em;
//     li {
//       color: ${(p) => p.theme.palette.secondary};
//       font-weight: 600;
//       font-size: 1.5rem;
//       display: grid;
//       grid-template-columns: 1fr 1fr 1fr;
//       justify-items: center;

//       &.top {
//         color: ${(p) => p.theme.palette.primary};
//         margin-bottom: 0.5em;
//       }
//     }
//   }
// `;

// const CustomTop = styled(Top)`
//   div {
//     display: flex;
//     align-items: center;
//     gap: 2em;
//   }

//   button {
//     border-radius: 2rem;
//   }
// `;
