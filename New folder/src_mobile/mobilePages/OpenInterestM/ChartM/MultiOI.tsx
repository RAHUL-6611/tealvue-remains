import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { GroupBase, OptionsOrGroups } from 'react-select';
import axios from 'axios';

import { customAxiosError, MultiStrikeData, selectItemProps } from 'interfaces';
import { useAppSelector } from 'redux/hooks';
import { Loader } from 'components';

export default function MultiOI() {
  const [loading, setLoading] = useState(true);
  const [, setExpiryOptions] = useState<OptionsOrGroups<selectItemProps, GroupBase<selectItemProps>>>([]);
  const [multiOIData, setMultiOIData] = useState<MultiStrikeData>();
  const [checkboxLabel, setCheckboxLabel] = useState<string[]>();
  const [visible, setVisible] = useState<Highcharts.SeriesOptionsType[]>([
    // {
    //   name: checkboxLabel && checkboxLabel[0],
    //   yAxis: 1,
    //   type: 'line',
    //   color: '#EE66C3',
    //   data: [
    //     [1483232400000, 43934],
    //     [1483318800000, 52503],
    //     [1483405200000, 57177],
    //     [1483491600000, 69658],
    //     [1483578000000, 97031],
    //     [1483664400000, 119931],
    //     [1483750800000, 137133],
    //     [1483837200000, 154175],
    //   ],
    //   visible: false,
    // },
    // {
    //   name: checkboxLabel && checkboxLabel[1],
    //   yAxis: 1,
    //   type: 'line',
    //   color: '#E27926',
    //   data: [
    //     [1483232400000, 24916],
    //     [1483318800000, 24064],
    //     [1483405200000, 29742],
    //     [1483491600000, 29851],
    //     [1483578000000, 32490],
    //     [1483664400000, 30282],
    //     [1483750800000, 38121],
    //     [1483837200000, 40434],
    //   ],
    //   visible: false,
    // },
    // {
    //   name: checkboxLabel && checkboxLabel[2],
    //   yAxis: 1,
    //   type: 'line',
    //   color: '#F24636',
    //   data: [
    //     [1483232400000, 11744],
    //     [1483318800000, 17722],
    //     [1483405200000, 16005],
    //     [1483491600000, 19771],
    //     [1483578000000, 20185],
    //     [1483664400000, 24377],
    //     [1483750800000, 32147],
    //     [1483837200000, 39387],
    //   ],
    //   visible: false,
    // },
    // {
    //   name: checkboxLabel && checkboxLabel[3],
    //   yAxis: 1,
    //   type: 'line',
    //   color: '#1398E3',
    //   data: [
    //     [1483232400000, 22001],
    //     [1483318800000, 15245],
    //     [1483405200000, 7988],
    //     [1483491600000, 12169],
    //     [1483578000000, 15112],
    //     [1483664400000, 22452],
    //     [1483750800000, 34400],
    //     [1483837200000, 34227],
    //   ],
    //   visible: false,
    // },
    // {
    //   name: checkboxLabel && checkboxLabel[4],
    //   yAxis: 1,
    //   type: 'line',
    //   color: '#58B433',
    //   data: [
    //     [1483232400000, 12908],
    //     [1483318800000, 5948],
    //     [1483405200000, 8105],
    //     [1483491600000, 11248],
    //     [1483578000000, 8989],
    //     [1483664400000, 11816],
    //     [1483750800000, 18274],
    //     [1483837200000, 18111],
    //   ],
    //   visible: false,
    // },
    // {
    //   name: checkboxLabel && checkboxLabel[5],
    //   yAxis: 1,
    //   type: 'line',
    //   color: '#7DC5EE',
    //   data: [
    //     [1483232400000, 22908],
    //     [1483318800000, 7948],
    //     [1483405200000, 12105],
    //     [1483491600000, 17248],
    //     [1483578000000, 5989],
    //     [1483664400000, 19816],
    //     [1483750800000, 10274],
    //     [1483837200000, 12111],
    //   ],
    //   visible: false,
    // },
  ]);

  const {
    value: { value },
  } = useAppSelector((state) => state.global.stock);
  const expiryDates = useAppSelector((state) => state.expiryDates.future);
  const expiryOption = useAppSelector((state) => state.expiryDates.activeFuture);

  const labelDate = expiryOption.value.split('-')[0] + expiryOption.value.split('-')[1];

  const getData = async (expiry_at: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/v1/api/charts/multistrikeoi/${value}?date=${expiry_at}`);
      setMultiOIData(data);

      setCheckboxLabel([
        `${labelDate} ${data.res1_ce[0].strike} CE`,
        `${labelDate} ${data.res2_ce[0].strike} CE`,
        `${labelDate} ${data.res3_ce[0].strike} CE`,
        `${labelDate} ${data.res4_pe[0].strike} PE`,
        `${labelDate} ${data.res5_pe[0].strike} PE`,
        `${labelDate} ${data.res6_pe[0].strike} PE`,
      ]);

      setVisible([
        {
          name: `${labelDate} ${data.res1_ce[0].strike} CE`,
          yAxis: 1,
          type: 'line',
          color: '#EE66C3',
          visible: false,
          data: data.res1_ce.map((item: any) => [new Date(item.time).getTime() - new Date(item.time).getTimezoneOffset() * 60000, item.oi]),
        },
        {
          name: `${labelDate} ${data.res2_ce[0].strike} CE`,
          yAxis: 1,
          type: 'line',
          color: '#E27926',
          visible: false,
          data: data.res2_ce.map((item: any) => [new Date(item.time).getTime() - new Date(item.time).getTimezoneOffset() * 60000, item.oi]),
        },
        {
          name: `${labelDate} ${data.res3_ce[0].strike} CE`,
          yAxis: 1,
          type: 'line',
          color: '#F24636',
          visible: false,
          data: data.res3_ce.map((item: any) => [new Date(item.time).getTime() - new Date(item.time).getTimezoneOffset() * 60000, item.oi]),
        },
        {
          name: `${labelDate} ${data.res4_pe[0].strike} PE`,
          yAxis: 1,
          type: 'line',
          color: '#1398E3',
          visible: false,
          data: data.res4_pe.map((item: any) => [new Date(item.time).getTime() - new Date(item.time).getTimezoneOffset() * 60000, item.oi]),
        },
        {
          name: `${labelDate} ${data.res5_pe[0].strike} PE`,
          yAxis: 1,
          type: 'line',
          color: '#58B433',
          visible: false,
          data: data.res5_pe.map((item: any) => [new Date(item.time).getTime() - new Date(item.time).getTimezoneOffset() * 60000, item.oi]),
        },
        {
          name: `${labelDate} ${data.res6_pe[0].strike} PE`,
          yAxis: 1,
          type: 'line',
          color: '#7DC5EE',
          visible: false,
          data: data.res6_pe.map((item: any) => [new Date(item.time).getTime() - new Date(item.time).getTimezoneOffset() * 60000, item.oi]),
        },
      ]);

      setLoading(false);
    } catch (error) {
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    }
  };

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedGetData = useCallback(getData, [labelDate, value]);

  useEffect(() => {
    if (expiryOption.value) {
      memoizedGetData(expiryOption.value);
    }
  }, [memoizedGetData, expiryOption]);

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
          text: multiOIData?.symbol,
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
      ...visible,
      {
        name: 'NIFTY LTP',
        yAxis: 0,
        type: 'line',
        visible: true,
        color: 'yellow',
        data: multiOIData
          ? multiOIData.ltp_data.map((item) => [new Date(item.time).getTime() - new Date(item.time).getTimezoneOffset() * 60000, item.top])
          : [],
      },
    ],
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
  };

  const isChecked = (index: number) => {
    if (index === -1) {
      const belowThreshold = (currentValue: boolean) => currentValue === true;

      const visibleCheck = visible.map((item) => item.visible);
      const isAllChecked = visibleCheck.every((item) => item && belowThreshold(item));

      let elem = document.getElementById('Select all') as HTMLInputElement;
      if (elem) elem.checked = isAllChecked;
    } else {
      return visible[index] && visible[index].visible;
    }
  };

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <>
          <CheckboxContainer>
            <Checkbox>
              <input
                type="checkbox"
                name="Select all"
                id="Select all"
                checked={isChecked(-1)}
                onChange={() =>
                  setVisible((old) => {
                    const temp = old.map((v) => {
                      return { ...v };
                    });
                    temp.map((item) => {
                      item.visible = true;
                      return { ...item };
                    });
                    return temp;
                  })
                }
              />
              <label htmlFor="select all">Select All</label>
            </Checkbox>
            {checkboxLabel &&
              checkboxLabel.map((val, index) => (
                <Checkbox key={val + index}>
                  <input
                    id={val}
                    type="checkbox"
                    checked={isChecked(index)}
                    onChange={() =>
                      setVisible((old) => {
                        const temp = old.map((v) => {
                          return { ...v };
                        });
                        const newVisible = temp.map((item) => {
                          if (item.name === val) {
                            item.visible = !item.visible;
                          }
                          return item;
                        });
                        return newVisible;
                      })
                    }
                  />
                  <label
                    htmlFor={val}
                    style={{ color: `${val === 'Select all' ? 'black' : visible[index] && visible[index].color?.toString()}` }}
                  >
                    {val}
                  </label>
                </Checkbox>
              ))}
          </CheckboxContainer>
          <ChartContainer>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </ChartContainer>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChartContainer = styled.div`
  width: 80%;
`;

const CheckboxContainer = styled.div`
  width: 20%;
  padding: 1rem;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-auto-flow: column;
  background-color: ${(p) => p.theme.palette.lightGrey};
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.75);
  margin-right: 1rem;
`;

const Checkbox = styled.div`
  margin: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  input {
    width: 2rem;
    height: 2rem;
    border: none;
    outline: none;
  }

  label {
    margin-left: 1rem;
    font-size: 1.5rem;
    font-weight: 700;
  }
`;
