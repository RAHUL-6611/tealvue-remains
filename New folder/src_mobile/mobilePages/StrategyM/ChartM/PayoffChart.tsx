import { floatFormatter } from 'functions';
import HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { commonObject } from 'interfaces';
import { useAppSelector } from 'redux/hooks';
import { Theme } from 'constants/theme';

const options = (data: commonObject, target: number) => {
  const activeValue = data['payoffs_at_target'].find((val: commonObject) => val.at === target);

  return {
    title: {
      text: 'Payoff Graph',
    },
    xAxis: {
      categories: data['payoffs_at_expiry'].map((val: commonObject) => val.at),
      title: {
        text: null,
      },
      labels: {
        reserveSpace: true,
        enabled: true,
        step: 100,
      },
      plotLines: [
        {
          color: activeValue?.payoff >= 0 ? Theme.palette.success : Theme.palette.danger,
          width: 2,
          value: data['payoffs_at_target'].findIndex((val: commonObject) => val.at === target),
          zIndex: 1,
          dashStyle: 'Dash',
          label: {
            text: `Projected ${activeValue?.payoff >= 0 ? 'Profit' : 'Loss'} ${activeValue?.payoff}`,
            rotation: 0,
            y: 0,
            textAlign: 'center',
            style: {
              fontWeight: 'bold',
              color: activeValue?.payoff >= 0 ? Theme.palette.success : Theme.palette.danger,
            },
          },
        },
      ],
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    plotOptions: {
      series: {
        fillOpacity: 0.1,
        states: {
          inactive: {
            opacity: 1,
          },
        },
      },
    },
    chart: {
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Poppins',
      },
      zoomType: 'xy',
      panning: true,
      panKey: 'ctrl',
    },
    series: [
      {
        name: 'Strike Price',
        type: 'area',
        data: data['payoffs_at_expiry'].map((val: commonObject) => Number(floatFormatter(val.payoff))),
        zones: [
          {
            value: 0,
            color: '#E81224',
            fillOpacity: 1,
          },
          {
            color: '#00a25b',
          },
        ],
        marker: {
          enabled: false,
        },
      },
      // {
      //   name: 'payoffs at target',
      //   type: 'line',
      //   data: data['payoffs_at_target'].map((val: commonObject) => val.payoff),
      //   marker: {
      //     enabled: false,
      //   },
      //   enableMouseTracking: false,
      //   color: Theme.palette.secondary,
      // },
    ],
    legend: {
      enabled: true,
    },
    tooltip: {
      formatter(this: HighCharts.TooltipFormatterContextObject) {
        return '<b>Strike ' + this.x + '</b> : <b> Payoff ' + this.y + '</b>';
      },
    },
  };
};

export default function PayOffChart({ data }: { data: commonObject }) {
  const target = useAppSelector((state) => state.strategy.nifty_target);

  return (
    <div>
      <HighchartsReact highcharts={HighCharts} options={options(data, target)} allowChartUpdate />
    </div>
  );
}
