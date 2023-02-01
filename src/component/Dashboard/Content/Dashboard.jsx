import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Chart from './Chart';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentLogin } from '../../../features/auth';
import axios from 'axios';

function Dashboard() {
  const [proposal, setProposal] = useState('');
  const [spj, setSpj] = useState('');
  const [lpj, setLpj] = useState('');
  const [arsip, setArsip] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(currentLogin());
    getDataDashboard();
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate('/login');
    }
  }, [isError, dispatch]);

  const getDataDashboard = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/dashboard`);
      setProposal(response.data.totalProposal);
      setSpj(response.data.totalSpj);
      setLpj(response.data.totalLpj);
      setArsip(response.data.totalArsip);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  }
  return (
    <>
      <div className="Dashboard">
        <div className="container-dashboard">
          <div className="listfile">
            <div className="icon">
              <i className="fa-solid fa-file-circle-plus"></i>
              <div className="detail">
                <p>Proposal</p>
                <p>{proposal} File</p>
              </div>
            </div>
            <div className="icon">
              <i className="fa-regular fa-file-lines"></i>
              <div className="detail">
                <p>SPJ</p>
                <p>{spj} File</p>
              </div>
            </div>
            <div className="icon">
              <i className="fa-regular fa-file"></i>
              <div className="detail">
                <p>LPJ</p>
                <p>{lpj} File</p>
              </div>
            </div>
            <div className="icon">
              <i className="fa-solid fa-folder-tree"></i>
              <div className="detail">
                <p>Arsip</p>
                <p>{arsip} File</p>
              </div>
            </div>
          </div>
          <div className="Chart">
            <h3>Kegiatan Organisasi Mahasiswa</h3>
            <p>Grafik Progress Dokumen Kegiatan Organisasai Mahasiswa Fakultas Kedokteran Universitas Mataram</p>
            <div className="Graphic">
              <Chart />
            </div>
          </div>
          <div className="KontenKosong"></div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
