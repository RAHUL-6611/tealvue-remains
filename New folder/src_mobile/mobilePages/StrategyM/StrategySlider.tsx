import { Counter } from 'components';
// import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateExpiry, updateNiftyTarget } from 'redux/slices/strategy';
import { commonObject } from 'interfaces';
import { useCallback, useEffect } from 'react';
import moment from 'moment';

export default function StrategySlider({
  wholeData,
  setTargetPrice,
  target,
}: {
  wholeData: commonObject;
  setTargetPrice: React.Dispatch<React.SetStateAction<number>>;
  target: number;
}) {
  // const globalTarget = useAppSelector((state) => state.strategy.nifty_target);
  const expiry = useAppSelector((state) => state.strategy.expiry_date);
  const stock = useAppSelector((state) => state.global.stock);
  const activeStock = useAppSelector((state) => state.global.stock.value);
  const minDate = moment.min(useAppSelector((state) => state.strategy.trade.values.map((val) => moment(val.expiry.label))));

  const dispatch = useAppDispatch();

  const initializeNifty = useCallback(() => {
    dispatch(updateNiftyTarget(Math.round(stock.cash)));
  }, [dispatch, stock.cash]);

  useEffect(() => {
    if (wholeData['payoff_range']) {
      initializeNifty();
    }
  }, [initializeNifty, wholeData]);

  const handleOnChangeSlider = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetPrice(+e.target.value);
    // dispatch(updateNiftyTarget(+e.target.value));

    // ? here call the api to update the data
  };

  const handleTargetIncrementDecrement = (target: number) => {
    if (wholeData['payoff_range'].x_min === target) return;
    setTargetPrice(target);
    // dispatch(updateNiftyTarget(target - 1));
  };

  return (
    <div className="flex justify-between items-start pb-4">
      <div className="w-6/12">
        <div className="mb-2 flex justify-between">
          <div className="flex-col justify-start items-start">
            <h1 className="capitalize font-semibold">{activeStock.value} Target</h1>
            <p onClick={initializeNifty} className="w-full text-left text-t1Primary cursor-pointer">
              Reset
            </p>
          </div>

          <Counter
            value={target}
            onMinusClick={() => handleTargetIncrementDecrement(target - 1)}
            onPlusClick={() => handleTargetIncrementDecrement(target + 1)}
          />

          {/* <div onClick={initializeNifty} className="px-4 py-2 cursor-pointer bg-t1Primary">
            RESET
          </div> */}
        </div>

        <input
          type="range"
          step={1}
          onChange={handleOnChangeSlider}
          min={wholeData['payoff_range'].x_min}
          max={wholeData['payoff_range'].x_max}
          value={target}
          className="range range-primary range-lg"
        />
      </div>

      <div className="flex justify-between flex-col items-center gap-4">
        <h1 className="font-semibold">DAYS TO EXPIRY : {minDate.diff(moment(expiry).startOf('day'), 'days')}D</h1>

        <div className="flex items-center gap-2">
          <span
            className="icon-arrow p-2 shadow-3xl cursor-pointer rotate-180"
            onClick={() => {
              if (moment().startOf('day').diff(moment(expiry).startOf('day'), 'days') === 0) return;
              dispatch(updateExpiry(moment(expiry).subtract(1, 'days').toDate()));
            }}
          />

          <h2 className="w-28 text-center">{moment(expiry).format('ddd, DD MMM')}</h2>

          <span
            className="icon-arrow p-2 shadow-3xl cursor-pointer"
            onClick={() => {
              if (minDate.diff(moment(expiry).startOf('day'), 'days') === 0) return;
              dispatch(updateExpiry(moment(expiry).add(1, 'days').toDate()));
            }}
          />
        </div>
      </div>
    </div>
  );
}

// const Section = styled.section`
//   border-radius: ${(p) => p.theme.style.borderRadius};
// `;

// const Container = styled.div`
//   button {
//     padding: 0.8em 1.5em;
//     font-weight: 600;
//     font-family: inherit;
//   }

//   .top {
//     margin-bottom: 1em;
//     gap: 1em;

//     &.expiry {
//       margin-top: 1em;
//     }
//   }

//   div {
//     display: flex;
//     align-items: center;

//     h2 {
//       margin: 0 1em;
//     }

//     span {
//       color: ${(p) => p.theme.palette.secondary};
//       padding: 0.5em;
//       box-shadow: ${(p) => p.theme.style.boxShadow};
//       border-radius: ${(p) => p.theme.style.borderRadius};
//       cursor: pointer;

//       &:first-child {
//         transform: rotate(180deg);
//       }

//       &::before {
//         font-size: 2rem;
//       }
//     }
//   }

//   &:not(:last-child) {
//     border-bottom: ${(p) => p.theme.style.borderLight1};
//     border-color: ${(p) => p.theme.palette.lightGrey};
//   }
// `;
