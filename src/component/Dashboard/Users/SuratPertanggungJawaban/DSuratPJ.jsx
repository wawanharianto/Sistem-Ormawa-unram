import React, { useEffect, useState } from 'react';
import './DSuratPJ.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function DSuratPJ() {
  const [kegiatan, setKegiatan] = useState('');
  const [organisasi, setOrganisasi] = useState('');
  const [dana, setDana] = useState('');
  const [ketupat, setKetupat] = useState('');
  const [nohp, setNohp] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [tempat, setTempat] = useState('');
  const [ketum, setKetum] = useState('');
  const [fileSPJ, setFileSPJ] = useState('');
  const [fileBerkas, setFileBerkas] = useState('');
  const [urlSPJ, setUrlSPJ] = useState('');
  const [urlDukungSPJ, setUrlDukungSPJ] = useState('');
  const [namafileSPJ, setNamaFileSPJ] = useState('');
  const [namafileDukungSPJ, setNamaFileDukungSPJ] = useState('');
  const [status, setStatus] = useState('Proposal di ajukan');
  const [keterangan_spj, setKetSpj] = useState('');
  const [dana_disetujui, setDanaSetuju] = useState('');
  const [msg, setMsg] = useState('');
  const [msg1, setMsg1] = useState('');
  const [msg2, setMsg2] = useState('');
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
        setStatus(response.data.status);
        setKetum(response.data.nomer_ketum);
        setUrlSPJ(response.data.url_spj);
        setNamaFileSPJ(response.data.spj);
        setNamaFileDukungSPJ(response.data.berkas_dukung)
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProposalById();
  }, [uuid]);

  const loadFileSPJ = (e) => {
    const proposal = e.target.files[0];
    setFileSPJ(proposal);
  };

  const loadFileDukungSPJ = (e) => {
    const proposal = e.target.files[0];
    setFileBerkas(proposal);
  };

  const updateSPJ = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', fileSPJ);
    formData.append('status', status);

    try {
      await axios.patch(`http://localhost:3000/spj/${uuid}`, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      setMsg1('success');
      console.log(msg1);
      if (msg1 == 'success') {
        console.log('Success update SPJ');
      }
    } catch (error) {
      if (error.response) {
        setMsg1(error.response.data.msg);
      }
    }
  }

  const updateBerkasDukung = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', fileBerkas);

    try {
      await axios.patch(`http://localhost:3000/spj/${uuid}`, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      setMsg2('success');
      console.log(msg2);
      if (msg2 == 'success') {
        console.log('Success update Berkas Dukung');
      }
    } catch (error) {
      if (error.response) {
        setMsg2(error.response.data.msg);
      }
    }
  }

  const updateKetSPJ = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('keterangan_spj', keterangan_spj);

    try {
      await axios.patch(`http://localhost:3000/spj/ketspj/${uuid}`, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      })
      setMsg('success update ket keuangan');
      console.log(msg);
      if (msg == 'success update ket keuangan') {
        console.log(msg);
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }

  return (
    <>
      <div className="addPropalForm-container">
        <div className="hProposalForm">
          <h2>Laporan Pertanggung Jawaban</h2>
          <p>List Pengajuan/ Proposal</p>
        </div>
        <div className="container-formAddProp">
          <div className="formaddProp">
            <div className="headForm">
              <p>Detail Pengajuan Dana</p>
              <i class="fa-solid fa-chevron-down"></i>
            </div>
            {/* onSubmit={()=> {updateSPJ(); updateBerkasDukung();}} */}
            <form className="addProposal" action="">
              <hr className="line" />
              <div className="finput">
                <p>Nama Kegiatan</p>
                <div className="contInput">
                  <input type="text" placeholder="Nama Kegiatan" value={kegiatan} readOnly={true}></input>
                  <p className="kosong">Nama Kegiatan</p>
                </div>
              </div>

              <div className="finput">
                <p>Nama Organisasi</p>
                <div className="contInput">
                  <input type="text" placeholder="Nama Organisasi" value={organisasi} readOnly={true}></input>
                  <p className="kosong">Nama Organisasi</p>
                </div>
              </div>

              <div className="finput">
                <p>Jumlah Dana yang Diajukan</p>
                <div className="contInput">
                  <input type="text" placeholder="Jumlah Dana yang Diajukan" value={dana} readOnly={true}></input>
                  <p className="kosong">Jumlah Dana yang Diajukan</p>
                </div>
              </div>

              <div className="finput">
                <p>Nama Ketua Panitia</p>
                <div className="contInput">
                  <input type="text" placeholder="Nama Ketua Panitia" value={ketupat} readOnly={true}></input>
                  <p className="kosong">Nama Ketua Panitia</p>
                </div>
              </div>

              <div className="finput">
                <p>Nomor Hp</p>
                <div className="contInput">
                  <input type="text" placeholder="Nomor Hp" value={nohp} readOnly={true}></input>
                  <p className="kosong">Nomor HP</p>
                </div>
              </div>

              <div className="finput">
                <p>Tanggal Pelaksanaan</p>
                <div className="contInput">
                  <input type="date" placeholder="Tanggal Pelaksanaan" value={tanggal} readOnly={true}></input>
                  <p className="kosong">Tanggal Pelaksanaan</p>
                </div>
              </div>

              <div className="finput">
                <p>Tempat Pelaksanaan</p>
                <div className="contInput">
                  <input type="text" placeholder="Tempat Pelaksanaan" value={tempat} readOnly={true}></input>
                  <p className="kosong">Tempat Pelaksanaan</p>
                </div>
              </div>

              <div className="finput">
                <p>Nomor Ketua Umum</p>
                <div className="contInput">
                  <input type="text" placeholder="Nomor Ketua Umum" value={ketum} readOnly={true}></input>
                  <p className="kosong">Nomor Ketua Umum</p>
                </div>
              </div>
              <div className="finput">
                <p>Upload Berkas SPJ</p>
                <div className="contInput">
                  <div className="file-up">
                    <i class="fa-solid fa-file-arrow-up"></i>
                    <input type="file" className="upload" onChange={loadFileSPJ}></input>
                    {/* <p className="text">name file .pdf</p> */}
                  </div>
                </div>
              </div>
              <div className="finput">
                <p>Upload Berkas Dukung</p>
                <div className="contInput">
                  <div className="file-up">
                    <i class="fa-solid fa-file-arrow-up"></i>
                    <input type="file" className="upload" onChange={loadFileDukungSPJ}></input>
                  </div>
                </div>
              </div>

              <div className="finput">
                <p>Status</p>
                <div className="contInput">
                  <div className="status">
                    <button disabled className="condition-acc">
                      <i class="fa-solid fa-check"></i> {status}
                    </button>
                    <input className="input-status" type="text" placeholder="text"></input>
                  </div>
                </div>
              </div>
              <div className="finput">
                <p>Berkas File SPJ</p>
                <div className="contInput">
                  <div className="file-BSPJ">
                    <a href={urlSPJ} target="_blank">
                      {' '}
                      <i class="fa-solid fa-file-arrow-down"></i>Download
                    </a>
                    <p className="text">{namafileSPJ}</p>
                  </div>
                </div>
              </div>
              <div className="finput">
                <p>Download Berkas Dukung</p>
                <div className="contInput">
                  <div className="file-BSPJ">
                    <a href={urlDukungSPJ} target="_blank">
                      {' '}
                      <i class="fa-solid fa-file-arrow-down"></i>Download
                    </a>
                    <p className="text">{namafileDukungSPJ}</p>
                  </div>
                </div>
              </div>
              {/* <div className="finput">
                <p>Keterangan Dari bagian akademik</p>
                <div className="contInput">
                  <input type="text" placeholder="Nomor Ketua Umum"></input>
                </div>
              </div> */}
              <div className="fbtn-form">
                {status !== 'SPJ' && (<button onClick={() => { setStatus('SPJ'); updateSPJ(); updateBerkasDukung(); }} type="submit" className="Ajukan">
                  <i class="fa-solid fa-check"></i>Setuju
                </button>)}
                <button onClick={() => { updateSPJ(); updateBerkasDukung(); }} type="submit" className="Ajukan">
                  <i class="fa-solid fa-floppy-disk"></i>Simpan
                </button>
                {/* <button type="submit" className="Ajukan">
                  <i class="fa-solid fa-xmark"></i>Tolak
                </button> */}
              </div>
            </form>
          </div>
          <form action="" className="form-Komfirmasi">
            <div className="headForm">
              <p>Kolom Komfirmasi SPJ</p>
              <i class="fa-solid fa-chevron-down"></i>
            </div>
            <hr className="line" />
            <div className="finput">
              <p>Nama Kegiatan</p>
              <div className="contInput">
                <input value={kegiatan} readOnly={true} type="text" placeholder="Nomor Ketua Umum" className="textbox"></input>
                <p className="text-konfirmasi">Nama Kegiatan</p>
              </div>
            </div>
            <div className="finput">
              <p>Keterangan dari bagian Keuangan</p>
              <div className="contInput">
                <input type="text" placeholder="Nomor Ketua Umum" value={keterangan_spj} onChange={(e) => setKetSpj(e.target.value)}></input>
                <p className="text-konfirmasi">Keterangan</p>
              </div>
            </div>

            <div className="finput">
              <p>Revisi Revisi Berkas file SPJ</p>
              <div className="contInput">
                <div className="file-BSPJ">
                  <button type="file">
                    <i class="fa-solid fa-upload"></i>Choose File
                  </button>
                  <p className="text">nama file .pdf</p>
                </div>
              </div>
            </div>
            <div className="btn-komfirm-lpj">
              <button onClick={() => { setStatus('SPJ Diterima'); updateKetSPJ() }} type="submit" className="setuju">
                <i class="fa-solid fa-check"></i>Setuju
              </button>
              {status !== 'SPJ Diterima' && (<button onClick={() => { setStatus('SPJ Revis'); updateKetSPJ(); }} type="submit" className="revisi">
                <i class="fa-solid fa-pen"></i>Revisi
              </button>)}
              {/* <button type="submit" className="tolak">
                <i class="fa-solid fa-xmark"></i>Tolak
              </button> */}
              <button onClick={() => updateKetSPJ()} type="submit" className="edit">
                <i class="fa-solid fa-floppy-disk"></i>Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default DSuratPJ;
