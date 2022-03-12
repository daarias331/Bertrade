import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const data = {
    labels: ['Buy','Sell'],
    datasets: [
      {
        label: 'Profit by Operations',
        data: [2,10],
        backgroundColor: '#E1A201',
      }]}

const options = {plugins: {
    legend: {
        display: false,
        position: 'bottom'
    },
    title: {
        display: true,
        text: 'Profit by Operation',
        position: 'bottom'
      }
    }}

function BarProfit() {
    return ( <Bar data={data} options={options}/> );
}

export default BarProfit;
