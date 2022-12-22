import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Pengumuman.css';

function Pengumuman() {
  const [proposals, setProposals] = useState([]);
  useEffect(() => {
    getProposal();
  }, []);

  const getProposal = async () => {
    const response = await axios.get(`http://localhost:3000/pengumuman`);
    setProposals(response.data.result);
  };

  return (
    <>
      <article className="conPengumuman">
        <div className="headPengumuman">
          <h1>PENGUMUMAN</h1>
          <hr />
        </div>
        <table className="tPengumuman">
          <thead>
            <tr>
              <th>No</th>
              <th>Organisasi Mahasiswa</th>
              <th>Nama Kegiatan</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
          {proposals.map((proposal)=>(
            <tr key={proposal.id}>
              <td>{proposal.id}</td>
              <td>{proposal.nama_organisasi}</td>
              <td>{proposal.nama_kegiatan}</td>
              <td>{proposal.status}</td>
            </tr>
          ))}
          </tbody>

        </table>
      </article>
    </>
  );
}

export default Pengumuman;
