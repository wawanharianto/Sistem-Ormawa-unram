import React, { useEffect, useState } from 'react';
import './PengajuanDana_Add.css';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

function PengajuanDana_Add() {
  const [kegiatan, setKegiatan] = useState('');
  const [organisasi, setOrganisasi] = useState('');
  const [dana, setDana] = useState('');
  const [ketupat, setKetupat] = useState('');
  const [nohp, setNohp] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [tempat, setTempat] = useState('');
  const [ketum, setKetum] = useState('');
  // const [file, setFile] = useState('');
  // const [status, setStatus] = useState('Proposal di ajukan');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const { uuid } = useParams();

  useEffect(() => {
    const getProposalById = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/proposal/${uuid}`);
        setKegiatan(response.data.nama_kegiatan);
        setOrganisasi(response.data.nama_organisasi);
        setDana(response.data.jumlah_dana);
        setKetupat(response.data.ketua_panitia);
        setNohp(response.data.nomer_ketupat);
        setTanggal(response.data.tanggal_pelaksanaan);
        setTempat(response.data.tempat_pelaksanaan);
        setKetum(response.data.nomer_ketum);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProposalById();
  }, [uuid]);

  // const handleClose = () => {
  //   const closepop = document.getElementsByClassName('popUp')[0];
  //   closepop.classList.toggle('popshow');
  // };

  return (
    <>
      <div className="addPropalForm-container">
        <div className="hProposalForm">
          <h2>Pengajual Propsal</h2>
          <p>List Pengajuan / Detail</p>
        </div>
        <div className="formaddProp">
          <div className="headForm">
            <p>Detail Pengajuan Dana</p>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <form className="addProposal" action="">
            <hr className="line" />
            <div className="finput">
              <p>Nama Kegiatan</p>
              <input type="text" placeholder="Nama Kegiatan" value={kegiatan} readOnly={true} ></input>
            </div>
            <div className="finput">
              <p className="hide">....</p>
              <p className="kosong">Nama Kegiatan</p>
            </div>
            <div className="finput">
              <p>Nama Organisasi</p>
              <input type="text" placeholder="Nama Organisasi" value={organisasi} readOnly={true}></input>
            </div>
            <div className="finput">
              <p className="hide">....</p>
              <p className="kosong">Nama Organisasi</p>
            </div>
            <div className="finput">
              <p>Jumlah Dana yang Diajukan</p>
              <input type="text" placeholder="Jumlah Dana yang Diajukan" value={dana} readOnly={true}></input>
            </div>
            <div className="finput">
              <p className="hide">....</p>
              <p className="kosong">Jumlah Dana yang Diajukan</p>
            </div>
            <div className="finput">
              <p>Nama Ketua Panitia</p>
              <input type="text" placeholder="Nama Ketua Panitia" value={ketupat} readOnly={true}></input>
            </div>
            <div className="finput">
              <p className="hide">....</p>
              <p className="kosong">Nama Ketua Panitia</p>
            </div>
            <div className="finput">
              <p>Nomor Hp</p>
              <input type="text" placeholder="Nomor Hp" value={nohp} readOnly={true}></input>
            </div>
            <div className="finput">
              <p className="hide">....</p>
              <p className="kosong">Nomor HP</p>
            </div>
            <div className="finput">
              <p>Tanggal Pelaksanaan</p>
              <input type="text" placeholder="Tanggal Pelaksanaan" value={tanggal} readOnly={true}></input>
            </div>
            <div className="finput">
              <p className="hide">....</p>
              <p className="kosong">Tanggal Pelaksanaan</p>
            </div>
            <div className="finput">
              <p>Tempat Pelaksanaan</p>
              <input type="text" placeholder="Tempat Pelaksanaan" value={tempat} readOnly={true}></input>
            </div>
            <div className="finput">
              <p className="hide">....</p>
              <p className="kosong">Tempat Pelaksanaan</p>
            </div>
            <div className="finput">
              <p>Nomor Ketua Umum</p>
              <input type="text" placeholder="Nomor Ketua Umum" value={ketum} readOnly={true}></input>
            </div>
            <div className="finput">
              <p className="hide">....</p>
              <p className="kosong">Nomor Ketua Umum</p>
            </div>

            <div className="finput">
              <p>Status</p>
              <button disabled className="condition-acc">
                <i class="fa-solid fa-circle-info"></i> Proposal di ajukan
              </button>
            </div>
          </form>
        </div>
        <form action="" className="form-Komfirmasi">
          <div className="headForm">
            <p>Kolom Komfirmasi Bagian Keuangan</p>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <hr className="line" />
          <div className="finput">
            <p>Keterangan dari Bagian Keuangan</p>
            <input type="text" placeholder="Nomor Ketua Umum" className="textbox"></input>
          </div>
          <div className="finput">
            <p></p>
            <p className="holder-finput">keterangan</p>
          </div>
          <div className="finput">
            <p>Jumlah Dana Yang di setujui</p>
            <input type="text" placeholder="Nomor Ketua Umum"></input>
          </div>
          <div className="finput">
            <p></p>
            <p className="holder-finput">jumlah dana yang di setujui</p>
          </div>
          <div className="btn-komfirm">
            <button type="submit" className="Ajukan">
              <i class="fa-solid fa-check"></i>Setuju
            </button>
            <button type="submit" className="Ajukan">
              <i class="fa-solid fa-floppy-disk"></i>Simpan
            </button>
          </div>
        </form>
      </div>
      {/* <div className="popUp pophide">
        <div className="conPopUp" onClick={handleClose}>
          <button>X</button>
          <p></p>
        </div>
      </div> */}
    </>
  );
}

export default PengajuanDana_Add;
