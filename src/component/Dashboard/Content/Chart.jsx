import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Chart() {
  const [proposals, setProposals] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [ormawa, setOrmawa] = useState([]);

  useEffect(() => {
    dataFetch();
  }, []);

  const dataFetch = async () => {
    const dataormawa = [];
    await axios
      .get(`http://localhost:3000/proposal?search_query=`)
      .then((res) => {
        console.log(res);
        for (const dataObj of res.data.result) {
          dataormawa.push(dataObj.nama_organisasi);
        }
        setOrmawa(dataormawa);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(dataormawa);
  };

  const data = {
    labels: ormawa,
    datasets: [
      {
        label: 'Nama Ormawa',
        data: [8, 7],
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
    <div className="graphicbar">
      <Bar data={data} options={options}></Bar>
    </div>
  );
}

export default Chart;
