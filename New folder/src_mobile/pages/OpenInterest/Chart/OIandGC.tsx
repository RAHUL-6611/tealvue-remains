import axios from 'axios';
import ReactECharts from 'echarts-for-react';
import { useCallback, useEffect, useState } from 'react';
import { Loader } from '../../../components';
import { customAxiosError, IGreeksChartData } from '../../../interfaces';
import { useAppSelector } from '../../../redux/hooks';

export default function OIandGC({ optionType }: { optionType: boolean }) {
  const activeStock = useAppSelector((state) => state.global.stock.value);

  const [greeksData, setGreeksData] = useState<IGreeksChartData>();
  const [loading, setLoading] = useState(true);

  const expiryOption = useAppSelector((state) => state.expiryDates.activeOption);

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/v1/api/charts/greeks/${activeStock.value}?date=${expiryOption.value}&option_type=${optionType ? 'CALL' : 'PUT'}`,
      );

      setGreeksData(data);
    } catch (error) {
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    } finally {
      setLoading(false);
    }
  };

  const memoizedGetData = useCallback(getData, [activeStock.value, expiryOption.value, optionType]);

  const options = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Delta', 'Gamma', 'Theta', 'Vega'],
    },
    toolbox: {
      show: true,
      feature: {
        magicType: { show: true, type: ['line', 'bar'] },
        saveAsImage: { show: true },
      },
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        // prettier-ignore
        data:greeksData?.data.map(greek => greek.strike),
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        type: 'line',
        data: greeksData?.data.map((greek) => greek.delta),

        itemStyle: {
          color: '#333',
        },
        // showSymbol: false,
        name: 'Delta',
      },
      {
        type: 'line',
        data: greeksData?.data.map((greek) => greek.gamma),

        itemStyle: {
          color: '#008080',
        },
        // showSymbol: false,
        name: 'Gamma',
      },
      {
        type: 'line',
        data: greeksData?.data.map((greek) => greek.theta),

        itemStyle: {
          color: '#42C2FF',
        },
        // showSymbol: false,
        name: 'Theta',
      },
      {
        type: 'line',
        data: greeksData?.data.map((greek) => greek.vega),

        itemStyle: {
          color: '#F56D91',
        },
        // showSymbol: false,
        name: 'Vega',
      },
    ],
  };

  useEffect(() => {
    if (expiryOption.value) {
      memoizedGetData();
    }
  }, [expiryOption.value, memoizedGetData]);

  return loading ? (
    <Loader />
  ) : (
    <div className="pt-6">
      <ReactECharts option={options} style={{ height: '600px' }} opts={{ renderer: 'svg' }} />;
    </div>
  );
}
