import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { Loader } from 'components';
import { customAxiosError, LTPData, OIData } from 'interfaces';
import { useAppSelector } from 'redux/hooks';

interface OIGraphInt {
  oi_data: OIData[];
  atm_strike: number;
  ltp_data?: LTPData[];
  symbol: string;
}

export default function OpenInterestGraph() {
  const [oiData, setOiData] = useState<OIGraphInt>({
    oi_data: [],
    ltp_data: [],
    atm_strike: 0,
    symbol: '',
  });
  const [loading, setLoading] = useState(true);

  const {
    value: { value },
  } = useAppSelector((state) => state.global.stock);
  const expiryOption = useAppSelector((state) => state.expiryDates.activeFuture);

  const getLTPData = async (expiry_at: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/v1/api/charts/ltpchart/${value}?date=${expiry_at}`);
      setOiData((old) => {
        old.ltp_data = data.ltp_data;
        old.symbol = data.symbol;
        return old;
      });
    } catch (error) {
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    }
  };

  const getOIData = async (expiry_at: string) => {
    try {
      const { data } = await axios.get(`/v1/api/charts/oichart/${value}?date=${expiry_at}`);
      setOiData((old) => {
        old.oi_data = data.oi_data;
        old.atm_strike = data.atm_strike;
        return old;
      });
      setLoading(false);
    } catch (error) {
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    }
  };

  const memoizedGetLTPData = useCallback(getLTPData, [value]);
  const memoizedGetOIData = useCallback(getOIData, [value]);

  useEffect(() => {
    if (expiryOption.value) {
      memoizedGetLTPData(expiryOption.value);
      memoizedGetOIData(expiryOption.value);
    }
  }, [memoizedGetLTPData, memoizedGetOIData, expiryOption]);

  const OIChangeChartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      style: {
        fontFamily: 'Poppins',
      },
      zoomType: 'x',
    },
    title: {
      text: '',
    },
    tooltip: {
      formatter: function () {
        if (this.points)
          return this.points.reduce(function (s, point) {
            return s + '<br/>' + point.series.name + ': <b>' + point.y.toFixed(2) + '</b>';
          }, '<b>' + this.x + '</b>');
      },
      shared: true,
    },
    xAxis: [
      {
        categories: oiData.oi_data ? Object.values(oiData.oi_data).map((val) => val.strike.toString()) : [],
        plotLines: [
          {
            color: 'grey',
            width: 2,
            value: oiData.oi_data && oiData.atm_strike ? oiData.oi_data.map((val) => val.strike).indexOf(oiData.atm_strike) : 0,
            zIndex: 1,
            dashStyle: 'Dash',
            label: {
              text: `${oiData.symbol} ATM Strike ${oiData.atm_strike}`,
              rotation: 0,
              textAlign: 'center',
              style: {
                fontWeight: 'bold',
              },
            },
          },
        ],
      },
    ],
    yAxis: [
      {
        title: {
          text: 'Open Interest',
          style: {
            fontWeight: 'bold',
          },
        },
        top: '0%',
        height: '65%',
        width: '100%',
      },
      {
        title: {
          text: 'Changes in OI',
          style: {
            fontWeight: 'bold',
          },
        },
        top: '70%',
        height: '30%',
      },
    ],
    plotOptions: {
      column: {
        groupPadding: 0,
        pointPadding: 0.1,
        borderWidth: 0,
        grouping: false,
      },
    },
    series: [
      {
        yAxis: 0,
        type: 'column',
        name: 'Call Options OI',
        color: '#0C7C05',
        data: Object.values(oiData.oi_data).map((x) => x.call_oi),
        pointPadding: 0.1,
      },
      {
        yAxis: 0,
        type: 'column',
        name: 'Put Options OI',
        color: '#F62F3B',
        data: Object.values(oiData.oi_data).map((x) => x.put_oi),
        pointPadding: 0.25,
      },
      {
        yAxis: 1,
        type: 'column',
        name: 'Call OI Change',
        color: '#89C423',
        pointPadding: 0.1,
        data: Object.values(oiData.oi_data).map((x) => x.call_chg_oi),
      },
      {
        yAxis: 1,
        type: 'column',
        name: 'Put OI Change',
        color: '#F62F3B',
        pointPadding: 0.25,
        data: Object.values(oiData.oi_data).map((x) => x.put_chg_oi),
      },
    ],
    credits: {
      enabled: false,
    },
  };

  const OILTPChartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      style: {
        fontFamily: 'Poppins',
      },
      zoomType: 'x',
      height: 200,
    },
    title: {
      text: '',
    },
    xAxis: [
      {
        categories: oiData.ltp_data ? Object.values(oiData.ltp_data).map((val: LTPData) => val.strike.toString()) : [],
      },
    ],
    yAxis: {
      title: {
        text: 'Price',
        style: {
          fontWeight: 'bold',
        },
      },
    },
    tooltip: {
      formatter: function () {
        if (this.points)
          return this.points.reduce(function (s, point) {
            return s + '<br/>' + point.series.name + ': <b>' + point.y + '</b>';
          }, '<b>' + this.x + '</b>');
      },
      shared: true,
    },
    plotOptions: {
      column: {
        groupPadding: 0,
        pointPadding: 0.2,
        borderWidth: 0,
        grouping: false,
      },
    },
    series: [
      {
        type: 'column',
        name: 'Call LTP',
        color: '#0C7C05',
        data: oiData.ltp_data ? Object.values(oiData.ltp_data).map((x) => x.call_ltp) : [],
        pointPadding: 0.15,
      },
      {
        type: 'column',
        name: 'Put LTP',
        color: '#F62F3B',
        data: oiData.ltp_data ? Object.values(oiData.ltp_data).map((x) => x.put_ltp) : [],
        pointPadding: 0.3,
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <HighchartsReact highcharts={Highcharts} options={OIChangeChartOptions} />
      <br />
      <HighchartsReact highcharts={Highcharts} options={OILTPChartOptions} />
    </>
  );
}
