import { useEffect } from 'react';

import { Select } from 'components';
import { commonObject } from 'interfaces';
import { commonProps, IActionTypes, IOptionTypes } from 'interfaces/pages/strategy';
import { Buy, CallItem, Item, LeftSelectContainer, PutItem, RightSelectContainer, Sell } from './style';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addTrade, deleteTrade, updateTradeLot } from 'redux/slices/strategy';
import { Theme } from 'constants/theme';
import { floatFormatter, getOptionChainId } from 'functions';

export default function LTP({ data }: commonProps) {
  const trades = useAppSelector((state) => state.strategy.trade.values);

  useEffect(() => {
    if (trades.length > 0) {
      const activeItem = document.getElementById(`${trades[0].strike}`);

      if (activeItem) activeItem.scrollIntoView();
    }
  }, [trades]);

  return (
    <>
      <div className="py-2 flex justify-between">
        <div>
          <h3>CALL LTP</h3>
        </div>
        <div>
          <h3>Strike</h3>
        </div>
        <div>
          <h3>PUT LTP</h3>
        </div>
      </div>
      <div className="main sliderMainContent">
        {Object.values(data).map((val, ind) => {
          return <Row key={ind} data={val} />;
        })}
      </div>
    </>
  );
}

const Row = ({ data }: { data: commonObject[] }) => {
  const dispatch = useAppDispatch();

  const optionCall = useAppSelector((state) => state.strategy.trade.values).find(
    (val) => `${val.strike}-${val.type}` === `${data[0]?.strike}-${data[0]?.option_type}`,
  );
  const optionPut = useAppSelector((state) => state.strategy.trade.values).find(
    (val) => `${val.strike}-${val.type}` === `${data[1]?.strike}-${data[1]?.option_type}`,
  );

  const activeExpiryDate = useAppSelector((state) => state.expiryDates.activeOption);
  const stock = useAppSelector((state) => state.global.stock);

  const addToStore = (BorS: IActionTypes, type: IOptionTypes, index: number, lots: number = 1) => {
    dispatch(
      addTrade({
        active: true,
        BorS,
        expiry: activeExpiryDate,
        strike: data[index].strike,
        type,
        lots,
        price: data[index].price,
        iv: data[index].iv,
        id: getOptionChainId(data[index].strike, BorS, type),
      }),
    );
  };

  return (
    <Item id={`${data[0].strike}`}>
      <CallItem className="call" bgColor={stock.atm_strike > data[0].strike ? Theme.palette.lightYellow : Theme.palette.white}>
        <p>{floatFormatter(data[0].price)}</p>

        {optionCall?.type === 'CE' && (
          <LeftSelectContainer
            className="counter-left"
            selectedOptionColor={
              optionCall?.type === 'CE' && optionCall.BorS === 'buy'
                ? Theme.palette.primary
                : optionCall?.type === 'CE' && optionCall.BorS === 'sell'
                ? Theme.palette.danger
                : Theme.palette.black
            }
          >
            <p>{data[0].lotsize} x</p>
            <Select
              style={{ width: '55px', fontSize: 14 }}
              value={{
                label: optionCall.lots.toString(),
                value: optionCall.lots.toString(),
              }}
              onChange={(val) => dispatch(updateTradeLot({ id: optionCall.id, lots: Number(val?.label) }))}
              options={[...Array(150)].map((val, ind) => ({
                label: ind.toString(),
                value: ind.toString(),
              }))}
            />
          </LeftSelectContainer>
        )}
      </CallItem>

      <div className="strike">
        <Buy
          onClick={() => {
            // ? Delete or Add
            if (optionCall?.id === getOptionChainId(`${data[0]?.strike}` ?? '', 'buy', data[0]?.option_type as IOptionTypes)) {
              dispatch(deleteTrade(getOptionChainId(`${data[0]?.strike}` ?? '', 'buy', data[0]?.option_type as IOptionTypes)));
              return;
            }

            addToStore('buy', 'CE', 0, optionCall?.lots);
          }}
          active={optionCall?.id === getOptionChainId(`${data[0]?.strike}` ?? '', 'buy', data[0]?.option_type as IOptionTypes)}
          className="buy"
        >
          <p>B</p>
        </Buy>

        <Sell
          onClick={() => {
            if (optionCall?.id === getOptionChainId(`${data[0]?.strike}` ?? '', 'sell', data[0]?.option_type as IOptionTypes)) {
              dispatch(deleteTrade(getOptionChainId(`${data[0]?.strike}` ?? '', 'sell', data[0]?.option_type as IOptionTypes)));
              return;
            }
            addToStore('sell', 'CE', 0, optionCall?.lots);
          }}
          active={optionCall?.id === getOptionChainId(`${data[0]?.strike}` ?? '', 'sell', data[0]?.option_type as IOptionTypes)}
          className="sell"
        >
          <p>S</p>
        </Sell>

        <div className="value">
          <p>{data[0].strike}</p>
        </div>

        <Buy
          onClick={() => {
            if (optionPut?.id === getOptionChainId(`${data[0]?.strike}` ?? '', 'buy', data[1]?.option_type as IOptionTypes)) {
              dispatch(deleteTrade(getOptionChainId(`${data[0]?.strike}` ?? '', 'buy', data[1]?.option_type as IOptionTypes)));
              return;
            }
            addToStore('buy', 'PE', 1, optionPut?.lots);
          }}
          active={optionPut?.id === getOptionChainId(`${data[0]?.strike}` ?? '', 'buy', data[1]?.option_type as IOptionTypes)}
          className="buy"
        >
          <p>B</p>
        </Buy>

        <Sell
          onClick={() => {
            if (optionPut?.id === getOptionChainId(`${data[0]?.strike}` ?? '', 'sell', data[1]?.option_type as IOptionTypes)) {
              dispatch(deleteTrade(getOptionChainId(`${data[0]?.strike}` ?? '', 'sell', data[1]?.option_type as IOptionTypes)));
              return;
            }
            addToStore('sell', 'PE', 1, optionPut?.lots);
          }}
          active={optionPut?.id === getOptionChainId(`${data[0]?.strike}` ?? '', 'sell', data[1]?.option_type as IOptionTypes)}
          className="sell"
        >
          <p>S</p>
        </Sell>
      </div>

      <PutItem className="put" bgColor={stock.atm_strike < data[0].strike ? Theme.palette.lightYellow : Theme.palette.white}>
        <p>{floatFormatter(data[1].price)}</p>

        {optionPut?.type === 'PE' && (
          <RightSelectContainer
            className="counter-right"
            selectedOptionColor={
              optionPut?.type === 'PE' && optionPut.BorS === 'buy'
                ? Theme.palette.primary
                : optionPut?.type === 'PE' && optionPut.BorS === 'sell'
                ? Theme.palette.danger
                : Theme.palette.black
            }
          >
            <p>{data[0].lotsize} x</p>
            <Select
              style={{ width: '55px', fontSize: 14 }}
              value={{
                label: optionPut.lots.toString(),
                value: optionPut.lots.toString(),
              }}
              onChange={(val) => dispatch(updateTradeLot({ id: optionPut.id, lots: Number(val?.label) }))}
              options={[...Array(150)].map((val, ind) => ({
                label: (1 + ind).toString(),
                value: (1 + ind).toString(),
              }))}
            />
          </RightSelectContainer>
        )}
      </PutItem>
    </Item>
  );
};
