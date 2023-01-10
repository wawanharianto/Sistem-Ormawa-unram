import React, { useEffect, useState } from 'react';
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
  const [file, setFile] = useState('');
  const [url, setUrl] = useState('');
  const [namafile, setNamaFile] = useState('');
  const [status, setStatus] = useState('Proposal di ajukan');
  const [keterangan_akademik, setKetAkademik] = useState('');
  const [dana_disetujui, setDanaSetuju] = useState('');
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
        setStatus(response.data.status);
        setKetum(response.data.nomer_ketum);
        setUrl(response.data.url_lpj);
        setNamaFile(response.data.lpj);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProposalById();
  }, [uuid]);

  const loadFile = (e) => {
    const proposal = e.target.files[0];
    setFile(proposal);
  };

  const updateLPJ = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('status', status);

    try {
      await axios.patch(`http://localhost:3000/lpj/${uuid}`, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      setMsg('success');
      console.log(msg);
      if (msg == 'success') {
        console.log('Success update lpj');
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }

  const revisiLPJ = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.patch(`http://localhost:3000/lpj/revisi/${uuid}`, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      setMsg('success');
      console.log(msg);
      if (msg == 'success') {
        console.log('Success update lpj');
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }

  const updateKetAkademik = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('keterangan_akademik', keterangan_akademik);
    formData.append('status', status);

    try {
      await axios.patch(`http://localhost:3000/lpj/akademik/${uuid}`, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      setMsg('success');
      console.log(msg);
      if (msg == 'success') {
        console.log('Success update keterangan akademik');
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
                <p>Upload Laporan Pertanggung Jawaban</p>
                <div className="contInput">
                  <div className="file-up">
                  <input type="file" name="file" onChange={loadFile}></input>
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
                  </div>
                </div>
              </div>
              <div className="finput">
                <p>Laporan Pertanggung Jawaban</p>
                <div className="contInput">
                  <div className="file-BSPJ">
                  <a href={url} target="_blank">
                      {' '}
                      <i class="fa-solid fa-file-arrow-down"></i>Download
                    </a>
                    <p>{namafile}</p>
                  </div>
                </div>
              </div>
              {/* <div className="finput">
                <p>Revisi LPJ Dari bagian akademik</p>
                <div className="contInput">
                  <div className="file-BSPJ">
                    <button>
                      <i class="fa-solid fa-download"></i>Download File
                    </button>
                    <p className="text">nama file .pdf</p>
                  </div>
                </div>
              </div> */}
              <div className="fbtn-form">
                {status !== 'LPJ Di Ajukan' && (<button onClick={()=> {setStatus('LPJ Di Ajukan'); updateLPJ();}} type="submit" className="Ajukan">
                  <i class="fa-solid fa-check"></i>Ajukan
                </button>)}
                <button onClick={()=>{revisiLPJ();}} type="submit" className="Ajukan">
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
              <p>Kolom Komfirmasi Bagian Akademik</p>
              <i class="fa-solid fa-chevron-down"></i>
            </div>
            <hr className="line" />
            <div className="finput">
              <p>Nama Kegiatan</p>
              <div className="contInput">
                <input type="text" placeholder="Ketikan Disini" className="textbox" value={kegiatan} readOnly={true}></input>
                <p className="text-konfirmasi"></p>
              </div>
            </div>

            <div className="finput">
              <p>Keterangan bagian Akademik</p>
              <div className="contInput">
                <input type="text" placeholder="Ketikan disini ..." value={keterangan_akademik} onChange={(e) => setKetAkademik(e.target.value)}></input>
                <p className="text-konfirmasi">Keterangan</p>
              </div>
            </div>

            <div className="btn-komfirm-lpj">
              <button onClick={()=>{ setStatus('Selesai'); updateKetAkademik(); }} type="submit" className="setuju">
                <i class="fa-solid fa-check"></i>Setuju
              </button>
              {status !== 'Selesai' &&(<button onClick={()=>{ setStatus('LPJ Revisi'); updateKetAkademik(); }} type="submit" className="revisi">
                <i class="fa-solid fa-pen"></i>Revisi
              </button>)}
              {/* <button type="submit" className="tolak">
                  <i class="fa-solid fa-xmark"></i>Tolak
                </button> */}
              <button type="submit" className="edit">
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
