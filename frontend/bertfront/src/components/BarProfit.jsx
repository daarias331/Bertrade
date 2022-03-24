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



const options = {
    plugins: {
        legend: {
            display: false,
            position: 'bottom',
            labels: {color: "white"}
            },
        title: {
            display: true,
            text: 'Profit by Operation',
            position: 'bottom',
            color: "white"
            }
        },
    scales: {
        y: {
           ticks: { color: "white"},
           grid: {color: "rgba(255,255,255,0.25)", borderColor: "white"}
        },
        x: {
            ticks: { color: "white"},
            grid: {color: "rgba(0,0,0,0)", borderColor: "white"}
        }

    }
}

function BarProfit({simData}) {
    
    let series = Object.keys(simData).length == 0 ? [2,10] : simData.operationProfit;
    
    const data = {
        labels: ['Buy','Sell'],
        datasets: [
          {
            label: 'Profit by Operations',
            data: series,
            backgroundColor: '#E1A201',
          }]}

    return ( <Bar data={data} options={options}/> );
}

export default BarProfit;
