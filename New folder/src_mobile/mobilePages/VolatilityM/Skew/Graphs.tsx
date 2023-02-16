import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import styled from 'styled-components';

const lineData = [
  100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67,
  66, 65, 64, 63, 62, 61, 60, 61, 60, 65, 61, 63, 65, 70, 71, 69, 73, 75, 78, 80, 75, 70, 79, 80,
];
const putData = [
  100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67,
  66, 65, 64, 63, 62, 61, 60, 61,
];
const callData = [60, 65, 61, 63, 65, 70, 71, 69, 73, 75, 78, 80, 75, 70, 79, 80];

const options: Highcharts.Options = {
  rangeSelector: {
    enabled: false,
  },
  scrollbar: {
    enabled: false,
  },
  navigator: {
    enabled: false,
  },
  chart: {
    type: 'column',
    backgroundColor: 'transparent',
    style: {
      fontFamily: 'Poppins',
    },
    zoomType: 'xy',
  },
  xAxis: {
    title: {
      text: 'Strike Price',
      style: {
        fontWeight: 'bold',
      },
    },
    labels: {
      formatter: function () {
        return this.value ? Math.abs(Number(this.value)).toString() : '';
      },
    },
  },
  yAxis: {
    title: {
      text: 'IV',
      style: {
        fontWeight: 'bold',
      },
    },
    opposite: false,
    tickPositions: [50, 60, 70, 80, 90, 100, 110],
  },
  tooltip: {
    shared: true,
  },
  plotOptions: {
    column: {
      borderColor: '#fff',
      borderWidth: 2,
      grouping: false,
      pointWidth: 20,
    },
  },
  series: [
    {
      name: 'Call',
      type: 'column',
      data: callData,
      pointStart: 42,
      color: '#67B7DC',
      marker: {
        enabled: false,
      },
    },
    {
      name: 'Put',
      type: 'column',
      data: putData,
      color: '#A367DC',
      marker: {
        enabled: false,
      },
    },
    {
      name: 'Total',
      type: 'spline',
      data: lineData,
      color: '#707ADE',
      marker: {
        enabled: true,
      },
    },
  ],
  legend: {
    enabled: true,
    floating: true,
    verticalAlign: 'top',
  },
};

export default function Graphs() {
  return (
    <Container>
      <HighchartsReact highcharts={Highcharts} options={options} constructorType={'stockChart'} />
    </Container>
  );
}

const Container = styled.div`
  margin: 4rem;
`;
