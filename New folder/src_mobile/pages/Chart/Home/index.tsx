import React from 'react';
import { useHistory } from 'react-router-dom';

const ChartHome = () => {
  return (
    <div className="flex flex-row p-4 gap-4 w-full text-black ">
      <div className="flex flex-col gap-4 w-6/12">
        <div className="bg-teal-100 p-4 rounded-md flex-col gap-4 ">
          <div>
            <Chartbox
              data={{
                title: 'IV Charts',
                value: "market's forecast of a likely movement in a security's price",
                path: ''
              }}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <div className="bg-white text-black p-4 rounded-md shadow-md w-6/12">
              <Chartbox
                data={{
                  title: 'ATM IV/HV',
                  value: 'with Price Charts',
                  path: ''
                }}
              />
            </div>

            <div className="bg-white text-black p-4 rounded-md shadow-md w-6/12">
              <Chartbox
                data={{
                  title: 'Volatility',
                  value: 'skew charts',
                  path: ''
                }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white text-black p-4 rounded-md shadow-md ">
          <Chartbox
            data={{
              title: 'India VIX',
              value: 'Charts',
              path: ''
            }}
          />
        </div>

        <div className="bg-white text-black p-4 rounded-md shadow-md">
          <Chartbox
            data={{
              title: 'Technical',
              value: 'Charts',
              path: ''
            }}
          />
        </div>
      </div>

      <div className="bg-teal-200 p-4 py-4 flex flex-col rounded-md gap-4 text-black w-6/12">
        <Chartbox
          data={{
            title: 'OI Charts',
            value: '(OI) is a number that tells you how many contracts are currently outstanding (open) in the market.',
            path: ''
          }}
        />
        <div className="bg-white text-black p-4 rounded-md shadow-md">
          <Chartbox
            data={{
              title: 'Open Interest',
              value: '(call and put)',
              path: ''
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white text-black p-4 rounded-md shadow-md">
            <Chartbox
              data={{
                title: 'Change in OI',
                value: 'OI charts',
                path: ''
              }}
            />
          </div>

          <div className="bg-white text-black p-4 rounded-md shadow-md">
            <Chartbox
              data={{
                title: 'OI - PCR',
                value: 'OI - PCR charts',
                path: ''
              }}
            />
          </div>

          <div className="bg-white text-black p-4 rounded-md shadow-md">
            <Chartbox
              data={{
                title: 'Volume PCR',
                value: 'Volume PCR charts',
                path: ''
              }}
            />
          </div>

          <div className="bg-white text-black p-4 rounded-md shadow-md">
            <Chartbox
              data={{
                title: 'Max Pain',
                value: 'MAX Pain charts',
                path: ''
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface ChartboxOption {
  data: {
    title: string;
    value: string;
    path: string;
  };
  //   children? : React.ReactNode
}

const Chartbox = ({ data }: ChartboxOption) => {
  const history = useHistory();

  return (
    <>
      <div className="flex flex-row w-full justify-between items-center">
        <div className=" flex-1 w-full">
          <h1 className="font-semibold pb-2">{data.title}</h1>
          <p className="md:w-[70%]">{data.value}</p>
        </div>

        <div className="flex item-center justify-center h-full">
          <p className="bg-gray-200 rounded-full p-2 text-lg max-h-9 flex justify-center item-center text-black">
              <span 
              className="icon-arrow"
              onClick={() => history.push(data.path)}
              >
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default ChartHome;
