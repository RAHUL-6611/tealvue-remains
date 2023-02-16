import ReactECharts from 'echarts-for-react';


const lineData = [
  100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67,
  66, 65, 64, 63, 62, 61, 60, 61, 60, 65, 61, 63, 65, 70, 71, 69, 73, 75, 78, 80, 75, 70, 79, 80,
];
const putData = [
  100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67,
  66, 65, 64, 63, 62, 61, 60, 61,
];
const callData = [60, 65, 61, 63, 65, 70, 71, 69, 73, 75, 78, 80, 75, 70, 79, 80];

const options = {
  xAxis: {
        type: 'category',
        splitNumber: 5,
        minInterval:5
  },
  yAxis: {
    type: 'value',
  },
  series: [
    // {
    //   name: 'Call',
    //   type: 'bar',
    //   data: callData,

    // },
    // {
    //   name: 'Put',
    //   type: 'bar',
    //   data: putData,

    // },
    {
      data: lineData,
      type: 'line',
      smooth: true,
    },
  ],
  grid: {
    // height: 350,
    top: '12%',
    left: '1%',
    right: '10%',
    containLabel: true,
  },
};


export default function Graphh() {
    
    return (
        // <div className="h-full flex align-center justify-center" >
        <ReactECharts option={options} style={{height: '600px'}}/>
        // </div>
    )
}
