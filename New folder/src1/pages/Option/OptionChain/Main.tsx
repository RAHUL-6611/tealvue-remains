import { useCallback, useEffect, useState } from 'react';
import { CellStyleFunc, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
  const [gridApi, setGridApi] = useState<GridApi>();
  const stockList = useAppSelector((state) => state.global.stockList);

  useEffect(() => {
    setStrikePrice(stockList.find((val) => val.symbol === type)?.atm_strike ?? 0);
  }, [stockList, type]);

  const getData = async (expiry_at: string, type: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/v1/api/stock/option-chain/${type}?expiry_at=${expiry_at}`);

      gridApi?.setRowData(
        data.tableData.map((val: commonObject) => ({
          strike_price: val.strike_price,
          iv_change: val.call[0],
          iv: val.call[1],
          oi_change: val.call[2],
          oi: val.call[3],
          tcc: val.call[4],
          tc: val.call[5],
          price_change: val.call[6],
          price: val.call[7],
          p_iv_change: val.put[0],
          p_iv: val.put[1],
          p_oi_change: val.put[2],
          p_oi: val.put[3],
          p_tcc: val.put[4],
          p_tc: val.put[5],
          p_price_change: val.put[6],
          p_price: val.put[7],
        })),
      );
      setLoading(false);
    } catch (error) {
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    }
  };
  const memoizedGetData = useCallback(getData, [gridApi]);

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
    params.columnApi.autoSizeAllColumns();
    fixColumnSizes(params.columnApi);
  };

  const callStyle: CellStyleFunc = (p) => {
    if (p.node.data.strike_price < strikePrice) {
      return {
        backgroundColor: Theme.palette.lightYellow,
      };
    }
    return { backgroundColor: Theme.palette.white };
  };

  const putStyle: CellStyleFunc = (p) => {
    if (p.node.data.strike_price > strikePrice) {
      return {
        backgroundColor: Theme.palette.lightYellow,
      };
    }
    return { backgroundColor: Theme.palette.white };
  };

  function fixColumnSizes(columnApi: ColumnApi) {
    columnApi.setColumnWidth('iv_change', 100);
    columnApi.setColumnWidth('oi_change', 100);
    columnApi.setColumnWidth('price_change', 120);
    columnApi.setColumnWidth('p_price_change', 120);
    columnApi.setColumnWidth('oi', 100);
    columnApi.setColumnWidth('p_oi_change', 120);
    columnApi.setColumnWidth('p_tcc', 120);
    columnApi.setColumnWidth('p_iv', 100);
    columnApi.setColumnWidth('p_iv_change', 130);
  }

  useEffect(() => {
    if (expiryOption.value) {
      memoizedGetData(expiryOption.value, type);
    }
  }, [memoizedGetData, expiryOption, type]);

  return (
    <>
      {loading && <Loader />}

      <ScreenerDiv className="ag-theme-material">
        <AgGridReact
          defaultColDef={{
            resizable: true,
          }}
          onGridReady={onGridReady}
          columnHoverHighlight={true}
        >
          <AgGridColumn headerName="Call">
            <AgGridColumn
              headerName="IV %"
              field="iv_change"
              valueFormatter={(p) => perFormatter(p.value)}
              cellStyle={(p) => ({ ...perCellStyle(p), ...callStyle(p) })}
            />
            <AgGridColumn headerName="IV" field="iv" cellStyle={callStyle} valueFormatter={(p) => floatFormatter(p.value)} />
            <AgGridColumn
              headerName="%OI"
              field="oi_change"
              valueFormatter={(p) => perFormatter(p.value)}
              cellStyle={(p) => ({ ...perCellStyle(p), ...callStyle(p) })}
            />
            <AgGridColumn headerName="OI" field="oi" cellStyle={callStyle} />
            <AgGridColumn
              headerName="%VOL"
              field="tcc"
              valueFormatter={(p) => perFormatter(p.value)}
              cellStyle={(p) => ({ ...perCellStyle(p), ...callStyle(p) })}
            />
            <AgGridColumn headerName="VOL" field="tc" cellStyle={callStyle} />
            <AgGridColumn headerName="%CHANGE" field="price_change" valueFormatter={(p) => perFormatter(p.value)} cellStyle={callStyle} />
            <AgGridColumn headerName="PRICE" field="price" valueFormatter={(p) => floatFormatter(p.value)} cellStyle={callStyle} />
          </AgGridColumn>
          <AgGridColumn
            headerName="STRIKE"
            field="strike_price"
            valueFormatter={(p) => amountFormatter(p.value)}
            cellStyle={(p) => ({
              backgroundColor: `#e9ebf1`,
            })}
          />
          <AgGridColumn headerName="Put">
            <AgGridColumn headerName="PRICE" field="p_price" valueFormatter={(p) => floatFormatter(p.value)} cellStyle={putStyle} />
            <AgGridColumn headerName="%CHANGE" field="p_price_change" valueFormatter={(p) => perFormatter(p.value)} cellStyle={putStyle} />
            <AgGridColumn headerName="VOL" field="p_tc" cellStyle={putStyle} />
            <AgGridColumn
              headerName="%VOL"
              field="p_tcc"
              valueFormatter={(p) => perFormatter(p.value)}
              cellStyle={(p) => ({ ...perCellStyle(p), ...putStyle(p) })}
            />
            <AgGridColumn headerName="OI" field="p_oi" cellStyle={putStyle} />
            <AgGridColumn
              headerName="%OI"
              field="p_oi_change"
              valueFormatter={(p) => perFormatter(p.value)}
              cellStyle={(p) => ({ ...perCellStyle(p), ...putStyle(p) })}
            />
            <AgGridColumn headerName="IV" field="p_iv" cellStyle={putStyle} valueFormatter={(p) => floatFormatter(p.value)} />
            <AgGridColumn
              headerName="IV %"
              field="p_iv_change"
              valueFormatter={(p) => perFormatter(p.value)}
              cellStyle={(p) => ({ ...perCellStyle(p), ...putStyle(p) })}
            />
          </AgGridColumn>
        </AgGridReact>
      </ScreenerDiv>
    </>
  );
}
