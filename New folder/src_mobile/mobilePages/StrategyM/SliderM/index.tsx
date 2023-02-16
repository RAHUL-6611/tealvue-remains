import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// import { Theme } from 'constants/theme';
import { activeItemProps, commonObject, customAxiosError, selectItemProps } from 'interfaces';
import { ActiveType, Loader, SelectWithTitle } from 'components';
import LTP from './LTP';
import OI from './OI';
import Greeks from './Greeks';
import Future from './Future';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { GroupBase, OptionsOrGroups } from 'react-select';
import { updateActiveOption } from 'redux/slices/expiryDates';
import { updateWholeData, updateTradeType1, updateTradeType2, clearAllTrades } from 'redux/slices/strategy';

interface props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const firstValues: activeItemProps[] = [
  {
    title: 'OPT',
    id: 'opt',
  },
  // {
  //   title: 'FUT',
  //   id: 'fut',
  // },
];

const secondValues: activeItemProps[] = [
  {
    title: 'LTP',
    id: 'ltp',
  },
  {
    title: 'OI',
    id: 'oi',
  },
  {
    title: 'GREEKS',
    id: 'greeks',
  },
];

// const containerStyle = { backgroundColor: 'transparent', border: `2px solid ${Theme.palette.primary}` };

export default function Slider({ open, setOpen }: props) {
  const type1 = useAppSelector((state) => state.strategy.trade.option.type1);
  const type2 = useAppSelector((state) => state.strategy.trade.option.type2);
  const [firstActive, setFirstActive] = useState<activeItemProps>({
    id: type1,
    title: type1.toUpperCase(),
  });
  const [secondActive, setSecondActive] = useState<activeItemProps>({
    id: type2,
    title: type2.toUpperCase(),
  });
  const [loading, setLoading] = useState(true);
  const [wholeData, setWholeData] = useState<commonObject>({});
  const [expiryOptions, setExpiryOptions] = useState<OptionsOrGroups<selectItemProps, GroupBase<selectItemProps>>>([]);

  const expiryDates = useAppSelector((state) => state.expiryDates.option);
  const activeStock = useAppSelector((state) => state.global.stock.value);
  const expiryOption = useAppSelector((state) => state.expiryDates.activeOption);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (expiryDates.length) {
      setExpiryOptions(
        expiryDates.map((data) => ({
          value: data,
          label: data,
        })),
      );
    }
  }, [expiryDates]);

  useEffect(() => {
    if (firstActive.id === type1) return;
    dispatch(updateTradeType1(firstActive.id));
  }, [dispatch, firstActive, type1]);

  useEffect(() => {
    if (secondActive.id === type2) return;
    dispatch(updateTradeType2(secondActive.id));
  }, [dispatch, secondActive.id, type2]);

  useLayoutEffect(() => {
    const contents = document.getElementsByClassName('sliderMainContent') as HTMLCollectionOf<HTMLElement>;
    if (contents) {
      Array.from(contents).forEach((content) => {
        content.style.height = `calc(100vh - 9em - (${
          document.getElementById('header')?.getBoundingClientRect().height ??
          0 + (document.getElementById('top')?.getBoundingClientRect().height ?? 0)
        }px))`;
      });
    }
  }, [secondActive, firstActive, wholeData]);

  const getData = async (expiryDate: string, stockItem: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/v1/api/strategy/eod/option-chain/${stockItem}?expiry_at=${expiryDate}`);

      setLoading(false);
      setWholeData(data.per_expiry_data);
      dispatch(updateWholeData(data.per_expiry_data));
    } catch (error) {
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    }
  };

  const memoizedGetData = useCallback(getData, [dispatch]);

  useEffect(() => {
    if (expiryOption.value && activeStock.value) memoizedGetData(expiryOption.value, activeStock.value);
  }, [expiryOption, activeStock, memoizedGetData]);

  return (
    <Section open={open} className="shadow-3xl bg-slate-50">
      <div className="flex p-4 justify-between">
        <div className="flex items-center gap-2">
          <ActiveType
            itemStyle={{ borderRadius: '5px', fontSize: '1rem' }}
            values={firstValues}
            active={firstActive}
            setActive={setFirstActive}
          />

          {firstActive.id === 'opt' && (
            <SelectWithTitle
              title="Expire Date"
              options={expiryOptions}
              value={expiryOption}
              onChange={(val) => {
                if (val) dispatch(updateActiveOption(val));
              }}
            />
          )}

          <ActiveType
            itemStyle={{ fontSize: '1rem' }}
            values={secondValues}
            active={secondActive}
            setActive={setSecondActive}
            disabled={firstActive.id === 'fut'}
          />
        </div>

        <div className="flex gap-2 self-end">
          <button
            className="border-2 p-2 rounded-md hover:bg-slate-100 transition-colors duration-150"
            onClick={() => dispatch(clearAllTrades({}))}
          >
            CLEAR
          </button>

          <button className="border-2 p-2 rounded-md hover:bg-slate-100 transition-colors duration-150" onClick={() => setOpen(false)}>
            DONE
          </button>
        </div>
      </div>

      {loading && <Loader />}

      {Object.keys(wholeData ?? {}).length > 0 && (
        <Main>
          {firstActive.id === 'fut' ? (
            <Future data={wholeData.future_data} />
          ) : (
            <>
              {secondActive.id === 'ltp' && <LTP data={wholeData.option_data} />}
              {secondActive.id === 'oi' && <OI data={wholeData.option_data} />}
              {secondActive.id === 'greeks' && <Greeks data={wholeData.option_data} />}
            </>
          )}
        </Main>
      )}
    </Section>
  );
}

const Section = styled.section<{ open: boolean }>`
  position: fixed;
  /* background-color: ${(p) => p.theme.palette.white}; */
  border-top-left-radius: ${(p) => p.theme.style.borderRadius};
  top: 0;
  right: ${(p) => (p.open ? '0px' : '-50vw')};
  width: 50vw;
  height: 100vh;
  z-index: 10;
  transition: all 0.3s;

  @media (max-width: 1000px) {
    width: 60%;
    right: ${(p) => (p.open ? '0px' : '-60%')};
  }

  @media (max-width: 700px) {
    width: 90%;
    right: ${(p) => (p.open ? '0px' : '-90%')};
  }
`;

// const Top = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   gap: 2em;
//   padding: 1em;
//   padding-bottom: 0px;
// `;

// const Header = styled.div`
//   display: flex;
//   align-items: center;
//   border-bottom: ${(p) => p.theme.style.border};
// `;

const Main = styled.div`
  padding: 0 1rem 1rem 1rem;
  z-index: -1;

  .header {
    display: flex;
    justify-content: space-between;

    h3 {
      color: ${(p) => p.theme.palette.secondary};
      font-size: 1rem;
      font-weight: 500;
    }
  }

  .main {
    background-color: ${(p) => p.theme.palette.white};
    overflow: auto;
  }
`;
