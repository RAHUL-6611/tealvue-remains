import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Counter, Select } from 'components';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import Slider from './Slider';
import { Container, Content, Top } from './style';
import { deleteTrade, tradeType, updateTradeExpiry, updateTradeLot, updateTradeStrike } from 'redux/slices/strategy';
import { commonObject, selectItemProps } from 'interfaces';
import { floatFormatter } from 'functions';

export default function Strategy({ wholeData }: { wholeData: commonObject }) {
  const [openSlider, setOpenSlider] = useState(false);
  const tradesState = useAppSelector((state) => state.strategy.trade.values);

  useEffect(() => {
    if (openSlider) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [openSlider]);

  return (
    <div>
      <Container>
        <Top>
          <h1>New Strategy</h1>

          <div className="flex items-center gap-2">
            <h1 className="text-sm">
              <span className="rounded-lg bg-t1Primary px-2 py-[2px] mr-2 text-white">
                {tradesState.filter((val) => val.active).length}
              </span>
              Trade selected
            </h1>

            <span className="border-2"></span>

            <button className="flex items-center gap-2">
              <span>Clear</span>
              <span className="icon-delete text-xl" />
            </button>
          </div>
        </Top>

        <CustomContent>
          <div className="main">
            <Table wholeData={wholeData} />
          </div>

          <div className="buttonContainer">
            <button onClick={() => setOpenSlider(true)}>EDIT/ADD</button>
            <button>SAVE</button>
          </div>
        </CustomContent>
      </Container>

      <Slider open={openSlider} setOpen={setOpenSlider} />
    </div>
  );
}

function Table({ wholeData }: { wholeData: commonObject }) {
  const tradesState = useAppSelector((state) => state.strategy.trade.values);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>B/S</th>
            <th>EXPIRY</th>
            <th>STRIKE</th>
            <th>LOTS</th>
            <th>CE/PE</th>
            <th>IV</th>
            <th>PRICE</th>
          </tr>
        </thead>

        <tbody>
          {tradesState.map((val, ind) => {
            return <Row wholeData={wholeData} key={ind} value={val} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

function Row({ value, wholeData }: { value: tradeType; wholeData: commonObject }) {
  const expiryDates = useAppSelector((state) => state.expiryDates.future);
  const dispatch = useAppDispatch();

  return (
    <tr className="h-4 relative">
      <td className="flex justify-center items-center w-5">
        <div className="h-full w-full">
          <span
            className="icon-trash text-2xl cursor-pointer hover:text-red-500"
            onClick={() => {
              dispatch(deleteTrade(value.id));
            }}
          />
        </div>
      </td>

      <td align="center" className={`first ${value.BorS === 'buy' ? 'buy-option' : 'sell-option'} w-8 rounded-lg`}>
        {value.BorS[0].toUpperCase()}
      </td>

      <td align="center" className="w-40 px-4">
        <Select
          style={{ width: '100%' }}
          value={value.expiry}
          options={expiryDates.map((data) => ({
            value: data,
            label: data,
          }))}
          onChange={(val) => {
            dispatch(
              updateTradeExpiry({
                id: value.id,
                expiry: val as selectItemProps,
              }),
            );
          }}
        />
      </td>

      <td align="center" className="w-28">
        <Counter
          small
          value={value.strike}
          onMinusClick={() => {
            if (value.strike === wholeData['payoff_range'].x_min) {
              return;
            }
            dispatch(
              updateTradeStrike({
                strike: value.strike,
                id: value.id,
                type: 'dec',
                CorP: value.type === 'CE' ? 'C' : 'P',
              }),
            );
          }}
          onPlusClick={() => {
            if (value.strike === wholeData['payoff_range'].x_max) {
              return;
            }
            dispatch(
              updateTradeStrike({
                strike: value.strike,
                id: value.id,
                type: 'inc',
                CorP: value.type === 'CE' ? 'C' : 'P',
              }),
            );
          }}
        />
      </td>

      <td align="center" className="w-24 px-2">
        <Select
          style={{ width: '100%' }}
          value={{
            value: value.lots.toString(),
            label: value.lots.toString(),
          }}
          onChange={(val) => dispatch(updateTradeLot({ id: value.id, lots: Number(val?.label) }))}
          options={[...Array(150)].map((val, ind) => ({
            label: (1 + ind).toString(),
            value: (1 + ind).toString(),
          }))}
        />
      </td>

      <td align="center" className="common">
        {value.type}
      </td>

      <td align="center">{floatFormatter(value.iv)}</td>

      <td align="center" className="common">
        {value.price}
      </td>
    </tr>
  );
}

const CustomContent = styled(Content)`
  display: flex;
  flex-direction: column;
  min-height: 80%;

  h1 {
    span {
      color: ${(p) => p.theme.palette.primary};
    }
  }

  .main {
    flex-grow: 1;

    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0 1rem;
      overflow: auto;

      th {
        font-size: 0.8rem;
        color: ${(p) => p.theme.palette.secondary};
      }

      td {
        font-size: 0.8rem;
        font-weight: 600;
      }

      .first {
        color: ${(p) => p.theme.palette.white};
        background-color: ${(p) => p.theme.palette.primary};
        box-shadow: ${(p) => p.theme.style.boxShadow};
      }

      .buy-option {
        background-color: ${(p) => p.theme.palette.primary};
      }

      .sell-option {
        background-color: ${(p) => p.theme.palette.danger};
      }
    }
  }

  .buttonContainer {
    display: flex;
    justify-content: flex-end;
    gap: 2em;

    button {
      color: ${(p) => p.theme.palette.secondary};
      background-color: transparent;
      border: none;
      border: ${(p) => `2px solid ${p.theme.palette.primary}`};
      font-family: inherit;
      cursor: pointer;
      outline: none;
      padding: 0.5em 1.5em;
      border-radius: ${(p) => p.theme.style.borderRadius};
    }
  }
`;
