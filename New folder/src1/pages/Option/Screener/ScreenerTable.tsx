import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { ColumnApi, GridApi, GridReadyEvent, IDatasource } from 'ag-grid-community';
import axios from 'axios';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { Theme } from 'constants/theme';
import { amountFormatter, expandShortCode, floatFormatter, perCellStyle, perFormatter, typeCellStyle } from 'functions';
import { ActiveType, Loader } from 'components';
import { activeItemProps, commonObject, customAxiosError, dashboardGraphProps, screenerLocation } from 'interfaces';
import { ScreenerDiv } from 'styles/common';
import { OptionColumns } from './option-columns.enum';

const activeValues: activeItemProps[] = [
  {
    title: 'Most Active Calls',
    id: 'active_value_calls',
    col: 'ttv',
  },
  {
    title: 'Most Active Puts',
    id: 'active_value_puts',
    col: 'ttv',
  },
  {
    title: 'OI Gainer Calls',
    id: 'oi_gainer_calls',
    col: 'oi_change',
  },
  {
    title: 'OI Gainer Puts',
    id: 'oi_gainer_puts',
    col: 'oi_change',
  },
  {
    title: 'OI Loser Calls',
    id: 'oi_loser_calls',
    col: 'oi_change',
  },
  {
    title: 'OI Loser Puts',
    id: 'oi_loser_puts',
    col: 'oi_change',
  },
  {
    title: 'Contract Gainer Calls',
    id: 'contract_gainer_calls',
    col: 'volume_change',
  },
  {
    title: 'Contract Gainer Puts',
    id: 'contract_gainer_puts',
    col: 'volume_change',
  },
  {
    title: 'Price Gainers',
    id: 'price_gainer',
    col: 'day_change',
  },
  {
    title: 'Price Losers',
    id: 'price_loser',
    col: 'day_change',
  },
  {
    title: 'IV Gainers',
    id: 'iv_raise',
    col: '',
  },
  {
    title: 'IV Losers',
    id: 'iv_fall',
    col: '',
  },
];

interface customProps extends dashboardGraphProps {
  buttonRef: React.RefObject<HTMLButtonElement>;
}

export default function ScreenerTable({ expiryOption, buttonRef }: customProps) {
  const [active, setActive] = useState<activeItemProps>(activeValues[0]);
  const [loading, setLoading] = useState(true);
  const [gridApi, setGridApi] = useState<GridApi>();
  const [gridColumnApi, setGridColumnApi] = useState<ColumnApi>();
  const BLOCK_SIZE = 250;
  const history = useHistory();
  const { path } = useRouteMatch();
  const { state } = useLocation<screenerLocation>();

  const getData = async (expiry_at: string, active: string, start: number, end: number) => {
    setLoading(true);
    try {
      const payload: commonObject = {
        screener_type: active,
        type: 'OPTION',
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
  }, [active.id, gridApi, memoizedGetData, expiryOption.value, active.col, gridColumnApi]);

  function fixColumnSizes(columnApi: ColumnApi) {
    columnApi.setColumnWidth(OptionColumns.SYMBOL, 130);
    columnApi.setColumnWidth(OptionColumns.STRIKE_PRICE, 110);
    columnApi.setColumnWidth(OptionColumns.OPTION_TYPE, 80);
    columnApi.setColumnWidth(OptionColumns.PRICE, 120);
    columnApi.setColumnWidth(OptionColumns.DAY_CHANGE_PERCENT, 110);
    columnApi.setColumnWidth(OptionColumns.VOLUME, 110);
    columnApi.setColumnWidth(OptionColumns.VOLUME_CHANGE_PERCENT, 120);
    columnApi.setColumnWidth(OptionColumns.TTV, 120);
    columnApi.setColumnWidth(OptionColumns.OI, 120);
    columnApi.setColumnWidth(OptionColumns.OI_CHANGE_PERCENT, 100);
    columnApi.setColumnWidth(OptionColumns.IV, 100);
    columnApi.setColumnWidth(OptionColumns.IV_CHANGE_PERCENT, 100);
    columnApi.setColumnWidth(OptionColumns.DELTA, 110);
    columnApi.setColumnWidth(OptionColumns.GAMMA, 110);
    columnApi.setColumnWidth(OptionColumns.RHO, 110);
    columnApi.setColumnWidth(OptionColumns.THETA, 110);
    columnApi.setColumnWidth(OptionColumns.VEGA, 110);
    columnApi.setColumnWidth(OptionColumns.SPOT, 110);
    columnApi.setColumnWidth(OptionColumns.BUILD_UP, 150);
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
          fileName: `Option ${active.title.toUpperCase()}_${expiryOption.value}`,
        });
      };
    }
  }, [active.title, buttonRef, expiryOption.value, gridApi]);

  useEffect(() => {
    if (state?.active) {
      const newActive = activeValues.find((val) => val.id === state.active);
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
        <AgGridReact columnHoverHighlight={true} onGridReady={onGridReady} rowModelType={'infinite'} cacheBlockSize={BLOCK_SIZE}>
          <AgGridColumn
            field={OptionColumns.SYMBOL}
            headerName="SYMBOL"
            onCellClicked={(e) => history.push(`${path}/${e.value}`)}
            cellStyle={{ color: Theme.palette.primary, fontWeight: 600, cursor: 'pointer' }}
          />
          <AgGridColumn headerName="Strike" field={OptionColumns.STRIKE_PRICE} />
          <AgGridColumn headerName="Type" field={OptionColumns.OPTION_TYPE} cellStyle={typeCellStyle} />
          <AgGridColumn headerName="Price" field={OptionColumns.PRICE} valueFormatter={(p) => floatFormatter(p.value)} />
          <AgGridColumn
            headerName="% Change"
            valueFormatter={(p) => perFormatter(p.value)}
            cellStyle={perCellStyle}
            field={OptionColumns.DAY_CHANGE_PERCENT}
          />
          <AgGridColumn headerName="Volume" field={OptionColumns.VOLUME} />
          <AgGridColumn
            headerName="% Change Volume"
            valueFormatter={(p) => perFormatter(p.value)}
            cellStyle={perCellStyle}
            field={OptionColumns.VOLUME_CHANGE_PERCENT}
          />
          <AgGridColumn headerName="TTV" valueFormatter={(p) => floatFormatter(p.value)} field={OptionColumns.TTV} />
          <AgGridColumn headerName="OI" valueFormatter={(p) => amountFormatter(p.value)} field={OptionColumns.OI} />
          <AgGridColumn
            headerName="% OI Change"
            valueFormatter={(p) => perFormatter(p.value)}
            cellStyle={perCellStyle}
            field={OptionColumns.OI_CHANGE_PERCENT}
          />
          <AgGridColumn headerName="IV" valueFormatter={(p) => floatFormatter(p.value)} field={OptionColumns.IV} />
          <AgGridColumn headerName="% IV Change" valueFormatter={(p) => perFormatter(p.value)} field={OptionColumns.IV_CHANGE_PERCENT} />
          <AgGridColumn headerName="Delta" valueFormatter={(p) => floatFormatter(p.value, 4)} field={OptionColumns.DELTA} />
          <AgGridColumn headerName="Gamma" valueFormatter={(p) => floatFormatter(p.value, 4)} field={OptionColumns.GAMMA} />
          <AgGridColumn headerName="Theta" valueFormatter={(p) => floatFormatter(p.value, 4)} field={OptionColumns.THETA} />
          <AgGridColumn headerName="Vega" valueFormatter={(p) => floatFormatter(p.value, 4)} field={OptionColumns.VEGA} />
          <AgGridColumn headerName="SPOT" field={OptionColumns.SPOT} valueFormatter={(p) => floatFormatter(p.value)} />
          <AgGridColumn headerName="Build Up" valueFormatter={(p) => expandShortCode(p.value)} field={OptionColumns.BUILD_UP} />
        </AgGridReact>
      </ScreenerDiv>
    </>
  );
}
