import React, { useEffect, useState } from 'react';
import './ApproveProposal_con.css';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ApproveProposal_con() {
  const [kegiatan, setKegiatan] = useState('');
  const [organisasi, setOrganisasi] = useState('');
  const [dana, setDana] = useState('');
  const [ketupat, setKetupat] = useState('');
  const [nohp, setNohp] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [tempat, setTempat] = useState('');
  const [ketum, setKetum] = useState('');
  const [url, setUrl] = useState('');
  const [namafile, setNamaFile] = useState('');
  const [ketwd3, setKetWd3] = useState('');
  const [status, setStatus] = useState('');
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
        setUrl(response.data.url_proposal);
        setNamaFile(response.data.proposal);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProposalById();
  }, [uuid]);

  const updateKetWD3 = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('status', status);
    formData.append('keteranganwd3', ketwd3);
    try {
      await axios.patch(`http://localhost:3000/updateketeranganwd3/${uuid}`, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      setMsg('success update data');
      console.log(msg);
      if (msg == 'success update data') {
        console.log('OK');
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

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
            <p>Details Pengajuan Proposal</p>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <form onSubmit={updateKetWD3} className="addProposal read-only" action="">
            <hr className="line" />
            <div className="finput">
              <p>Nama Kegiatan</p>
              <input type="text" placeholder="Nama Kegiatan" value={kegiatan}></input>
            </div>
            <div className="finput">
              <p className="hide">....</p>
              <p className="kosong">Nama Kegiatan</p>
            </div>
            <div className="finput">
              <p>Nama Organisasi</p>
              <input type="text" placeholder="Nama Organisasi" value={organisasi}></input>
            </div>
            <div className="finput">
              <p className="hide">....</p>
              <p className="kosong">Nama Organisasi</p>
            </div>
            <div className="finput">
              <p>Jumlah Dana yang Diajukan</p>
              <input type="text" placeholder="Jumlah Dana yang Diajukan" value={dana}></input>
            </div>
            <div className="finput">
              <p className="hide">....</p>
              <p className="kosong">Jumlah Dana yang Diajukan</p>
            </div>
            <div className="finput">
              <p>Nama Ketua Panitia</p>
              <input type="text" placeholder="Nama Ketua Panitia" value={ketupat}></input>
            </div>
            <div className="finput">
              <p className="hide">....</p>
              <p className="kosong">Nama Ketua Panitia</p>
            </div>
            <div className="finput">
              <p>Nomor Hp</p>
              <input type="text" placeholder="Nomor Hp" value={nohp}></input>
            </div>
            <div className="finput">
              <p className="hide">....</p>
              <p className="kosong">Nomor HP</p>
            </div>
            <div className="finput">
              <p>Tanggal Pelaksanaan</p>
              <input type="text" placeholder="Tanggal Pelaksanaan" value={tanggal}></input>
            </div>
            <div className="finput">
              <p className="hide">....</p>
              <p className="kosong">Tanggal Pelaksanaan</p>
            </div>
            <div className="finput">
              <p>Tempat Pelaksanaan</p>
              <input type="text" placeholder="Tempat Pelaksanaan" value={tempat}></input>
            </div>
            <div className="finput">
              <p className="hide">....</p>
              <p className="kosong">Tempat Pelaksanaan</p>
            </div>
            <div className="finput">
              <p>Nomor Ketua Umum</p>
              <input type="text" placeholder="Nomor Ketua Umum" value={ketum}></input>
            </div>
            <div className="finput">
              <p className="hide">....</p>
              <p className="kosong">Nomor Ketua Umum</p>
            </div>
            <div className="finput">
              <p>Download Proposal</p>
              <div className="load-file">
                <a href={url}>
                  {' '}
                  <i class="fa-solid fa-file-arrow-down"></i>Download
                </a>
                <p>{namafile}</p>
              </div>
            </div>

            <div className="finput">
              <p>Status</p>
              <button disabled className="condition-acc">
                <i class="fa-solid fa-circle-info"></i> Proposal di ajukan
              </button>
            </div>
            <div className="finput">
              <p>Keterangan Oleh WD3</p>
              <input className="textbox" type="text" placeholder="silahkan isi ..." value={ketwd3} onChange={(e) => setKetWd3(e.target.value)} />
            </div>
            <div className="fbtn-form">
              <button onClick={() => setStatus('Proposal di setujui')} type="submit" className="Ajukan">
                <i class="fa-solid fa-check"></i>Setuju
              </button>
              {/* <button type="submit" className="Ajukan">
                <i class="fa-solid fa-floppy-disk"></i>Simpan
              </button> */}
              <button onClick={() => setStatus('proposal di tolak')} type="submit" className="Ajukan">
                <i class="fa-solid fa-xmark"></i>Tolak
              </button>
            </div>
          </form>
        </div>
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

export default ApproveProposal_con;
