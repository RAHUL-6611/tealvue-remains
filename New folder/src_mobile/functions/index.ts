import { ThemeConfig } from 'react-select';

import { chartData } from 'interfaces';
import { CellStyle, CellStyleFunc } from 'ag-grid-community';
import { Theme } from 'constants/theme';
import { IActionTypes, IOptionTypes } from 'interfaces/pages/strategy';

export const perFormatter = (p: number) => (p ? floatFormatter(p) + '%' : '0.00%');

export const amountFormatter = (p: number) => {
  if (!p) return '';
  let val = Math.abs(p);
  let output: string = '' + val;
  if (val >= 10000000) {
    output = (val / 10000000).toFixed(2) + ' Cr';
  } else if (val >= 100000) {
    output = (val / 100000).toFixed(2) + ' L';
  }
  return output;
};

export const floatFormatter = (p: number, precision: number = 2) => {
  return p?.toFixed(precision) ?? '0.' + '0'.repeat(precision);
};

export const updateSelectTheme: ThemeConfig = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary75: '#1a8d8d',
    primary50: '#4da6a6',
    primary25: '#80c0c0',
    primary: '#008080',
  },
});

export const perCellStyle: CellStyleFunc = (params) => {
  if (params.value > 0) {
    return {
      color: Theme.palette.primary,
    } as CellStyle;
  } else if (params.value < 0) {
    return {
      color: Theme.palette.danger,
    };
  }
  return {};
};

export const typeCellStyle: CellStyleFunc = (params) => {
  if (params.value === 'call') {
    return {
      color: Theme.palette.primary,
    } as CellStyle;
  } else if (params.value === 'put') {
    return {
      color: Theme.palette.danger,
    };
  }
  return {};
};

export const createChart = (chart: chartData) => ({
  grid: { containLabel: true, top: 0, bottom: 0, left: 5 },
  title: {
    show: false,
  },
  xAxis: {
    axisLabel: {
      hideOverlap: true,
    },
  },
  yAxis: {
    type: 'category',
    data: chart.data.map((val) => val.name),
  },
  tooltip: {
    trigger: 'item',
    formatter: function (params: { name: any; value: any }) {
      return `<b>${params.name} : ${params.value}</b>`;
    },
  },
  series: [
    {
      data: chart.data.map((val) => val.value),
      type: 'bar',
      smooth: true,
      color: chart.color,
      itemStyle: {
        borderRadius: [0, 5, 5, 0],
      },
      label: {
        show: true,
        position: 'right',
        formatter: function (params: { value: number }) {
          return `${chart.color === Theme.palette.danger ? '-' : ''}${params.value.toFixed(2)}`;
        },
      },
    },
  ],
  textStyle: {
    fontFamily: 'Poppins',
  },
});

export const expandShortCode = (val: string) => {
  if (val === 'LBU') return 'Long Build Up';
  else if (val === 'LU') return 'Long Unwinding';
  else if (val === 'SC') return 'Short Covering';
  else if (val === 'SBU') return 'Short Build Up';
  else if (val === 'N') return '-';

  return val;
};

// ? Used to get option chain unique trade id
export const getOptionChainId = (strike: string, BorS: IActionTypes, type: IOptionTypes) => `${strike}-${BorS}-${type}`;
