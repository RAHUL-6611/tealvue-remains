import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { GroupBase, OptionsOrGroups } from 'react-select';
import ReactECharts from 'echarts-for-react';
import { Loader } from 'components';
import { BuildupData, customAxiosError, selectItemProps } from 'interfaces';
import { useAppSelector } from 'redux/hooks';
import ReactTooltip from 'react-tooltip';

export default function OIBuildup() {
  const [loading, setLoading] = useState(false);
  const [buildupData, setBuildupData] = useState<BuildupData>();

  const [, setExpiryOptions] = useState<OptionsOrGroups<selectItemProps, GroupBase<selectItemProps>>>([]);

  const activeStock = useAppSelector((state) => state.global.stock.value);
  const expiryDates = useAppSelector((state) => state.expiryDates.option);
  const expiryOption = useAppSelector((state) => state.expiryDates.activeOption);

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/v1/api/charts/oibuild/${activeStock.value}?date=${expiryOption.value}`);
      setBuildupData(data);
    } catch (error) {
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    } finally {
      setLoading(false);
    }
  };
  const returnColor = (value: string) => {
    return value === 'LBU' ? '#008080' : value === 'LU' ? '#23BC01' : value === 'SBU' ? '#C1011A' : value === 'SC' ? '#828F1D' : '#919191';
  };

  const colors = [
    ['LBU', '#008080', 'Long Build Up'],
    ['LU', '#23BC01', 'Long Unwinding'],
    ['SBU', '#F56D91', 'Short Build Up'],
    ['SC', '#828F1D', 'Short Covering'],
    ['N', '#919191', 'Neutral (No change)'],
  ];

  useEffect(() => {
    if (expiryDates.length) {
      setExpiryOptions(
        expiryDates.map((data) => ({
          value: data,
          label: data,
        })),
      );
    }
  }, [expiryDates]);

  const memoizedGetData = useCallback(getData, [activeStock.value, expiryOption.value]);

  useEffect(() => {
    if (expiryOption.value) {
      memoizedGetData();
    }
  }, [memoizedGetData, expiryOption]);

  const options = {
    title: {
      text: 'Call vs Put',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Call OI', 'Put OI'],
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        start: 30,
        end: 60,
        handleSize: 8,
      },
      {
        type: 'inside',
        start: 30,
        end: 60,
      },
      {
        type: 'slider',
        show: true,
        yAxisIndex: 0,
        filterMode: 'empty',
        width: 0.5,
        height: '70%',
        handleSize: 8,
        showDataShadow: false,
        left: '93%',
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
    calculable: true,
    xAxis: [
      {
        type: 'category',
        // prettier-ignore
        data: buildupData && buildupData.oi_buildupdata.map(bp => bp.strike),
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: { onZero: false },
        min: 'dataMin',
        max: 'dataMax',
        axisPointer: {
          z: 100,
        },
      },
    ],
    series: [
      {
        name: 'Call OI Change',
        type: 'bar',
        data:
          buildupData &&
          buildupData.oi_buildupdata.map((bp) => ({
            value: bp.call.oi,
            itemStyle: { normal: { color: returnColor(bp.call.buildup) } },
          })),
        barGap: '0%',
      },
      {
        name: 'Put OI Change',
        type: 'bar',
        data:
          buildupData &&
          buildupData.oi_buildupdata.map((bp) => ({
            value: bp.put.oi,
            itemStyle: { normal: { color: returnColor(bp.put.buildup) } },
          })),
        barGap: '5%',
      },
    ],
  };
  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ReactECharts option={options} style={{ height: '600px' }} opts={{ renderer: 'svg' }} />

          <ColorLegendContainer>
            {colors.map((val, ind) => (
              <>
                <ColorLegend key={ind} data-tip data-for={val[0] + 'tooltip'}>
                  <h1 className="text-lg">{val[0]}</h1>
                  <div className="colorIndicator" style={{ backgroundColor: `${val[1]}` }}>
                    &nbsp;
                  </div>
                </ColorLegend>

                <ReactTooltip id={val[0] + 'tooltip'} type="dark" place="bottom">
                  {val[2]}
                </ReactTooltip>
              </>
            ))}
          </ColorLegendContainer>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  margin: 4rem;
`;

const ColorLegendContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 0.5rem;
`;

const ColorLegend = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;

  h1 {
    font-size: 1.2rem;
  }

  .colorIndicator {
    width: 1.5rem;
    margin: 0 1rem;
    border-radius: 8px;
  }
`;
