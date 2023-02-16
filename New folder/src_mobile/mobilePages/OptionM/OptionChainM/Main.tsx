import { useCallback, useEffect, useState } from 'react';
import { CellStyleFunc, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Table from '../../../pages/Future/Screener/Table';
import { amountFormatter, floatFormatter, perCellStyle, perFormatter } from 'functions';
import { ScreenerDiv } from 'styles/common';
import { commonObject, customAxiosError, dashboardGraphProps } from 'interfaces';
import { Loader } from 'components';
import { Theme } from 'constants/theme';
import { useAppSelector } from 'redux/hooks';

export default function Main({ expiryOption }: dashboardGraphProps) {
  const { type } = useParams<{ type: string }>();
  const [loading, setLoading] = useState(true);
  const [strikePrice, setStrikePrice] = useState(0);
  const [opData, setOpData] = useState();
  const stockList = useAppSelector((state) => state.global.stockList);

  useEffect(() => {
    setStrikePrice(stockList.find((val) => val.symbol === type)?.atm_strike ?? 0);
  }, [stockList, type]);

  const getData = async (expiry_at: string, type: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/v1/api/stock/option-chain/${type}?expiry_at=${expiry_at}`);
      setOpData(data.tableData);
      console.log(data);
      setLoading(false);
    } catch (error) {
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    }
  };
  const memoizedGetData = useCallback(getData, []);

  useEffect(() => {
    if (expiryOption.value) {
      memoizedGetData(expiryOption.value, type);
    }
  }, [memoizedGetData, expiryOption, type]);

  return (
    <>
      {loading && <Loader />}
      {/* {opData && <Table tableData = {opData} />} */}
    </>
  );
}
