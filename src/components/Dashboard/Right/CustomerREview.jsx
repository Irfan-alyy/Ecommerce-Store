import React from 'react';
import Chart from 'react-apexcharts';
import { RiMoneyDollarBoxLine } from 'react-icons/ri';

export const CardData = [
  {
    title: "Sales",
    color: {
      backGround: "linear-gradient(180deg , #bb67ff 0% , #c484f3  100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: '25,970',
    png: RiMoneyDollarBoxLine,
    series: [
      {
        name: 'Sales',
        data: [31, 45, 78, 65, 109, 65, 100],
        color: 'white'
      }
    ]
  }
];

const data = {
  options: {
    chart: {
      type: "area",
      height: 'auto',
      foreColor: 'white' // Sets default text color for all chart elements
    },
    dropShadow: {
      enabled: false,
      enabledOnSeries: undefined,
      top: 0,
      left: 0,
      blur: 3,
      color: 'white',
      opacity: 0.35,
    },
    fill: {
      colors: ['#fff'],
      type: 'gradient',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      colors: ['white']
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
      theme: 'dark' // Ensures tooltip matches dark theme
    },
    grid: {
      show: true,
      borderColor: 'rgba(255, 255, 255, 0.1)' // Light grid lines
    },
    xaxis: {
      type: "datetime",
      categories: [
        '2018-09-19T00:00:00.000Z',
        '2018-09-19T01:30:00.000Z',
        '2018-09-19T02:30:00.000Z',
        '2018-09-19T03:30:00.000Z',
        '2018-09-19T04:30:00.000Z',
        '2018-09-19T05:30:00.000Z',
        '2018-09-19T06:30:00.000Z',
      ],
      labels: {
        style: {
          colors: 'white' // X-axis labels
        }
      },
      axisBorder: {
        color: 'white' // X-axis line
      },
      axisTicks: {
        color: 'white' // X-axis ticks
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: 'white' // Y-axis labels
        }
      },
      axisBorder: {
        color: 'white' // Y-axis line
      }
    }
  },
  series: CardData[0].series
};

const CustomerREview = () => {
  return (
    <div className='mr-4'>
      <Chart 
        series={data.series} 
        options={data.options} 
        type='area' 
        height={250} 
      />
    </div>
  );
};

export default CustomerREview;