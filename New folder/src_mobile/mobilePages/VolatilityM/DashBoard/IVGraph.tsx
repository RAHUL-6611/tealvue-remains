import React from 'react'

const IVGraph = () => {
  return (
    <div>IVGraph</div>
  )
}

export default IVGraph
// import { useCallback, useEffect, useState } from 'react';
// import { useAppSelector } from 'redux/hooks';
// import styled from 'styled-components';
// import axios from 'axios';
// import Highcharts from 'highcharts/highstock';
// import HighChartsReact from 'highcharts-react-official';

// import { customAxiosError, ivChartInt } from 'interfaces';
// import { Loader } from 'components';

// export default function IVGraph() {
//   const [loading, setLoading] = useState(true);
//   const [chartData, setChartData] = useState<ivChartInt>();

//   const {
//     value: { value },
//   } = useAppSelector((state) => state.global.stock);

//   const getData = async () => {
//     try {
//       setLoading(true);
//       // Need to change the type to FUTURE
//       const { data } = await axios.get(`/v1/api/charts/ivchart/${value}?type=FUTURE`);

//       data.iv_history = data.iv_history.map((iv_history: { trade_date: string | number | Date }) => {
//         iv_history.trade_date = new Date(iv_history.trade_date).getTime() - new Date(iv_history.trade_date).getTimezoneOffset() * 60000;
//         return iv_history;
//       });

//       data.ohlc_data = data.ohlc_data.map(
//         (ohlc_data: { trade_date: string; y: { low: number; high: number; open: number; close: number } }) => {
//           return [
//             new Date(ohlc_data.trade_date).getTime() - new Date(ohlc_data.trade_date).getTimezoneOffset() * 60000,
//             ohlc_data.y.open,
//             ohlc_data.y.high,
//             ohlc_data.y.low,
//             ohlc_data.y.close,
//           ];
//         },
//       );

//       setChartData(data);
//       setLoading(false);
//     } catch (error) {
//       const err = error as customAxiosError;
//       err.handleGlobally && err.handleGlobally();
//     }
//   };

//   const memoizedGetData = useCallback(getData, [value]);

//   useEffect(() => {
//     memoizedGetData();
//   }, [memoizedGetData]);
//   // console.log(chartData?.ohlc_data.map((arr,i)=> Array(arr).map((are)=> are)));

//   const options: Highcharts.Options = {
//     rangeSelector: {
//       enabled: true,
//     },
//     scrollbar: {
//       enabled: false,
//     },
//     navigator: {
//       enabled: false,
//     },
//     yAxis: [
//       {
//         title: { text: 'ATM IV' },
//         opposite: false,
//       },
//       {
//         title: { text: chartData?.symbol },
//       },
//     ],
//     chart: {
//       backgroundColor: 'transparent',
//       style: {
//         fontFamily: 'Poppins',
//       },
//       zoomType: 'y',
//     },
//     plotOptions: {
//       candlestick: {
//         color: '#EDACAF',
//         upColor: '#B6DAC5',
//         lineWidth: 2,
//         lineColor: '#DB5960',
//         upLineColor: '#71B88F',
//       },
//     },
//     series: [
//       {
//         type: 'candlestick',
//         name: chartData?.symbol,
//         data: chartData?.ohlc_data,
//         yAxis: 1,
//         dataGrouping: {
//           units: [
//             [
//               'week', // unit name
//               [1], // allowed multiples
//             ],
//             ['month', [1, 2, 3, 4, 6]],
//           ],
//         },
//         marker: {
//           enabled: false,
//         },
//         shadow: true,
//       },
//       {
//         type: 'line',
//         name: 'ATM IV',
//         data: chartData ? Object.values(chartData.iv_history).map((iv) => [iv.trade_date, iv.atm_iv]) : [],
//         yAxis: 0,
//         tooltip: {
//           valueDecimals: 2,
//         },
//         color: 'orange',
//         marker: {
//           enabled: false,
//         },
//       },
//     ],
//     legend: {
//       enabled: true,
//       floating: true,
//       verticalAlign: 'top',
//     },
//   };

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Container>
//           <HighChartsReact highcharts={Highcharts} options={options} constructorType={'stockChart'} />
//         </Container>
//       )}
//     </>
//   );
// }

// const Container = styled.div`
//   margin: 4rem;
// `;
