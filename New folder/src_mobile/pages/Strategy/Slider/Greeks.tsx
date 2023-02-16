import { useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components';

import { Select } from 'components';
import { Buy, Item, LeftSelectContainer, RightSelectContainer, Sell } from './style';
import { commonProps, IActionTypes, IOptionTypes } from 'interfaces/pages/strategy';
import { commonObject } from 'interfaces';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addTrade, deleteTrade, updateTradeLot } from 'redux/slices/strategy';
import { getOptionChainId, floatFormatter } from 'functions';
import { Theme } from 'constants/theme';

export default function Greeks({ data }: commonProps) {
  const trades = useAppSelector((state) => state.strategy.trade.values);

  useEffect(() => {
    if (!trades.length) return;

    const activeItem = document.getElementById(`${trades[0].strike}`);
    if (activeItem) {
      activeItem.scrollIntoView();
    }
  }, [trades]);

  useLayoutEffect(() => {
    const contents = document.getElementsByClassName('value') as HTMLCollectionOf<HTMLElement>;
    const headMiddle = document.getElementById('greekHeaderMiddle');
    if (contents[0] && headMiddle) {
      headMiddle.style.width = `${contents[0].getBoundingClientRect().width}px`;
    }
  }, []);

  return (
    <Container>
      <div className="greekHeader">
        <div>
          <h3>CALL Delta</h3>
        </div>
        <div id="greekHeaderMiddle">
          <div>
            <h3>IV</h3>
          </div>
          <div>
            <h3>Strike</h3>
          </div>
          <div>
            <h3>IV</h3>
          </div>
        </div>
        <div style={{ paddingRight: '1em' }}>
          <h3>PUT Delta</h3>
        </div>
      </div>
      <div className="main sliderMainContent">
        {Object.values(data).map((val, ind) => {
          return <Row key={ind} index={ind} data={val} />;
        })}
      </div>
    </Container>
  );
}

const Row = ({ index, data }: { index: number; data: commonObject[] }) => {
  const dispatch = useAppDispatch();

  const optionCall = useAppSelector((state) => state.strategy.trade.values).find(
    (val) => `${val.strike}-${val.type}` === `${data[0].strike}-${data[0]?.option_type}`,
  );

  const optionPut = useAppSelector((state) => state.strategy.trade.values).find(
    (val) => `${val.strike}-${val.type}` === `${data[1].strike}-${data[1]?.option_type}`,
  );

  const futureDate = useAppSelector((state) => state.expiryDates.activeFuture);

  const addToStore = (BorS: IActionTypes, type: IOptionTypes, index: number, lots: number = 1) => {
    dispatch(
      addTrade({
        active: true,
        BorS,
        expiry: futureDate,
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
      <div className="call">
        <p>{floatFormatter(data[0].delta)}</p>
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
      </div>
      <div className="strike">
        <Buy
          onClick={() => {
            if (optionCall?.type === 'CE' && optionCall.BorS === 'buy') {
              dispatch(deleteTrade(data[0].strike));
              return;
            }
            addToStore('buy', 'CE', 0, optionCall?.lots);
          }}
          active={optionCall?.type === 'CE' && optionCall.BorS === 'buy'}
          className="buy"
        >
          <p>B</p>
        </Buy>
        <Sell
          onClick={() => {
            if (optionCall?.type === 'CE' && optionCall.BorS === 'sell') {
              dispatch(deleteTrade(data[0].strike));
              return;
            }
            addToStore('sell', 'CE', 0, optionCall?.lots);
          }}
          active={optionCall?.type === 'CE' && optionCall.BorS === 'sell'}
          className="sell"
        >
          <p>S</p>
        </Sell>
        <div className="value">
          <div>
            <p>{floatFormatter(data[0].iv)}</p>
          </div>
          <div>
            <p>{data[0].strike}</p>
          </div>
          <div>
            <p>{floatFormatter(data[1].iv)}</p>
          </div>
        </div>
        <Buy
          onClick={() => {
            if (optionPut?.type === 'PE' && optionPut.BorS === 'buy') {
              dispatch(deleteTrade(data[0].strike));
              return;
            }
            addToStore('buy', 'PE', 1, optionPut?.lots);
          }}
          active={optionPut?.type === 'PE' && optionPut.BorS === 'buy'}
          className="buy"
        >
          <p>B</p>
        </Buy>
        <Sell
          onClick={() => {
            if (optionPut?.type === 'PE' && optionPut.BorS === 'sell') {
              dispatch(deleteTrade(data[0].strike));
              return;
            }
            addToStore('sell', 'PE', 1, optionPut?.lots);
          }}
          active={optionPut?.type === 'PE' && optionPut.BorS === 'sell'}
          className="sell"
        >
          <p>S</p>
        </Sell>
      </div>
      <div className="put">
        <p>{floatFormatter(data[1].delta)}</p>
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
      </div>
    </Item>
  );
};

const Container = styled.div`
  width: 100%;

  .greekHeader {
    display: flex;
    justify-content: space-between;

    h3 {
      color: ${(p) => p.theme.palette.secondary};
      font-size: 1.5rem;
      font-weight: 500;
    }

    & > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  #greekHeaderMiddle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1em;
  }
`;
