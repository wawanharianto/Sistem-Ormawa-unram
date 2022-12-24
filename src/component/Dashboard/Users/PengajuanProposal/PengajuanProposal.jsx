import React from 'react';
import './PengajuanProposal.css';

function PengajuanProposal() {
  return (
    <>
      <div className="addPropalForm-container">
        <div className="hProposalForm">
          <h2>Pengajual Propsal</h2>
          <p>Add Proposal</p>
        </div>
        <div className="formaddProp">
          <div className="headForm">
            <p>Add Proposal</p>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <form className="addProposal">
            <hr className="line" />
            <div className="finput">
              <p>Nama Kegiatan</p>
              <input type="text" placeholder="Nama Kegiatan"></input>
            </div>

            <div className="finput">
              <p>Nama Organisasi</p>
              <input type="text" placeholder="Nama Organisasi"></input>
            </div>
            <div className="finput">
              <p>Jumlah Dana yang Diajukan</p>
              <input type="text" placeholder="Jumlah Dana yang Diajukan"></input>
            </div>
            <div className="finput">
              <p>Nama Ketua Panitia</p>
              <input type="text" placeholder="Nama Ketua Panitia"></input>
            </div>
            <div className="finput">
              <p>Nomor Hp</p>
              <input type="text" placeholder="Nomor Hp"></input>
            </div>
            <div className="finput">
              <p>Tanggal Pelaksanaan</p>
              <input type="text" placeholder="Tanggal Pelaksanaan"></input>
            </div>
            <div className="finput">
              <p>Tempat Pelaksanaan</p>
              <input type="text" placeholder="Tempat Pelaksanaan"></input>
            </div>
            <div className="finput">
              <p>Nomor Ketua Umum</p>
              <input type="text" placeholder="Nomor Ketua Umum"></input>
            </div>
            <div className="finput">
              <p>Proposal</p>
              <input type="file"></input>
            </div>
            <div className="finput">
              <p>Status</p>
              <button disabled>
                <i class="fa-solid fa-circle-exclamation"></i> permohonan
              </button>
            </div>
            <div className="fbtn-form">
              <button className="Ajukan">
                <i class="fa-solid fa-location-arrow"></i>Ajukan
              </button>
              <button className="Ajukan">
                <i class="fa-solid fa-floppy-disk"></i>Simpan
              </button>
              <button className="Ajukan">
                <i class="fa-solid fa-xmark"></i>Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PengajuanProposal;
