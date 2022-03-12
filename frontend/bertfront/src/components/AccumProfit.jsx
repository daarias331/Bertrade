import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const options = {
    responsive: true,
    plugins: {
        legend: {
        position: 'bottom',
        display: false,
        labels: {color: 'white'}
        },
        title: {
        display: true,
        text: 'Accumulative profit',
        position: 'bottom'
        },
    },
 
};

const data = {
    labels: [1,2,3,4,5,6,7,8,9,10],
    datasets: [
      {
        label: 'Actual',
        data: [0,1,1,2,3,4,7,8,7,10],
        borderColor: '#C18B00',
        backgroundColor: '#C18B00',
      },
    ],
};

function AccumProfit() {
    return ( <Line options={options} data={data} /> );
}

export default AccumProfit;