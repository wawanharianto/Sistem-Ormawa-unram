import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function Chart() {
  const data = {
    labels: ['Ormawa 1', 'Ormawa 1', 'Ormawa 1', 'Ormawa 1', 'Ormawa 1'],
    datasets: [
      {
        data: [8, 7, 8, 6, 8, 14],
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
