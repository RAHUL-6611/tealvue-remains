import ReactECharts from 'echarts-for-react';

import { useAppSelector } from 'redux/hooks';

export default function PayOffChart() {
  const data = useAppSelector((state) => state.strategy.wholeData);
  const strategyCurrentSelection = useAppSelector((state) => state.global.strategy?.current);

  const option = {
    title: {
      text: strategyCurrentSelection?.label,
      left: 'center',
    },
    xAxis: [
      {
        type: 'category',
        name: 'Strike Prices',
        boundaryGap: false,
        data: data.payoffs_at_expiry_strikes,
      },
    ],
    yAxis: {
      type: 'value',
      name: 'Profit Amount',
    },
    series: [
      {
        id: 'expiry',
        name: 'Target Profit',

        data: data.payoffs_at_expiry_values,
        type: 'line',
        areaStyle: {},
      },
      {
        id: 'expiry2',
        name: 'Expiry Profit',
        data: data.payoffs_at_target_values,

        type: 'line',
        areaStyle: {
          color: '#fff',
        },
        lineStyle: {
          color: 'blue',
          width: 3,
        },
      },
    ],
    visualMap: [
      {
        id: 'expiry',
        type: 'continuous',
        min: 0,
        max: 1,
        show: false,
        inRange: {
          color: ['rgba(237, 106, 90, 1)', 'rgba(0, 175, 84, 1)'],
        },
      },
    ],
    tooltip: {
      formatter: '{a0}: {c0}',
      axisPointer: {
        type: 'cross',
      },
    },
    legend: {
      show: true,
      right: 'right',
    },
  };

  return (
    <div>
      <ReactECharts option={option} style={{ height: '500px' }} opts={{ renderer: 'svg' }} />
    </div>
  );
}
