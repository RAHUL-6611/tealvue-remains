import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options: Highcharts.Options = {
  title: {
    text: '',
  },
  chart: {
    type: 'line',
    zoomType: 'x',
  },
  xAxis: {
    type: 'datetime',
  },
  yAxis: [
    {
      title: {
        text: 'NIFTY',
      },
      opposite: false,
    },
    {
      title: {
        text: 'Open Interest',
      },
      opposite: true,
    },
  ],
  tooltip: {
    shared: true,
  },
  series: [
    {
      name: 'Delta',
      yAxis: 1,
      type: 'spline',
      data: [
        [1483232400000, 43934],
        [1483318800000, 52503],
        [1483405200000, 57177],
        [1483491600000, 69658],
        [1483578000000, 97031],
        [1483664400000, 119931],
        [1483750800000, 137133],
        [1483837200000, 154175],
      ],
    },
    {
      name: 'Vega',
      yAxis: 1,
      type: 'spline',
      data: [
        [1483232400000, 24916],
        [1483318800000, 24064],
        [1483405200000, 29742],
        [1483491600000, 29851],
        [1483578000000, 32490],
        [1483664400000, 30282],
        [1483750800000, 38121],
        [1483837200000, 40434],
      ],
    },
    {
      name: 'Gamma',
      yAxis: 1,
      type: 'spline',
      data: [
        [1483232400000, 11744],
        [1483318800000, 17722],
        [1483405200000, 16005],
        [1483491600000, 19771],
        [1483578000000, 20185],
        [1483664400000, 24377],
        [1483750800000, 32147],
        [1483837200000, 39387],
      ],
    },
    {
      name: 'Theta',
      yAxis: 1,
      type: 'spline',
      data: [
        [1483232400000, 9544],
        [1483318800000, 20722],
        [1483405200000, 7988],
        [1483491600000, 12169],
        [1483578000000, 15112],
        [1483664400000, 22452],
        [1483750800000, 34400],
        [1483837200000, 34227],
      ],
    },
  ],
  credits: {
    enabled: false,
  },
};

export default function OIandGC() {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
