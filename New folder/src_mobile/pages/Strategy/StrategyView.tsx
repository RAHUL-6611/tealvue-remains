import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Tab } from '@headlessui/react';

import Analysis from './Analysis';
import Strategy from './Strategy';
import Chart from './Chart';
import { commonObject, customAxiosError } from 'interfaces';
import { Loader, Select } from 'components';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateTradeList, updateWholeData } from 'redux/slices/strategy';
import { getOptionChainId } from 'functions';
import Greeks from './Chart/Greeks';
import { updateStrategySelection, updateStrategyCurrentSelection } from '../../redux/slices/global';
import { strategyTypes } from './data';

export default function StrategyView() {
  const activeStock = useAppSelector((state) => state.global.stock.value);
  const trades = useAppSelector((state) => state.strategy.trade.values);
  const expiryDate = useAppSelector((state) => state.strategy.expiry_date);
  const currentPrice = useAppSelector((state) => state.global.stock.cash);
  const targetPrice = useAppSelector((state) => state.strategy.nifty_target);

  const expiryOption = useAppSelector((state) => state.expiryDates.activeOption);
  const strategySelection = useAppSelector((state) => state.global.strategy?.selection);
  const strategyCurrentSelection = useAppSelector((state) => state.global.strategy?.current);
  const wholeData = useAppSelector((state) => state.strategy.wholeData);

  const [loading, setLoading] = useState(true);
  const [target, setTargetPrice] = useState<number>(targetPrice || 0);

  const dispatch = useAppDispatch();

  const getData = async () => {
    setLoading(true);

    try {
      const { data } = await axios.post('/v1/api/strategy/builder', {
        underlying_symbol: activeStock.value,
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

      dispatch(updateWholeData(data.payload));

      setLoading(false);
    } catch (error) {
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    }
  };

  const getInitialData = async () => {
    setLoading(true);

    try {
      const { data } = await axios.post('/v1/api/strategy/preset', {
        underlying_symbol: activeStock.value,
        expiry_at: expiryOption.value,
        strategy_type: strategyCurrentSelection?.value?.toUpperCase(),
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
    } finally {
      setLoading(false);
    }
  };

  const getSelectionChoiceList = (choice: string) => {
    switch (choice) {
      case 'bearish':
        return strategyTypes.filter((strategyType) => strategyType.type === 'bearish');

      case 'bullish':
        return strategyTypes.filter((strategyType) => strategyType.type === 'bullish');

      case 'neutral':
        return strategyTypes.filter((strategyType) => strategyType.type === 'neutral');

      case 'volatile':
        return strategyTypes.filter((strategyType) => strategyType.type === 'volatile');

      default:
        return strategyTypes;
    }
  };

  useEffect(() => {
    if (expiryOption?.value && activeStock?.value && strategyCurrentSelection) getInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStock?.value, expiryOption?.value, strategyCurrentSelection?.value]);

  useEffect(() => {
    if (trades.length) getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trades]);

  return (
    <section>
      {/* <Button onClick={() => history.push('/strategy/dashboard')}>SELECT STRATEGY</Button> */}

      {loading && Object.keys(wholeData).length === 0 && <Loader />}

      {Object.keys(wholeData ?? {}).length > 0 && (
        <div className="flex pt-4 gap-4">
          <div className="flex flex-col gap-4 w-8/12">
            <Chart loader={loading} {...{ setTargetPrice, target, wholeData }} />

            <div className="flex gap-4 h-full">
              <div className="h-full flex-1 flex flex-col justify-between gap-4"></div>
            </div>

            <Strategy wholeData={wholeData} />
          </div>

          <div className="w-4/12">
            <Tab.Group defaultIndex={0}>
              <Tab.List>
                <div className="flex gap-2">
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={`${
                          selected ? 'bg-t1Primary text-white' : 'bg-white '
                        } w-6/12 py-2.5 text-sm leading-5 font-medium text-black rounded-lg  focus:outline-none focus:ring-2 ring-offset-2 ring-offset-t1Primary ring-white ring-opacity-60`}
                      >
                        Analysis
                      </button>
                    )}
                  </Tab>

                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={`text-black ${
                          selected ? 'bg-t1Primary text-white' : 'bg-white '
                        } w-6/12 py-2.5 text-sm leading-5 font-medium   rounded-lg  focus:outline-none focus:ring-2 ring-offset-2 ring-offset-t1Primary ring-white ring-opacity-60`}
                      >
                        Greeks
                      </button>
                    )}
                  </Tab>
                </div>
              </Tab.List>

              <Tab.Panels>
                <Tab.Panel>
                  <div className="flex flex-col gap-4 pt-4">
                    <div className="flex items-center gap-2 p-4 bg-white h-max rounded-lg shadow-3xl">
                      <div className="h-full flex flex-col flex-1 gap-5">
                        <p className="text-2xl">Strategy</p>

                        <div className="flex flex-col gap-4">
                          <Select
                            options={[
                              {
                                value: 'all',
                                label: 'ALL',
                              },
                              {
                                value: 'bullish',
                                label: 'BULLISH',
                              },
                              {
                                value: 'bearish',
                                label: 'BEARISH',
                              },
                              {
                                value: 'volatile',
                                label: 'VOLATILE',
                              },
                              {
                                value: 'neutral',
                                label: 'NEUTRAL',
                              },
                            ]}
                            onChange={(choice) => {
                              if (choice) {
                                dispatch(updateStrategySelection(choice));

                                const defaultChoice = getSelectionChoiceList(choice.value);

                                dispatch(
                                  updateStrategyCurrentSelection({
                                    label: defaultChoice[0]?.title,
                                    value: defaultChoice[0]?.path,
                                  }),
                                );
                              }
                            }}
                            value={strategySelection}
                          />

                          <Select
                            options={getSelectionChoiceList(strategySelection?.value).map((option) => ({
                              value: option.path.toLowerCase(),
                              label: option.title,
                            }))}
                            onChange={(sub_choice) => {
                              if (sub_choice) dispatch(updateStrategyCurrentSelection(sub_choice));
                            }}
                            value={strategyCurrentSelection}
                          />
                        </div>
                      </div>

                      <div className="flex justify-center flex-col items-center">
                        <img
                          className="p-4 w-22 h-22"
                          src={`/assets/strategy/${strategyCurrentSelection?.label}.png`}
                          alt={'BULL SPREAD CALL'}
                        />
                      </div>
                    </div>

                    <Analysis wholeData={wholeData} />
                  </div>
                </Tab.Panel>

                <Tab.Panel>
                  <Greeks />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      )}
    </section>
  );
}
