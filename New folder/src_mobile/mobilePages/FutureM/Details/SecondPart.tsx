import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';

import { commonObject } from 'interfaces';
import { expandShortCode, floatFormatter } from 'functions';

const mapData = [
  {
    key: 'OI',
    id: 'oi',
    type: 'normal',
    format: true,
  },
  {
    key: 'OI Day change%',
    id: 'oi_change',
    type: 'profit',
    format: true,
  },
  {
    key: 'MWPL',
    id: 'mwpl',
    type: 'normal',
    format: true,
  },
  {
    key: 'Contracts Traded',
    id: 'volume',
    type: 'normal',
  },
  {
    key: 'Change in Volume%',
    id: 'volume_change',
    type: 'profit',
  },
  {
    key: 'Basis',
    id: 'basis',
    type: 'normal',
  },
  {
    key: 'PCR Vol',
    id: 'pcr_vol',
    format: true,
    type: 'normal',
  },
  {
    key: 'coc',
    id: 'coc',
    type: 'normal',
    format: true,
  },
  {
    key: 'PCR OI',
    id: 'pcr_oi',
    type: 'normal',
    format: true,
  },
  {
    key: 'Roll Over',
    id: 'rollover',
    type: 'normal',
  },
  {
    key: 'Lot Size',
    id: 'lotsize',
    type: 'normal',
  },
];
const optionData = [
  {
    key: 'ATM IV',
    type: 'loss',
    id: 'atm_iv',
  },
  {
    key: 'IVP',
    id: 'ivp',
  },
  {
    key: 'LOT SIZE',
    id: 'lotsize',
  },
  {
    key: 'PCR',
    id: 'pcr_oi',
    format: true,
  },
  {
    key: 'MAX PAIN',
    id: 'maxpain',
  },
];

interface dataBoxProps {
  type: string;
  value: number | string;
  percent: number | string;
}

const DataBoxes = ({ type, value, percent }: dataBoxProps) => {
  return (
    <div className="grid py-2 px-1 shadow-md rounded-lg grid-rows-1 grid-cols-1 overflow-hidden">
      <p className="text-center">{type}</p>
      <h1 className="text-center">{value}</h1>
      <p className="text-center ml-6 text-green-400">{percent}%</p>
    </div>
  );
};

export default function SecondPart({ data }: { data: commonObject }) {
  const history = useHistory();
  const { type } = useParams<{ type: string }>();

  return (
    <div className="flex flex-col w-full">
      <div className="grid grid-rows-2 grid-cols-4 gap-2 grid-flow-row text-black w-full h-[80%] my-4">
        <div className=" bg-gray-300 row-span-2 col-span-2 rounded-lg flex">
          <div className="flex-1 p-2 pr-2 pt-2 flex gap-2 flex-col">
            <h1 className="text-xl pl-2 text-center">
              {data?.stock?.fullname.split(' ')[0]}
              <span> {data?.stock?.fullname.split(' ')[1]}</span>
            </h1>
            <h1 className="bold text-4xl text-center">1668.75</h1>
            <p className="text-center ml-16">2.46%</p>
            <div className="text-center mx-4 bg-white py-2 rounded-lg">
              <span>Go to Screener</span>
            </div>
          </div>
          {/* <div className="flex-1 flex justify-end align-bottom w-full relative"> */}
          {/* <span className="icon-intersect absolute text-[80px] text-center bottom-0"></span> */}
          {/* </div> */}
        </div>
        <DataBoxes type="SPOT" value={data?.stock?.spot?.price} percent={floatFormatter(data?.stock?.spot?.price_change)} />
        <DataBoxes type="FUTURES" value={data?.stock?.future.price} percent={floatFormatter(data?.stock?.spot?.price_change)} />
        <DataBoxes type="PCR" value={floatFormatter(data?.stock['pcr_oi'])} percent={floatFormatter(data?.stock['pcr_oi'])} />
        <DataBoxes type="MAX PAIN" value={data?.stock['maxpain']} percent={floatFormatter(data?.stock['maxpain'])} />
      </div>
      <div className="grid grid-rows-8 grid-cols-1">
        <div className="py-2 shadow-md col-span-1 row-span-4 rounded-lg bg-gray-300 mx-4 gap-4">
          <div className="flex justify-between py-4 px-6">
            <p>Options Snapshot</p>
            <p>.</p>
          </div>
          {optionData.map((val, ind) => {
            const temp = data?.stock[val.id] ?? '0';

            return (
              <div key={ind}>
                <div className="bg-gray-100 h-[2px] w-full" />
                <div className="flex justify-between py-2 px-6">
                  <p>{val.key}</p>
                  <p>{val.format ? floatFormatter(temp) : temp}</p>
                </div>
              </div>
            );
          })}

          <div className="bg-white h-[2px] w-full" />
          <div className="flex flex-col font-bold bg-white justify-center items-center mx-6 py-6 my-4 rounded-lg">
            <h1>SEE FULL OPTIONS</h1>
            <h1>CHAIN</h1>
          </div>
        </div>

        {/* Future snapshots */}
        <div className="p-2 shadow-lg row-span-4 col-span-1 rounded-lg my-4">
          <h1 className="py-2 font-bold">Futures Snapshot</h1>
          <div className="bg-gray-300 h-[1px] w-full" />
          <div className="grid grid-cols-1 bg-white w-full gap-4">
            {mapData.map((val, ind) => {
              const temp = data?.stock[val.id] ?? '0';
              return (
                <div key={ind}>
                  <div className="flex justify-between py-2">
                    <p>{val.key}</p>
                    <p>{val.format ? floatFormatter(temp) : temp}</p>
                  </div>
                  <div className="bg-gray-300 h-[1px] w-full" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>

    // <Section>
    //   <Container>
    //     <div className="top">
    //       <h3>INFO</h3>
    //     </div>
    //     <div className="content">
    //       {mapData.map((val, ind) => {
    //         const temp = data?.stock[val.id] ?? '0';
    //         return (
    //           <Item type={val.type} key={ind}>
    //             <h2>{val.key}</h2>
    //             <h3>{val.format ? floatFormatter(temp) : temp}</h3>
    //           </Item>
    //         );
    //       })}
    //       <Item type="normal">
    //         <h2>Build Up</h2>
    //         <h3>{expandShortCode(data?.stock['build_up'] ?? '')}</h3>
    //       </Item>
    //     </div>
    //   </Container>
    //   <Container>
    //     <div className="top">
    //       <h3>Option Chain</h3>
    //     </div>
    //     <div className="option_content">
    //       {optionData.map((val, ind) => {
    //         const temp = data?.stock[val.id] ?? '0';
    //         return (
    //           <OptionItem type={val.type ?? ''} key={ind}>
    //             <h2>{val.key}</h2>
    //             <h3>{val.format ? floatFormatter(temp) : temp}</h3>
    //           </OptionItem>
    //         );
    //       })}
    //       <p onClick={() => history.push(`/option/screener/${type}`)}>
    //         SEE FULL OPTION CHAIN <span className="icon-arrow-right" />
    //       </p>
    //     </div>
    //   </Container>
    // </Section>
  );
}

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(550px, 1fr));
  grid-gap: 2em;
  margin: 4em 0;
`;

const Container = styled.div`
  box-shadow: ${(p) => p.theme.style.boxShadow};
  border-radius: ${(p) => p.theme.style.borderRadius};
  padding-bottom: 1em;
  .top {
    background-color: ${(p) => p.theme.palette.primary};
    color: ${(p) => p.theme.palette.white};
    padding: 1.5em;
    border-top-left-radius: ${(p) => p.theme.style.borderRadius};
    border-top-right-radius: ${(p) => p.theme.style.borderRadius};
  }

  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
  }
  .option_content {
    display: grid;
    grid-template-columns: 1fr;

    p {
      cursor: pointer;
      justify-self: flex-end;
      padding: 1.5em;
      font-weight: 600;
      color: ${(p) => p.theme.palette.secondary};
      font-size: 1.2rem;

      display: flex;
      align-items: center;

      span {
        margin-left: 1em;
        font-size: 1.5rem;
      }
    }
  }
`;

const Item = styled.div<{ type: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(p) => (p.type === 'profit' ? p.theme.palette.primary : p.type === 'loss' ? p.theme.palette.danger : p.theme.palette.secondary)};
  min-width: 180px;
  padding: 0.5em;

  border-bottom: 1px solid rgba(7, 60, 60, 0.5);

  &:nth-child(11),
  &:nth-child(12) {
    border-bottom: none;
  }

  h2,
  h3 {
    white-space: nowrap;
    color: inherit;
  }

  h2 {
    font-weight: 600;
    font-size: 1.3rem;
  }

  h3 {
    background-color: ${(p) => p.theme.palette.lightGrey};
    padding: 0.5em 1em;
    min-width: 100px;
    text-align: center;
    border-radius: ${(p) => p.theme.style.borderRadius};
  }
`;
const OptionItem = styled.div<{ type: string }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;

  min-width: 180px;
  padding: 1em;

  h2,
  h3 {
    white-space: nowrap;
    color: ${(p) => p.theme.palette.secondary};
    font-weight: 600;
    font-size: 1.5rem;
  }

  h4 {
    color: ${(p) =>
      p.type === 'profit' ? p.theme.palette.primary : p.type === 'loss' ? p.theme.palette.danger : p.theme.palette.secondary};
    font-weight: 600;
    font-size: 1.3rem;
  }
`;
