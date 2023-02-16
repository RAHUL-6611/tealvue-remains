import { floatFormatter } from 'functions';
import moment from 'moment';
import { useEffect, useState } from 'react';

import { useAppSelector } from 'redux/hooks';
import { Special } from '../style';

interface detailsType {
  type: string;
  name: string;
  delta: number;
  theta: number;
  gamma: number;
  vega: number;
}

export default function Greeks() {
  const optionData = useAppSelector((state) => state.strategy.wholeData.option_data);
  const trades = useAppSelector((state) => state.strategy.trade.values);

  const [data, setData] = useState<detailsType[]>([]);

  useEffect(() => {
    setData(
      trades.map((val) => ({
        type: val.BorS,
        name: `${val.lots} X ${moment(new Date(val.expiry.value)).format('DD MMM')} ${val.strike}  ${val.type}`,
        delta: optionData[val.strike][0]?.delta,
        theta: optionData[val.strike][0]?.theta,
        gamma: optionData[val.strike][0]?.gamma,
        vega: optionData[val.strike][0]?.vega,
      })),
    );
  }, [trades, optionData]);

  return (
    <div className="pt-4">
      <div>
        {data.map((val, ind) => {
          return (
            <div key={ind}>
              <p className="flex items-center gap-4 p-2">
                <Special buy={val.type === 'buy'}>{val.type[0].toUpperCase()}</Special>
                <span className="font-medium">{val.name}</span>
              </p>

              <div className="flex justify-between gap-4 p-2">
                <div className="w-6/12">
                  <p className="flex justify-between">
                    <span className="text-slate-400">Delta</span>
                    <span className="font-medium">{floatFormatter(val.delta, 4)}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-400">Theta</span>
                    <span className="font-medium">{floatFormatter(val.theta, 4)}</span>
                  </p>
                </div>

                <div className="w-6/12">
                  <p className="flex justify-between">
                    <span className="text-slate-400">Vega</span>
                    <span className="font-medium">{floatFormatter(val.gamma, 4)}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-400">Gamma</span>
                    <span className="font-medium">{floatFormatter(val.vega, 4)}</span>
                  </p>
                </div>
              </div>

              <hr />
            </div>
          );
        })}
      </div>

      {data.length > 0 && (
        <div className="bg-slate-50 text-t1Dark p-2 rounded-lg">
          <div className="flex items-center">
            <p className="flex items-center gap-4 p-2 w-6/12">
              <Special buy={true}>B</Special>
              <span className="font-medium">{data.map((val) => val.type === 'buy').length} x Buy</span>
            </p>

            <p className="flex items-center gap-4 p-2 w-6/12">
              <Special buy={false}>S</Special>
              <span className="font-medium">{data.map((val) => val.type === 'buy').length} x Sell</span>
            </p>
          </div>

          <div className="flex justify-between gap-4 p-2">
            <div className="w-6/12">
              <p className="flex justify-between">
                <span className="">Delta</span>
                <span className="font-medium">{floatFormatter(data.map((val) => val.delta, 4).reduce((pre, cur) => pre + cur))}</span>
              </p>
              <p className="flex justify-between">
                <span className="">Theta</span>
                <span className="font-medium">{floatFormatter(data.map((val) => val.theta, 4).reduce((pre, cur) => pre + cur))}</span>
              </p>
            </div>

            <div className="w-6/12">
              <p className="flex justify-between">
                <span className="">Vega</span>
                <span className="font-medium">{floatFormatter(data.map((val) => val.gamma, 4).reduce((pre, cur) => pre + cur))}</span>
              </p>
              <p className="flex justify-between">
                <span className="">Gamma</span>
                <span className="font-medium">{floatFormatter(data.map((val) => val.vega, 4).reduce((pre, cur) => pre + cur))}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
