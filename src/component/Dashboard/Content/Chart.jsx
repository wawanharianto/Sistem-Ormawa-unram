import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Chart() {
  const [proposal, setProposal] = useState('');
  const [spj, setSpj] = useState('');
  const [lpj, setLpj] = useState('');
  const [arsip, setArsip] = useState('');
  const [ormawa, setOrmawa] = useState([]);

  useEffect(() => {
    dataFetch();
  }, []);

  const dataFetch = async () => {
    // const dataormawa = [];
    // await axios
    //   .get(`http://localhost:3000/proposal?search_query=`)
    //   .then((res) => {
    //     console.log(res);
    //     for (const dataObj of res.data.result) {
    //       dataormawa.push(dataObj.nama_organisasi);
    //     }
    //     setOrmawa(dataormawa);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // console.log(dataormawa);

    try {
      const response = await axios.get(`http://localhost:3000/dashboard`);
      setProposal(response.data.totalProposal);
      setSpj(response.data.totalSpj);
      setLpj(response.data.totalLpj);
      setArsip(response.data.totalArsip);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const data = {
    labels: ['Proposal', 'SPJ', 'LPJ', 'Arsip'],
    datasets: [
      {
        label: 'Dokumen',
        data: [proposal, spj, lpj, arsip],
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
