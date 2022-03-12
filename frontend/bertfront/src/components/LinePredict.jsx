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
        },
        title: {
        display: true,
        text: 'Predicted vs Actual price',
        position: 'bottom'
        },
    },
};

const data = {
    labels: [1,2,3,4,5,6,7,8,9],
    datasets: [
      {
        label: 'Actual',
        data: [10,8,12,9,14,11,16,13,15],
        borderColor: '#12C243',
        backgroundColor: '#12C243',
      },
      {
        label: 'Predicted',
        data: [10,9,11,9,15,12,17,12,14],
        borderColor: '#EB00F0',
        backgroundColor: '#EB00F0',
      },
    ],
};

function LinePredict() {
    return ( <Line options={options} data={data} /> );
}

export default LinePredict;