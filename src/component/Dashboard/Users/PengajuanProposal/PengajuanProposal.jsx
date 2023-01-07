import React, { useEffect, useState } from 'react';
import './PengajuanProposal.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

function PengajuanProposal() {
  const [kegiatan, setKegiatan] = useState('');
  const [organisasi, setOrganisasi] = useState('');
  const [dana, setDana] = useState('');
  const [ketupat, setKetupat] = useState('');
  const [nohp, setNohp] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [tempat, setTempat] = useState('');
  const [ketum, setKetum] = useState('');
  const [file, setFile] = useState('');
  const [Statuscount, setStatuscount] = useState(0);
  const [status, setStatus] = useState('Proposal di ajukan');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getProposal();
    if (user && user.role === 'mahasiswa' && Statuscount >= 2) {
      navigate('/dashboard');
    }
  }, [Statuscount]);

  const getProposal = async () => {
    const response = await axios.get(`http://localhost:3000/proposal?search_query=`);
    setStatuscount(response.data.totalStatus);
  };

  const loadFile = (e) => {
    const proposal = e.target.files[0];
    setFile(proposal);
  };

  const handleClose = () => {
    const closepop = document.getElementsByClassName('popUp')[0];
    closepop.classList.toggle('popshow');
  };

  const addProposal = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nama_kegiatan', kegiatan);
    formData.append('nama_organisasi', organisasi);
    formData.append('jumlah_dana', dana);
    formData.append('ketua_panitia', ketupat);
    formData.append('nomer_ketupat', nohp);
    formData.append('tanggal_pelaksanaan', tanggal);
    formData.append('tempat_pelaksanaan', tempat);
    formData.append('nomer_ketum', ketum);
    formData.append('file', file);
    formData.append('status', status);
    console.log(tanggal);

    try {
      await axios.post('http://localhost:3000/proposal/', formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      setMsg('success');
      console.log(msg);
      if (msg == 'success') {
        console.log('OK');
        navigate('/pengajuan-proposal');
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <>
      <div className="addPropalForm-container">
        <div className="hProposalForm">
          <h2>Pengajual Proposal</h2>
          <p>Add Proposal</p>
        </div>
        <div className="container-formAddProp">
          <div className="formaddProp">
            <div className="headForm">
              <p>Add Proposal</p>
              <i class="fa-solid fa-chevron-down"></i>
            </div>
            <form onSubmit={addProposal} className="addProposal" action="">
              <hr className="line" />
              <div className="finput">
                <p>Nama Kegiatan</p>
                <div className="contInput">
                  <input type="text" placeholder="Nama Kegiatan" value={kegiatan} onChange={(e) => setKegiatan(e.target.value)}></input>
                  <p className="kosong">Nama Kegiatan</p>
                </div>
              </div>
              <div className="finput">
                <p>Nama Organisasi</p>
                <div className="contInput">
                  <input type="text" placeholder="Nama Organisasi" value={organisasi} onChange={(e) => setOrganisasi(e.target.value)}></input>
                  <p className="kosong">Nama Organisasi</p>
                </div>
              </div>
              <div className="finput">
                <p>Jumlah Dana yang Diajukan</p>
                <div className="contInput">
                  <input
                    className="dana"
                    type="text"
                    placeholder="Jumlah Dana yang Diajukan"
                    value={dana}
                    onChange={(e) => {
                      setDana(e.target.value);
                      handleRp(e.target.value);
                    }}
                  ></input>
                  <p className="kosong">Jumlah Dana yang Diajukan</p>
                </div>
              </div>
              <div className="finput">
                <p>Nama Ketua Panitia</p>
                <div className="contInput">
                  <input type="text" placeholder="Nama Ketua Panitia" value={ketupat} onChange={(e) => setKetupat(e.target.value)}></input>
                  <p className="kosong">Nama Ketua Panitia</p>
                </div>
              </div>
              <div className="finput">
                <p>Nomor Hp</p>
                <div className="contInput">
                  <input type="number" placeholder="Nomor Hp" value={nohp} onChange={(e) => setNohp(e.target.value)}></input>
                  <p className="kosong">Nomor HP</p>
                </div>
              </div>
              <div className="finput">
                <p>Tanggal Pelaksanaan</p>
                <div className="contInput">
                  <input type="date" placeholder="Tanggal Pelaksanaan" value={tanggal} onChange={(e) => setTanggal(e.target.value)}></input>
                  <p className="kosong">Tanggal Pelaksanaan</p>
                </div>
              </div>

              <div className="finput">
                <p>Tempat Pelaksanaan</p>
                <div className="contInput">
                  <input type="text" placeholder="Tempat Pelaksanaan" value={tempat} onChange={(e) => setTempat(e.target.value)}></input>
                  <p className="kosong">Tempat Pelaksanaan</p>
                </div>
              </div>

              <div className="finput">
                <p>Nomor Ketua Umum</p>
                <div className="contInput">
                  <input type="text" placeholder="Nomor Ketua Umum" value={ketum} onChange={(e) => setKetum(e.target.value)}></input>
                  <p className="kosong">Nomor Ketua Umum</p>
                </div>
              </div>

              <div className="finput">
                <p>Proposal</p>
                <div className="contInput">
                  <input type="file" name="file" onChange={loadFile}></input>
                </div>
              </div>

              <div className="finput">
                <p>Status</p>
                <div className="contInput">
                  <button disabled className="permohonan">
                    <i class="fa-solid fa-circle-exclamation icon"></i> permohonan
                  </button>
                </div>
              </div>
              <div className="fbtn-form">
                <button type="submit" className="Ajukan">
                  <i class="fa-solid fa-location-arrow"></i>Ajukan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="popUp pophide">
        <div className="conPopUp" onClick={handleClose}>
          <button>X</button>
          <p>{msg}</p>
        </div>
      </div>
    </>
  );
}

//Rupiah format
const handleRp = (data) => {
  const nominalDana = document.getElementsByClassName('dana')[0];
  nominalDana.addEventListener('keyup', (data) => {
    nominalDana.value = formatRp(data, 'Rp. ');
  });
};
function formatRp(angka, prefix) {
  var number_string = angka.replace(/[^,\d]/g, '').toString(),
    split = number_string.split(','),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    let separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
  return prefix == undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : '';
}
// const nominalDana = document.getElementsByClassName('dana')[0].addEventListener('keyup', (e) => {
//   console.log(e);
// });
// console.log(nominalDana);
// if (nominalDana) {
//   nominalDana.addEventListener('keyup', (e) => {
//     nominalDana.value = formatRp(this.value, 'Rp. ');
//   });
// }
// function formatRp(angka, prefix) {
//   var number_string = angka.replace(/[^,\d]/g, '').toString(),
//     split = number_string.split(','),
//     sisa = split[0].length % 3,
//     rupiah = split[0].substr(0, sisa),
//     ribuan = split[0].substr(sisa).match(/\d{3}/gi);

//   if (ribuan) {
//     const separator = sisa ? '.' : '';
//     rupiah += separator + ribuan.join('.');
//   }

//   rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
//   return prefix == undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : '';
// }
export default PengajuanProposal;
