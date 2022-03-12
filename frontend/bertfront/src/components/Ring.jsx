import { useEffect, useState, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
  } from 'chart.js';
  
ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

const error = 35;

const data = {datasets: [{
    label: 'Error rate',
    data: [error,100-error], 
    borderColor: ['rgba(255, 99, 132, 0)','rgba(255, 99, 132, 0)'],
    }]
}

function Ring() {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState({
      datasets: [],
    });

    const createGradient = (ctx, area, color1, color2, color3) => {
        const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    
        gradient.addColorStop(0, color1);
        gradient.addColorStop(0.5, color2);
        gradient.addColorStop(1, color3);
    
        return gradient;
    }

    const donutColor = [['red','gray','blue'],['rgba(255,100,100,20)','rgba(255,100,100,20)','rgba(255,100,100,20)']]
  
    useEffect(() => {
      const chart = chartRef.current;
  
      if (!chart) {
        return;
      }
      const chartData = {
        ...data,
        datasets: data.datasets.map((dataset,i) => ({
          ...dataset,
          backgroundColor: [
            'rgba(255,255,255,0)',
            createGradient(chart.ctx, chart.chartArea, 'rgba(215,0,116,100)','rgba(0,160,228,100)','rgba(164,164,164,29)')
            ]
        })),
      };
  
      setChartData(chartData);
    }, []);
    
    return ( 
        <Doughnut ref={chartRef}
            data={chartData}/>
    );
}
  
export default Ring;