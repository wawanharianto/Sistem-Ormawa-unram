import React from 'react';
import './Dashboard.css';
import Chart from './Chart';

function Dashboard() {
  return (
    <>
      <div className="Dashboard">
        <div className="listfile">
          <div className="icon">
            <i class="fa-solid fa-file-circle-plus"></i>
            <div className="detail">
              <p>Proposal</p>
              <p>14 File</p>
            </div>
          </div>
          <div className="icon">
            <i class="fa-regular fa-file-lines"></i>
            <div className="detail">
              <p>LPJ</p>
              <p>14 File</p>
            </div>
          </div>
          <div className="icon">
            <i class="fa-regular fa-file"></i>
            <div className="detail">
              <p>SPJ</p>
              <p>14 File</p>
            </div>
          </div>
          <div className="icon">
            <i class="fa-solid fa-folder-tree"></i>
            <div className="detail">
              <p>Arsip</p>
              <p>14 File</p>
            </div>
          </div>
        </div>
        <div className="Chart">
          <h3>Kegiatan Organisasi Mahasiswa</h3>
          <p>Grafik Kegiatan Organisasai Mahasiswa Fakultas Kedokteran Universitas Mataram</p>
          <div className="Graphic">
            <Chart />
          </div>
        </div>
        <div className="KontenKosong"></div>
      </div>
    </>
  );
}

export default Dashboard;
