import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function Chart() {
  const data = {
    labels: ['Desember 11', 'Desember 12', 'Desember 13', 'Desember 14', 'Desember 15'],
    datasets: [
      {
        data: [8, 7, 8, 6, 8, 9],
      },
    ],
  };
  const options = {};
  return (
    <div>
      <Line data={data} options={options}></Line>
    </div>
  );
}

export default Chart;
