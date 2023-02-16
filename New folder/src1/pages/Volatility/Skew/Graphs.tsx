// import Highcharts from 'highcharts/highstock';
// import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import ReactECharts from 'echarts-for-react';
import { useCallback, useEffect, useState } from 'react';

import styled from 'styled-components';
import { Loader } from '../../../components';
import { customAxiosError, ISkewData } from '../../../interfaces';
import { useAppSelector } from '../../../redux/hooks';

// const lineData = [
//   100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67,
//   66, 65, 64, 63, 62, 61, 60, 61, 60, 65, 61, 63, 65, 70, 71, 69, 73, 75, 78, 80, 75, 70, 79, 80,
// ];
// const putData = [
//   100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67,
//   66, 65, 64, 63, 62, 61, 60, 61,
// ];
// const callData = [60, 65, 61, 63, 65, 70, 71, 69, 73, 75, 78, 80, 75, 70, 79, 80];

// const options: Highcharts.Options = {
//   rangeSelector: {
//     enabled: false,
//   },
//   scrollbar: {
//     enabled: false,
//   },
//   navigator: {
//     enabled: false,
//   },
//   chart: {
//     type: 'column',
//     backgroundColor: 'transparent',
//     style: {
//       fontFamily: 'Poppins',
//     },
//     zoomType: 'xy',
//   },
//   xAxis: {
//     title: {
//       text: 'Strike Price',
//       style: {
//         fontWeight: 'bold',
//       }
//     },
//     labels: {
//       formatter: function () {
//         return this.value ? Math.abs(Number(this.value)).toString() : '';
//       },
//     },
//   },
//   yAxis: {
//     title: {
//       text: 'IV',
//       style: {
//         fontWeight: 'bold',
//       }
//     },
//     opposite: false,
//     tickPositions: [50, 60, 70, 80, 90, 100, 110],
//   },
//   tooltip: {
//     shared: true,
//   },
//   plotOptions: {
//     column: {
//       borderColor: '#fff',
//       borderWidth: 2,
//       grouping: false,
//       pointWidth: 20,
//     },
//   },
//   series: [
//     {
//       name: 'Call',
//       type: 'column',
//       data: callData,
//       pointStart: 42,
//       color: '#67B7DC',
//       marker: {
//         enabled: false,
//       },
//     },
//     {
//       name: 'Put',
//       type: 'column',
//       data: putData,
//       color: '#A367DC',
//       marker: {
//         enabled: false,
//       },
//     },
//     {
//       name: 'Total',
//       type: 'spline',
//       data: lineData,
//       color: '#707ADE',
//       marker: {
//         enabled: true,
//       },
//     },
//   ],
//   legend: {
//     enabled: true,
//     floating: true,
//     verticalAlign: 'top',
//   },
// };

export default function Graphs() {
  const [loading, setLoading] = useState(false);
  const [skewData, setSkewData] = useState<ISkewData>();

  const activeStock = useAppSelector((state) => state.global.stock.value);
  const expiryOption = useAppSelector((state) => state.expiryDates.activeOption);

  const getSkewData = async () => {
    if (!expiryOption.value) return;

    setLoading(true);

    try {
      const { data } = await axios.get(`/v1/api/charts/skew/${activeStock.value}?expiry_date=${expiryOption.value}`);

      setSkewData(data);
    } catch (error) {
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    } finally {
      setLoading(false);
    }
  };

  if (skewData) {
    console.log(Object.keys(skewData.skew_data).length);

    console.log(Object.values(skewData.skew_data).map((skew) => skew.filter((s) => s.option_type === 'CE')?.[0]?.iv).length);
  }

  const option = {
    title: {
      text: 'Skew',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Call IV', 'Put IV'],
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        start: 0,
        end: 100,
        handleSize: 8,
      },
    ],
    toolbox: {
      show: true,
      feature: {
        magicType: { show: true, type: ['line', 'bar'] },
        saveAsImage: { show: true },

        dataZoom: {
          yAxisIndex: false,
        },
      },
    },
    xAxis: [
      {
        type: 'category',
        data: skewData && Object.keys(skewData.skew_data),
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Call IV',
        type: 'line',
        data: skewData && Object.values(skewData.skew_data).map((skew) => skew.filter((s) => s.option_type === 'CE')?.[0]?.iv.toFixed(4)),
        itemStyle: { normal: { color: '#008080' } },
        barGap: '0%',
      },
      {
        name: 'Put IV',
        type: 'line',
        data: skewData && Object.values(skewData.skew_data).map((skew) => skew.filter((s) => s.option_type === 'PE')?.[0]?.iv.toFixed(4)),
        barGap: '0%',
        itemStyle: { normal: { color: '#F56D91' } },
      },
    ],
  };

  const memoizedGetData = useCallback(getSkewData, [activeStock.value, expiryOption.value]);

  useEffect(() => {
    memoizedGetData();
  }, [memoizedGetData]);

  return (
    <Container>{loading ? <Loader /> : <ReactECharts option={option} style={{ height: '600px' }} opts={{ renderer: 'svg' }} />}</Container>
  );
}

const Container = styled.div`
  margin: 4rem;
`;
