import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';

import { commonObject } from 'interfaces';
import { expandShortCode, floatFormatter } from 'functions';

const mapData = [
  {
    key: 'BUILD UP',
    id: 'build_up',
    type: 'normal',
    format: false,
  },
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
  percent:number | string;
  icon:string;
}

const DataBoxes = ({ type, value, percent,icon }: dataBoxProps) => {
  console.log(icon);
  return (
    <div className="flex p-1 shadow-md rounded-lg align-center justify-center gap-2 ">
      <div className="h-full flex items-center justify-center">
        <span className={`icon-${icon} text-xl border-2 border-gray-300 rounded-lg p-1`}></span>
      </div>
    <div className="flex align-center justify-center flex-col gap-1 ">
      <p className="text-center font-semibold text-gray-500">{type}</p>
      <h1 className="text-center">{value}</h1>
      <p className={`text-center lg:ml-8 text-green-600 font-semibold ${Number(percent)>0 ? "text-green-600":"text-red-600"}`}>{Number(percent).toFixed(0)}%</p>
    </div>
    </div>
  );
};

export default function SecondPart({ data }: { data: commonObject }) {
  const history = useHistory();
  return (
    <div className="flex flex-col w-full">
      <div className="grid grid-rows-4 lg:grid-cols-7 sm:grid-cols-1 lg:gap-2 sm:gap-4 grid-flow-row text-black w-full h-[80%]">
      
        <div className=" bg-gray-300 lg:row-span-2 col-span-3 rounded-lg flex lg:max-h-[400px] sm:max-h-[300px]">
          <div className=" p-2 md:pr-2 md:pt-2 flex md:gap-2 flex-col">
            <h1 className="text-2xl pl-2 text-center">
              {data?.stock?.fullname.split(' ').map((content:string)=>(
                <span>{content}{" "}</span>
              ))}
            </h1>
            <h1 className="bold text-5xl text-center ">{data?.stock?.spot?.price || "-"}</h1>
            <p className={`text-center ml-16 z-10 ${data?.stock?.spot?.price_change > 0?"text-green-600":" text-red-600"}`}>{data?.stock?.spot?.price_change.toFixed(2) + "%" || "-%"}</p>
            <div 
              className="text-center mx-4 bg-white lg:py-2 lg:px-4 px-4 rounded-lg max-h-[50px] z-10 flex items-center gap-2 w-fit"
              onClick={()=> history.push("/future/screener")}
            >
              <span className="font-semibold text-gray-500">Go to Screener</span>
              <span className="icon-corner-down text-2xl"></span>
            </div>
          </div>
          <div className="flex justify-end align-bottom w-full relative md:visible invisible">
            <span className="icon-intersect absolute lg:text-[12rem] text-[10rem] text-center bottom-0"></span>
          </div>
        </div>
        <DataBoxes icon="hourglass" type="SPOT" value={data?.stock?.spot?.price} percent={floatFormatter(data?.stock?.spot?.price_change)} />
        <DataBoxes icon="bookmark" type="FUTURES" value={data?.stock?.future.price} percent={floatFormatter(data?.stock?.spot?.price_change)} />

        <div className="py-2 shadow-lg lg:col-span-2 sm:col-span-4 row-span-4 rounded-lg bg-gray-300 mx-4 gap-4 max-h-[500px]">
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
          <div className="flex flex-col font-bold bg-white justify-center items-center mx-6 py-6 my-4 rounded-lg gap-6">
            <div className="flex flex-col items-center"
            >
              <h1>SEE FULL OPTIONS</h1>
              <h1>CHAIN</h1>
              </div>
            <div
              onClick={()=> history.push("/option/chain")} 
            >
              <span className="icon-right-arrow-fill text-3xl p-4 bg-gray-300 rounded-full"></span>
            </div>
          </div>
        </div>

        <DataBoxes icon="pricetags-outline" type="PCR" value={floatFormatter(data?.stock['pcr_oi'])} percent={floatFormatter(data?.stock['pcr_oi'])} />
        <DataBoxes icon="trending-up-outline" type="MAX PAIN" value={data?.stock['maxpain']} percent={floatFormatter(data?.stock['maxpain'])} />

        {/* Future snapshots */}
        <div className="p-2 shadow-md row-span-2 col-span-5 rounded-lg">
          <h1 className="py-2 font-semibold">Futures Snapshot</h1>
          <div className="bg-gray-300 h-[1px] w-full" />
          
          <div className="grid lg:grid-cols-3 sm:grid-cols-1 bg-white w-full gap-x-8">
            {mapData.map((val, ind) => {
              const temp = data?.stock[val.id] ?? '0';
              return (
                <div key={ind}>
                  <div className="flex justify-between py-2">
                    <p>{val.key}</p>
                    <p className={`${(temp > 0 && typeof(temp) == "number" ) ? "text-green-600": temp === 0 ? "text-gray-600":"text-red-600"}`}>{val.format ? floatFormatter(temp) : temp}</p>
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
