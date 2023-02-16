import { useCallback, useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { ColumnApi, GridApi, GridReadyEvent, IDatasource } from 'ag-grid-community';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import axios from 'axios';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { Theme } from 'constants/theme';
import { amountFormatter, expandShortCode, floatFormatter, perCellStyle, perFormatter } from 'functions';
import { ActiveType, Loader } from 'components';
import { activeItemProps, commonObject, customAxiosError, dashboardGraphProps, screenerLocation } from 'interfaces';
import { ScreenerDiv } from 'styles/common';
import { FutureColumns } from './future-columns.enum';

const activeValues: activeItemProps[] = [
  {
    title: 'Most active by value',
    id: 'active_value',
    col: 'ttv',
  },
  {
    title: 'OI gainer',
    id: 'oi_gainer',
    col: 'oi_change',
  },
  {
    title: 'OI losers',
    id: 'oi_loser',
    col: 'oi_change',
  },
  {
    title: 'Contract gainers',
    id: 'contract_gainer',
    col: 'volume_change',
  },
  {
    title: 'Premium',
    id: 'premium',
    col: 'basis',
  },
  {
    title: 'Discount',
    id: 'discount',
    col: 'basis',
  },
  {
    title: 'Most active contracts',
    id: 'active_contracts',
    col: 'volume',
  },
  {
    title: 'Price Gainers',
    id: 'price_gainer',
    col: 'price_change',
  },
  {
    title: 'Price Losers',
    id: 'price_loser',
    col: 'price_change',
  },
];

interface customProps extends dashboardGraphProps {
  buttonRef: React.RefObject<HTMLButtonElement>;
}

export default function FutureScreenerTable({ expiryOption, buttonRef }: customProps) {
  const [active, setActive] = useState<activeItemProps>(activeValues[0]);
  const [loading, setLoading] = useState(true);
  const [gridApi, setGridApi] = useState<GridApi>();
  const [gridColumnApi, setGridColumnApi] = useState<ColumnApi>();
  const history = useHistory();
  const { path } = useRouteMatch();
  const BLOCK_SIZE = 250;
  const { state } = useLocation<screenerLocation>();

  const getData = async (expiry_at: string, active: string, start: number, end: number) => {
    setLoading(true);
    try {
      const payload: commonObject = {
        screener_type: active,
        type: 'FUTURE',
        range: {
          start,
          end,
        },
      };
      if (expiry_at) payload.expiry_at = expiry_at;
      const { data } = await axios.post('v1/api/overview/screener', payload);

      setLoading(false);
      return {
        data: data.tableData ?? ([] as any[]),
        count: data.count,
      };
    } catch (error) {
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    }
  };
  const memoizedGetData = useCallback(getData, []);

  useEffect(() => {
    if (expiryOption.value) {
      const dataSource: IDatasource = {
        getRows: async function (params) {
          const res = await memoizedGetData(expiryOption.value, active.id, params.startRow, params.endRow);
          if (res?.count < BLOCK_SIZE) {
            params.successCallback(res?.data, params.startRow + res?.count);
          } else {
            params.successCallback(res?.data);
          }
        },
      };
      gridApi?.setDatasource(dataSource);
    }
  }, [active, gridApi, memoizedGetData, expiryOption.value, gridColumnApi]);

  function fixColumnSizes(columnApi: ColumnApi) {
    columnApi.setColumnWidth(FutureColumns.SYMBOL, 150);
    columnApi.setColumnWidth(FutureColumns.PRICE, 150);
    columnApi.setColumnWidth(FutureColumns.DAY_CHANGE_PERCENT, 100);
    columnApi.setColumnWidth(FutureColumns.VOLUME, 115);
    columnApi.setColumnWidth(FutureColumns.VOLUME_CHANGE_PERCENT, 120);
    columnApi.setColumnWidth(FutureColumns.TTV, 100);
    columnApi.setColumnWidth(FutureColumns.OI, 100);
    columnApi.setColumnWidth(FutureColumns.OI_CHANGE_PERCENT, 100);
    columnApi.setColumnWidth(FutureColumns.BASIS, 100);
    columnApi.setColumnWidth(FutureColumns.SPOT, 120);
    columnApi.setColumnWidth(FutureColumns.BUILD_UP, 150);
  }

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    fixColumnSizes(params.columnApi);
  };

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.onclick = () => {
        gridApi?.exportDataAsCsv({
          fileName: `Future ${active.title.toUpperCase()}_${expiryOption.value}`,
        });
      };
    }
  }, [active.title, buttonRef, expiryOption.value, gridApi]);

  useEffect(() => {
    if (state?.active) {
      const newActive = activeValues.find((val) => val.col === state.active);

      if (newActive) {
        setActive(newActive);
      }
    }
  }, [state]);

  return (
    <>
      <ActiveType values={activeValues} {...{ active, setActive }} />

      {loading && <Loader />}

      <ScreenerDiv className="ag-theme-material">
        <AgGridReact onGridReady={onGridReady} columnHoverHighlight={true} rowModelType={'infinite'} cacheBlockSize={BLOCK_SIZE}>
          <AgGridColumn
            field={FutureColumns.SYMBOL}
            headerName="SYMBOL"
            onCellClicked={(e) => history.push(`${path}/${e.value}`)}
            cellStyle={{ color: Theme.palette.primary, fontWeight: 600, cursor: 'pointer' }}
          />
          <AgGridColumn headerName="Price" field={FutureColumns.PRICE} valueFormatter={(p) => floatFormatter(p.value)} />
          <AgGridColumn
            headerName="% Day Change"
            valueFormatter={(p) => perFormatter(p.value)}
            cellStyle={perCellStyle}
            field={FutureColumns.DAY_CHANGE_PERCENT}
          />
          <AgGridColumn headerName="Volume Contracts" field={FutureColumns.VOLUME} />
          <AgGridColumn
            headerName="% Volume Contracts"
            valueFormatter={(p) => perFormatter(p.value)}
            cellStyle={perCellStyle}
            field={FutureColumns.VOLUME_CHANGE_PERCENT}
          />
          <AgGridColumn headerName="TTV" valueFormatter={(p) => floatFormatter(p.value)} field={FutureColumns.TTV} />
          <AgGridColumn headerName="OI" valueFormatter={(p) => amountFormatter(p.value)} field={FutureColumns.OI} />
          <AgGridColumn
            headerName="% OI"
            valueFormatter={(p) => perFormatter(p.value)}
            cellStyle={perCellStyle}
            field={FutureColumns.OI_CHANGE_PERCENT}
          />
          <AgGridColumn headerName="Basis" valueFormatter={(p) => floatFormatter(p.value)} field={FutureColumns.BASIS} />
          <AgGridColumn headerName="SPOT" valueFormatter={(p) => floatFormatter(p.value)} field={FutureColumns.SPOT}></AgGridColumn>
          <AgGridColumn
            headerName="Build Up"
            valueFormatter={(p) => expandShortCode(p.value)}
            field={FutureColumns.BUILD_UP}
          ></AgGridColumn>
        </AgGridReact>
      </ScreenerDiv>
    </>
  );
}
