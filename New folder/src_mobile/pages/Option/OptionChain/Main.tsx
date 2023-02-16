import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './Table';
import { customAxiosError, IOptionChainResponse } from 'interfaces';
import { Loader } from 'components';
import { useAppSelector } from 'redux/hooks';

export default function Main() {
  const [loading, setLoading] = useState(true);
  const [, setStrikePrice] = useState(0);
  const [opData, setOpData] = useState<IOptionChainResponse>();

  const stockList = useAppSelector((state) => state.global.stockList);
  const activeStock = useAppSelector((state) => state.global.stock);
  const expiryOption = useAppSelector((state) => state.expiryDates.activeOption);

  useEffect(() => {
    setStrikePrice(stockList.find((val) => val.symbol === activeStock.value.value)?.atm_strike ?? 0);
  }, [activeStock.value, stockList]);

  useEffect(() => {
    if (!expiryOption.value || !activeStock.value.value) return;

    const getData = async () => {
      setLoading(true);

      try {
        const { data } = await axios.get(`/v1/api/stock/option-chain/${activeStock.value.value}?expiry_at=${expiryOption.value}`);
        setOpData(data as IOptionChainResponse);
      } catch (error) {
        const err = error as customAxiosError;
        err.handleGlobally && err.handleGlobally();
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [activeStock.value.value, expiryOption.value]);

  return (
    <>
      {loading && <Loader />}
      <div className="w-full">
        {opData && (
          <Table tableData={opData?.tableData ?? []} opScreener={true} atm_stike={opData.data?.atm_strike ? +opData.data?.atm_strike : 0} />
        )}
      </div>
    </>
  );
}
