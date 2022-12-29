import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Chart() {
  const data = {
    labels: ['Ormawa 1', 'Ormawa 2', 'Ormawa 3', 'Ormawa 4', 'Ormawa 5'],
    datasets: [
      {
        data: [8, 7, 8, 6, 8, 14],
        backgroundColor: ' rgb(10, 124, 92)',
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  return (
    <div>
      <Bar data={data} options={options}></Bar>
    </div>
  );
}

export default Chart;