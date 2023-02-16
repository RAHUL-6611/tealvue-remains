import { Fragment, useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Tab } from '@headlessui/react';
// import styled from 'styled-components';

import { Button } from './style';
import Analysis from './Analysis';
import Strategy from './Strategy';
import Chart from './ChartM';
import { commonObject, customAxiosError } from 'interfaces';
import { Loader, Select } from 'components';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { tradeType, updateTradeList } from 'redux/slices/strategy';
import { getOptionChainId } from 'functions';
import Greeks from './ChartM/Greeks';

export default function StrategyView() {
  const { state } = useLocation<{ type: 'string' }>();
  const history = useHistory();

  const activeStock = useAppSelector((state) => state.global.stock.value);
  // const stock = useAppSelector((state) => state.global.stock);
  const trades = useAppSelector((state) => state.strategy.trade.values);
  const expiryDate = useAppSelector((state) => state.strategy.expiry_date);
  const currentPrice = useAppSelector((state) => state.global.stock.cash);
  const targetPrice = useAppSelector((state) => state.strategy.nifty_target);
  const expiryOption = useAppSelector((state) => state.expiryDates.activeOption);

  const [loading, setLoading] = useState(true);
  const [wholeData, setWholeData] = useState<commonObject>({});
  const [target, setTargetPrice] = useState<number>(targetPrice || 0);

  const dispatch = useAppDispatch();

  const getData = async (stockItem: string, trades: tradeType[], expiryDate: string, currentPrice: number, targetPrice: number) => {
    setLoading(true);
    try {
      const { data } = await axios.post('/v1/api/strategy/builder', {
        underlying_symbol: stockItem,
        current_underlying_price: currentPrice,
        target_underlying_price: targetPrice,
        future_expiry_underlying_price: 0,
        target_datetime: expiryDate,

        trades: trades.map((val) => ({
          entry_price: val.price,
          strike: val.strike,
          expiry_at: val.expiry.value,
          trade_action: val.BorS === 'buy' ? 'BUY' : 'SELL',
          option_type: val.type,
          quantity: val.lots,
          implied_volatility: val.iv,
        })),
      });

      setWholeData(data.payload);
      setLoading(false);
    } catch (error) {
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    }
  };

  const getInitialData = async (stockItem: string, expiryDate: string, type: string) => {
    setLoading(true);
    try {
      const { data } = await axios.post('/v1/api/strategy/preset', {
        underlying_symbol: stockItem,
        expiry_at: expiryDate,
        strategy_type: type,
      });

      dispatch(
        updateTradeList(
          data.data.map((val: commonObject) => ({
            active: true,
            BorS: val.trade_action.toLowerCase(),
            expiry: {
              value: val.expiry_at,
              label: val.expiry_at,
            },
            strike: val.strike,
            type: val.option_type,
            lots: val.quantity,
            price: val.entry_price,
            iv: val.implied_volatility,
            id: getOptionChainId(val.strike, val.trade_action.toLowerCase(), val.option_type),
          })),
        ),
      );
    } catch (error) {
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    }
  };

  const memoizedGetInitialData = useCallback(getInitialData, [dispatch]);

  useEffect(() => {
    if (activeStock.value && expiryOption.value) memoizedGetInitialData(activeStock.value, expiryOption.value, state.type);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStock.value, expiryOption, state.type]);

  useEffect(() => {
    if (trades.length) getData(activeStock.value, trades, expiryDate.toISOString(), currentPrice, targetPrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStock, currentPrice, expiryDate, trades]);

  // ? for filter action
  useEffect(() => {
    const awaitTyping = setTimeout(
      async () => await getData(activeStock.value, trades, expiryDate.toISOString(), currentPrice, target),
      target ? 1000 : 0,
    );

    return () => clearTimeout(awaitTyping);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return (
    <section>
      <Button onClick={() => history.push('/strategy/dashboard')}>SELECT STRATEGY</Button>
      {/* <Top>

        <ul>
          <li>SPOT : {floatFormatter(stock.cash)}</li>
          <li>CHANGE : {floatFormatter(stock.change)}%</li>
          <li>STRIKE : {floatFormatter(stock.atm_strike)} </li>
        </ul>
      </Top> */}

      {loading && Object.keys(wholeData).length === 0 && <Loader />}

      {Object.keys(wholeData).length > 0 && (
        <div className="flex pt-4 gap-4">
          <div className="flex flex-col gap-4 w-8/12">
            <div className="flex gap-4 h-full">
              <div className="h-full flex-1 flex flex-col justify-between gap-4">
                <div className="flex gap-2 p-4 bg-slate-50 h-max rounded-lg">
                  <div className="h-full flex flex-col flex-1 gap-5">
                    <p className="text-2xl">Strategy</p>

                    <div className="flex flex-col gap-4">
                      <Select
                        options={[
                          {
                            value: 'Bullish',
                            label: 'Bullish',
                          },
                        ]}
                      />

                      <Select
                        options={[
                          {
                            value: 'Bull Call Spread',
                            label: 'Bull Call Spread',
                          },
                        ]}
                      />
                    </div>
                  </div>

                  <div className="flex justify-center flex-col items-center">
                    <span>
                      <span className="uppercase">Bullish | </span>
                      <span className="text-gray-400 text-sm">Bull Call Spread</span>
                    </span>
                    <img className="p-4 w-40 h-40" src={`/assets/strategy/BULL SPREAD CALL.png`} alt={'BULL SPREAD CALL'} />
                  </div>
                </div>

                <div className="w-full h-full flex items-center bg-gray-50 rounded-lg p-4">
                  <div className="w-9/12">
                    <p className="font-semibold py-2">Add / Edit</p>
                    <span className="text-slate-300">Make New Strategy</span>
                  </div>

                  <div className="w-3/12 grid place-items-center cursor-pointer">
                    <span className="icon-add  bg-gray-300 text-2xl p-2 rounded-xl font-bold"></span>
                  </div>
                </div>
              </div>

              <div className="w-5/12">
                <Analysis wholeData={wholeData} />
              </div>
            </div>

            <Strategy wholeData={wholeData} />

            <Chart loader={loading} {...{ setTargetPrice, target, wholeData }} />
          </div>

          <div className="w-4/12">
            <Tab.Group defaultIndex={0}>
              <Tab.List>
                <div className="flex gap-2">
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={`${
                          selected ? 'bg-t1Primary text-white' : 'bg-white text-black'
                        } w-6/12 py-2.5 text-sm leading-5 font-medium text-white rounded-lg  focus:outline-none focus:ring-2 ring-offset-2 ring-offset-t1Primary ring-white ring-opacity-60`}
                      >
                        Greeks
                      </button>
                    )}
                  </Tab>

                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={`${
                          selected ? 'bg-t1Primary text-white' : 'bg-white text-black'
                        } w-6/12 py-2.5 text-sm leading-5 font-medium text-white rounded-lg  focus:outline-none focus:ring-2 ring-offset-2 ring-offset-t1Primary ring-white ring-opacity-60`}
                      >
                        P/L Table
                      </button>
                    )}
                  </Tab>
                </div>
              </Tab.List>

              <Tab.Panels>
                <Tab.Panel>
                  {/* <StrikeGreek wholeData={wholeData} /> */}
                  <Greeks />
                </Tab.Panel>
                <Tab.Panel>Coming soon</Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      )}
    </section>
  );
}

// const WholeContainer = styled.div`
/* margin: 1rem 0; */

/* display: grid; */
/* grid-template-columns: 4fr 2fr; */
/* grid-gap: 1rem; */
/* align-items: start; */

/* .analysis {
    grid-column: 1 / 2;
    grid-row: 1 / 3;

    @media (max-width: 1100px) {
      grid-column: auto;
      grid-row: auto;

      order: 1;
    }
  } */

/* @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  } */
// `;

// const Top = styled.div`
//   display: flex;
//   gap: 1em;

//   ul {
//     display: flex;
//     align-items: center;
//     /* margin-top: 1em; */

//     li {
//       font-size: 0.8rem;
//       font-weight: 600;
//       border-radius: ${(p) => p.theme.style.borderRadius};
//       padding: 0.5rem 1rem;
//       background-color: ${(p) => p.theme.palette.primary};
//       color: ${(p) => p.theme.palette.white};

//       &:not(:first-child) {
//         margin-left: 1em;
//       }
//     }
//   }
// `;
