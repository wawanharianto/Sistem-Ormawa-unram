import React, { useEffect, useState } from 'react';
import './DSuratPJ.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
  const [status, setStatus] = useState('');
  const [keterangan_spj, setKetSpj] = useState('');
  const [keterangan_keuangan, setKetKeuangan] = useState('');
  const [dana_disetujui, setDanaSetuju] = useState('');
  const [msg, setMsg] = useState('');
  const [nameFileSpj, setNameFileSpj] = useState('');
  const [nameFilePdkg, setNameFilePdkg] = useState('');
  const [nameRevisiSpj, setNameRevisiSpj] = useState('');
  const { user } = useSelector((state) => state.auth);
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
        setNamaFileDukungSPJ(response.data.berkas_dukung);
        setUrlDukungSPJ(response.data.url_bd);
        setKetSpj(response.data.keterangan_spj);
        setKetKeuangan(response.data.keterangan_keuangan);
        setDanaSetuju(response.data.dana_disetujui);
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
    setNameFileSpj(e.target.files[0].name);
  };

  const loadFileDukungSPJ = (e) => {
    const proposal = e.target.files[0];
    setFileBerkas(proposal);
    setNameFilePdkg(e.target.files[0].name);
  };

  const updateSPJ = async (e) => {
    const formData = new FormData();
    formData.append('file', fileSPJ);

    try {
      await axios.patch(`http://localhost:3000/spj/${uuid}`, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      return true;
    } catch (error) {
      if (error.response) {
        return false;
      }
    }
  };

  const updateBerkasDukung = async (e) => {
    const formDatax = new FormData();
    formDatax.append('file', fileBerkas);

    try {
      await axios.patch(`http://localhost:3000/spj/berkasdukung/${uuid}`, formDatax, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      return true;
    } catch (error) {
      if (error.response) {
        return false;
      }
    }
  };

  const spj = async (e) => {
    const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
    popUpPermit.classList.toggle('permitShow');
    e.preventDefault();
    const statusSPJ = await updateSPJ();
    const statusBerkas = await updateBerkasDukung();
    if (statusSPJ == true && statusBerkas == true) {
      setStatus('SPJ');
      const formData = new FormData();
      formData.append('status', 'SPJ');

      try {
        await axios.patch(`http://localhost:3000/spj/status/${uuid}`, formData, {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        });
      } catch (error) {
        console.log(error);
      }

      const PopUpSetuju = document.getElementsByClassName('popUp-SPJ')[0];
      PopUpSetuju.classList.toggle('SPJShow');
      setTimeout(() => {
        PopUpSetuju.classList.toggle('SPJShow');
      }, 2000);
      setTimeout(() => {
        navigate('/SPJ');
      }, 1500);
    } else if (statusSPJ == true && statusBerkas == false) {
      const PopUpSetuju = document.getElementsByClassName('popUp-SPJ')[3];
      PopUpSetuju.classList.toggle('SPJShow');
      setTimeout(() => {
        PopUpSetuju.classList.toggle('SPJShow');
      }, 3000);
    } else if (statusSPJ == false && statusBerkas == true) {
      const PopUpSetuju = document.getElementsByClassName('popUp-SPJ')[2];
      PopUpSetuju.classList.toggle('SPJShow');
      setTimeout(() => {
        PopUpSetuju.classList.toggle('SPJShow');
      }, 3000);
    } else {
      const PopUpSetuju = document.getElementsByClassName('popUp-SPJ')[4];
      PopUpSetuju.classList.toggle('SPJShow');
      setTimeout(() => {
        PopUpSetuju.classList.toggle('SPJShow');
      }, 3000);
    }
  };

  const revisiSPJ = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', fileSPJ);

    try {
      await axios.patch(`http://localhost:3000/spj/revisi/${uuid}`, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      setMsg('success');
      console.log(msg);
      if (msg == 'success') {
        console.log('Success update spj');
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const revisiBerkasDukung = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', fileBerkas);

    try {
      await axios.patch(`http://localhost:3000/spj/berkasdukung/revisi/${uuid}`, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      setMsg('success');
      console.log(msg);
      if (msg == 'success') {
        console.log('Success update spj');
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const updateKetSPJ = async (e) => {
    const formData = new FormData();
    formData.append('keterangan_spj', keterangan_spj);
    formData.append('file', fileSPJ);
    formData.append('status', status);

    try {
      await axios.patch(`http://localhost:3000/spj/ketspj/${uuid}`, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      return true;
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        return false;
      }
    }
  };

  // Render Condition
  const Renderx = (
    <>
      <div className="finput">
        <p>Upload Berkas SPJ</p>
        <div className="contInput">
          <div className="file-up">
            <label className="file-upload">
              <i className="fa-solid fa-file-arrow-up"></i>
              <input type="file" className="upload" onChange={loadFileSPJ}></input>
              <span>Select File</span>
            </label>
            <p className="text-upload">{nameFileSpj}</p>
            <p></p>
          </div>
        </div>
      </div>
      <div className="finput">
        <p>Upload Berkas Dukung</p>
        <div className="contInput">
          <div className="file-up">
            <label className="file-upload">
              <i className="fa-solid fa-file-arrow-up"></i>
              <input type="file" className="upload" onChange={loadFileDukungSPJ}></input>
              <span>Select File</span>
            </label>
            <p className="text-upload">{nameFilePdkg}</p>
          </div>
        </div>
      </div>
    </>
  );
  const RenderUpload = () => {
    return Renderx;
  };

  if (status == 'SPJ') {
    if (user.role == 'mahasiswa') {
      const Buttonmhs = document.getElementsByClassName('btn-setujumhs')[0];
      Buttonmhs.style.visibility = 'hidden';
    }
  }

  return (
    <>
      <div className="addPropalForm-container">
        <div className="hProposalForm">
          <h2>Surat Pertanggung Jawaban</h2>
          <p>List SPJ/ Detail SPJ</p>
        </div>
        <div className="container-formAddProp">
          <div className="formaddProp">
            <div className="headForm">
              <p>Detail Upload Surat Pertanggung Jawaban</p>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            <form onSubmit={spj} className="addProposal" action="">
              <hr className="line" />
              <div className="finput">
                <p>Nama Kegiatan</p>
                <div className="contInput">
                  <input type="text" placeholder="Nama Kegiatan" value={kegiatan || ''} readOnly={true}></input>
                  <p className="kosong">Nama Kegiatan</p>
                </div>
              </div>

              <div className="finput">
                <p>Nama Organisasi</p>
                <div className="contInput">
                  <input type="text" placeholder="Nama Organisasi" value={organisasi || ''} readOnly={true}></input>
                  <p className="kosong">Nama Organisasi</p>
                </div>
              </div>

              <div className="finput">
                <p>Jumlah Dana yang Diajukan</p>
                <div className="contInput">
                  <input type="text" placeholder="Jumlah Dana yang Diajukan" value={dana || ''} readOnly={true}></input>
                  <p className="kosong">Jumlah Dana yang Diajukan</p>
                </div>
              </div>

              <div className="finput">
                <p>Nama Ketua Panitia</p>
                <div className="contInput">
                  <input type="text" placeholder="Nama Ketua Panitia" value={ketupat || ''} readOnly={true}></input>
                  <p className="kosong">Nama Ketua Panitia</p>
                </div>
              </div>

              <div className="finput">
                <p>Nomor Hp</p>
                <div className="contInput">
                  <input type="text" placeholder="Nomor Hp" value={nohp || ''} readOnly={true}></input>
                  <p className="kosong">Nomor HP</p>
                </div>
              </div>

              <div className="finput">
                <p>Tanggal Pelaksanaan</p>
                <div className="contInput">
                  <input type="date" placeholder="Tanggal Pelaksanaan" value={tanggal || ''} readOnly={true}></input>
                  <p className="kosong">Tanggal Pelaksanaan</p>
                </div>
              </div>

              <div className="finput">
                <p>Tempat Pelaksanaan</p>
                <div className="contInput">
                  <input type="text" placeholder="Tempat Pelaksanaan" value={tempat || ''} readOnly={true}></input>
                  <p className="kosong">Tempat Pelaksanaan</p>
                </div>
              </div>

              <div className="finput">
                <p>Nomor Ketua Umum</p>
                <div className="contInput">
                  <input type="text" placeholder="Nomor Ketua Umum" value={ketum || ''} readOnly={true}></input>
                  <p className="kosong">Nomor Ketua Umum</p>
                </div>
              </div>

              <div className="finput">
                <p>Jumlah Dana Yang di setujui</p>
                <div className="contInput">
                  <input value={dana_disetujui || ''} readOnly={true} type="text" placeholder="Data belum di input"></input>
                  <p className="kosong">jumlah dana yang di setujui</p>
                </div>
              </div>

              <div className="finput">
                <p>Keterangan Oleh Bagian Keuangan</p>
                <div className="contInput">
                  <input className="textbox" type="text" placeholder="Data belum di input" value={keterangan_keuangan || ''} readOnly={true} />
                </div>
              </div>

              {/* upload hear */}
              {user && user.role == 'mahasiswa' && RenderUpload()}
              {user && user.role == 'admin' && RenderUpload()}

              <div className="finput">
                <p>Status</p>
                <div className="contInput">
                  <div className="status">
                    <button disabled className="condition-acc">
                      <i className="fa-solid fa-check"></i> {status || ''}
                    </button>
                  </div>
                </div>
              </div>
              <div className="finput">
                <p>Berkas File SPJ</p>
                <div className="contInput">
                  <div className="file-BSPJ">
                    <a href={urlSPJ || ''} target="_blank" className="btn_download">
                      <i className="fa-solid fa-file-arrow-down"></i>Download
                    </a>
                    <p className="text">{namafileSPJ || ''}</p>
                  </div>
                </div>
              </div>

              <div className="finput">
                <p>Download Berkas Dukung</p>
                <div className="contInput">
                  <div className="file-BSPJ">
                    <a href={urlDukungSPJ || ''} target="_blank" className="btn_download">
                      {' '}
                      <i className="fa-solid fa-file-arrow-down"></i>Download
                    </a>
                    <p className="text">{namafileDukungSPJ || ''}</p>
                  </div>
                </div>
              </div>

              {user && user.role === 'mahasiswa' && (
                <>
                  <div className="fbtn-form">
                    <button
                      id="btn_ajukan"
                      onClick={(e) => {
                        e.preventDefault();
                        const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                        popUpPermit.classList.toggle('permitShow');
                      }}
                      type="submit"
                      className="Ajukan btn-setujumhs"
                    >
                      <i className="fa-solid fa-check"></i>Ajukan SPJ
                    </button>

                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        const statusSPJ = await updateSPJ();
                        const statusBerkas = await updateBerkasDukung();
                        if (statusSPJ == true && statusBerkas == true) {
                          const PopUpSetuju = document.getElementsByClassName('popUp-SPJ')[1];
                          PopUpSetuju.classList.toggle('SPJShow');
                          setTimeout(() => {
                            PopUpSetuju.classList.toggle('SPJShow');
                          }, 2000);
                          setTimeout(() => {
                            navigate('/SPJ');
                          }, 1500);
                        } else if (statusSPJ == false && statusBerkas == true) {
                          const PopUpSetuju = document.getElementsByClassName('popUp-SPJ')[2];
                          PopUpSetuju.classList.toggle('SPJShow');
                          setTimeout(() => {
                            PopUpSetuju.classList.toggle('SPJShow');
                          }, 2000);
                        } else if (statusSPJ == true && statusBerkas == false) {
                          const PopUpSetuju = document.getElementsByClassName('popUp-SPJ')[3];
                          PopUpSetuju.classList.toggle('SPJShow');
                          setTimeout(() => {
                            PopUpSetuju.classList.toggle('SPJShow');
                          }, 2000);
                        } else {
                          const PopUpSetuju = document.getElementsByClassName('popUp-SPJ')[4];
                          PopUpSetuju.classList.toggle('SPJShow');
                          setTimeout(() => {
                            PopUpSetuju.classList.toggle('SPJShow');
                          }, 2000);
                        }
                      }}
                      className="Ajukan"
                    >
                      <i className="fa-solid fa-floppy-disk"></i>Simpan
                    </button>
                  </div>

                  <div className="popUp-SPJ SPJShow">
                    <div className="container-popUp">
                      <div className="icon">
                        <i className="fa-solid fa-check"></i>
                      </div>
                      <p>Berhasil!</p>
                      <p>Mengajukan Surat Pertanggung Jawaban</p>
                    </div>
                  </div>
                  <div className="popUp-SPJ SPJShow">
                    <div className="container-popUp">
                      <div className="icon">
                        <i className="fa-solid fa-check"></i>
                      </div>
                      <p>Berhasil!</p>
                      <p>Menyimpan Data</p>
                    </div>
                  </div>
                  <div className="popUp-SPJ SPJShow Critical">
                    <div className="container-popUp">
                      <div className="icon">
                        <i className="fa-solid fa-x"></i>
                      </div>
                      <p>Periksa File Upload SPJ</p>
                      <p>format : file.pdf, .doc</p>
                    </div>
                  </div>
                  <div className="popUp-SPJ SPJShow Critical">
                    <div className="container-popUp">
                      <div className="icon">
                        <i className="fa-solid fa-x"></i>
                      </div>
                      <p>Periksa File Upload Berkas Dukung</p>
                      <p>format : file.rar , .zip</p>
                    </div>
                  </div>
                  <div className="popUp-SPJ SPJShow Critical">
                    <div className="container-popUp">
                      <div className="icon">
                        <i className="fa-solid fa-x"></i>
                      </div>
                      <p>Periksa format SPJ dan Berkas yang anda pilih</p>
                    </div>
                  </div>
                  <div className="container-popup-permit permitShow">
                    <div className="container-content">
                      <div className="icon">
                        <i className="fa-solid fa-circle-exclamation"></i>
                      </div>
                      <p> Apakah data SPJ anda sudah benar ?</p>
                      <div className="btn-permit">
                        <button type="submit">Oke</button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                            popUpPermit.classList.toggle('permitShow');
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {user && user.role == 'admin' && (
                <>
                  <div className="fbtn-form">
                    <button
                      id="btn_ajukan"
                      onClick={(e) => {
                        e.preventDefault();
                        const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                        popUpPermit.classList.toggle('permitShow');
                      }}
                      type="submit"
                      className="Ajukan"
                    >
                      <i className="fa-solid fa-check"></i>Ajukan SPJ
                    </button>

                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        const statusSPJ = await updateSPJ();
                        const statusBerkas = await updateBerkasDukung();
                        if (statusSPJ == true && statusBerkas == true) {
                          const PopUpSetuju = document.getElementsByClassName('popUp-SPJ')[1];
                          PopUpSetuju.classList.toggle('SPJShow');
                          setTimeout(() => {
                            PopUpSetuju.classList.toggle('SPJShow');
                          }, 2000);
                          setTimeout(() => {
                            navigate('/SPJ');
                          }, 1500);
                        } else if (statusSPJ == false && statusBerkas == true) {
                          const PopUpSetuju = document.getElementsByClassName('popUp-SPJ')[2];
                          PopUpSetuju.classList.toggle('SPJShow');
                          setTimeout(() => {
                            PopUpSetuju.classList.toggle('SPJShow');
                          }, 2000);
                        } else if (statusSPJ == true && statusBerkas == false) {
                          const PopUpSetuju = document.getElementsByClassName('popUp-SPJ')[3];
                          PopUpSetuju.classList.toggle('SPJShow');
                          setTimeout(() => {
                            PopUpSetuju.classList.toggle('SPJShow');
                          }, 2000);
                        } else {
                          const PopUpSetuju = document.getElementsByClassName('popUp-SPJ')[4];
                          PopUpSetuju.classList.toggle('SPJShow');
                          setTimeout(() => {
                            PopUpSetuju.classList.toggle('SPJShow');
                          }, 2000);
                        }
                      }}
                      className="Ajukan"
                    >
                      <i className="fa-solid fa-floppy-disk"></i>Simpan
                    </button>
                  </div>
                  <div className="popUp-SPJ SPJShow">
                    <div className="container-popUp">
                      <div className="icon">
                        <i className="fa-solid fa-check"></i>
                      </div>
                      <p>Berhasil!</p>
                      <p>Mengajukan Surat Pertanggung Jawaban</p>
                    </div>
                  </div>
                  <div className="popUp-SPJ SPJShow">
                    <div className="container-popUp">
                      <div className="icon">
                        <i className="fa-solid fa-check"></i>
                      </div>
                      <p>Berhasil!</p>
                      <p>Menyimpan Data</p>
                    </div>
                  </div>
                  <div className="popUp-SPJ SPJShow Critical">
                    <div className="container-popUp">
                      <div className="icon">
                        <i className="fa-solid fa-x"></i>
                      </div>
                      <p>Periksa File Upload SPJ</p>
                      <p>format : file.pdf, .doc</p>
                    </div>
                  </div>
                  <div className="popUp-SPJ SPJShow Critical">
                    <div className="container-popUp">
                      <div className="icon">
                        <i className="fa-solid fa-x"></i>
                      </div>
                      <p>Periksa File Upload Berkas Dukung</p>
                      <p>format : file.rar , .zip</p>
                    </div>
                  </div>
                  <div className="popUp-SPJ SPJShow Critical">
                    <div className="container-popUp">
                      <div className="icon">
                        <i className="fa-solid fa-x"></i>
                      </div>
                      <p>Periksa format SPJ dan Berkas yang anda pilih</p>
                    </div>
                  </div>
                  <div className="container-popup-permit permitShow">
                    <div className="container-content">
                      <div className="icon">
                        <i className="fa-solid fa-circle-exclamation"></i>
                      </div>
                      <p> Apakah data SPJ anda sudah benar ?</p>
                      <div className="btn-permit">
                        <button type="submit">Oke</button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                            popUpPermit.classList.toggle('permitShow');
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>

          <div className="download-acc downloadShow">
            <div className="headcontent">
              <h4>Lembar Format SPJ</h4>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            <hr className=" line" />
            <div className="finput">
                <p>Download Lembar SPJ</p>
                <div className="contInput">
                  <div className="down-approve">
                    <button
                      className="download-file"
                      onClick={() => {
                        window.location.href = '../../Document/Format SPJ kegiatan ormawa.xlsx';
                      }}
                    >
                      <i className="fa-solid fa-file-arrow-down"></i>Download
                    </button>
                    <p className="name">File Lembar Format SPJ kegiatan ormawa.xlsx</p>
                  </div>
                  <p className="kosong">File Lembar SPJ</p>
                </div>
              </div>
          </div>

          <form onSubmit={updateKetSPJ} className="form-Komfirmasi">
            <div className="headForm">
              <p>Kolom Konfirmasi SPJ</p>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            <hr className="line" />
            <div className="finput">
              <p>Nama Kegiatan</p>
              <div className="contInput">
                <input value={kegiatan} readOnly={true} type="text" placeholder="Nomor Ketua Umum" className="textbox"></input>
                <p className="text-konfirmasi">Nama Kegiatan</p>
              </div>
            </div>
            {user && user.role == 'adminKeuangan' && (
              <>
                <div className="finput">
                  <p>Keterangan dari bagian Keuangan</p>
                  <div className="contInput">
                    <input
                      required
                      type="text"
                      placeholder={keterangan_spj ? keterangan_spj : 'Keterangan SPJ'}
                      value={keterangan_spj || ''}
                      onChange={(e) => setKetSpj(e.target.value)}
                    ></input>
                    <p className="text-konfirmasi">Keterangan</p>
                  </div>
                </div>
              </>
            )}

            {user && user.role == 'mahasiswa' && (
              <>
                <div className="finput">
                  <p>Keterangan dari bagian Keuangan</p>
                  <div className="contInput">
                    <input
                      type="text"
                      placeholder={keterangan_spj ? keterangan_spj : 'Keterangan SPJ'}
                      value={keterangan_spj || ''}
                      onChange={(e) => setKetSpj(e.target.value)}
                      readOnly
                    ></input>
                    <p className="text-konfirmasi">Keterangan</p>
                  </div>
                </div>
                <div className="finput">
                  <p>Download Revisi SPJ</p>
                  <div className="contInput">
                    <button>Revisi File</button>
                    <p className="text-konfirmasi">Download File</p>
                  </div>
                </div>
              </>
            )}
            {user && user.role == 'admin' && (
              <>
                <div className="finput">
                  <p>Keterangan dari bagian Keuangan</p>
                  <div className="contInput">
                    <input type="text" placeholder={keterangan_spj ? keterangan_spj : 'Keterangan SPJ'} value={keterangan_spj || ''} onChange={(e) => setKetSpj(e.target.value)}></input>
                    <p className="text-konfirmasi">Keterangan</p>
                  </div>
                </div>
                <div className="finput">
                  <p>Revisi file SPJ</p>
                  <div className="contInput">
                    <div className="file-BSPJ">
                      <label className="file-upload">
                        <i className="fa-solid fa-file-arrow-up"></i>
                        <input
                          type="file"
                          name="file"
                          onChange={(e) => {
                            const proposal = e.target.files[0];
                            setFileSPJ(proposal);
                            setNameRevisiSpj(e.target.files[0].name);
                          }}
                          className="upload"
                        ></input>
                        <span>Select File</span>
                      </label>
                      <p className="text-upload">{nameRevisiSpj || ''}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
            {user && user.role === 'adminKeuangan' && (
              <>
                <div className="finput">
                  <p>Revisi file SPJ</p>
                  <div className="contInput">
                    <div className="file-BSPJ">
                      <label className="file-upload">
                        <i className="fa-solid fa-file-arrow-up"></i>
                        <input
                          type="file"
                          name="file"
                          onChange={(e) => {
                            const proposal = e.target.files[0];
                            setFileSPJ(proposal);
                            setNameRevisiSpj(e.target.files[0].name);
                          }}
                          className="upload"
                        ></input>
                        <span>Select File</span>
                      </label>
                      <p className="text-upload">{nameRevisiSpj || ''}</p>
                    </div>
                  </div>
                </div>
                <div className="btn-komfirm-lpj">
                  <button
                    id="btn_setuju"
                    onClick={(e) => {
                      e.preventDefault();
                      const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                      popUpPermit.classList.toggle('permitShow');
                    }}
                    type="submit"
                    className="setuju"
                  >
                    <i className="fa-solid fa-check"></i>Setuju
                  </button>

                  <button
                    id="btn_revisi"
                    onClick={(e) => {
                      e.preventDefault();
                      const popUpPermit = document.getElementsByClassName('container-popup-permit')[1];
                      popUpPermit.classList.toggle('permitShow');
                    }}
                    type="submit"
                    className="revisi"
                  >
                    <i className="fa-solid fa-pen"></i>Revisi
                  </button>

                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      const updateKSPJ = await updateKetSPJ();
                      if (updateKSPJ === true) {
                        const PopUpSetuju = document.getElementsByClassName('popUp-KSPJ')[3];
                        PopUpSetuju.classList.toggle('SPJShow');
                        setTimeout(() => {
                          PopUpSetuju.classList.toggle('SPJShow');
                        }, 2000);
                        setStatus(status);
                        setTimeout(() => {
                          navigate('/SPJ');
                        }, 1500);
                      }
                    }}
                    className="edit"
                  >
                    <i className="fa-solid fa-floppy-disk"></i>Simpan
                  </button>
                </div>
                {/* POPUP PERMIT */}
                <div className="container-popup-permit permitShow">
                  <div className="container-content">
                    <div className="icon">
                      <i className="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <p> Apakah anda yakin ingin menyetujui SPJ ini ?</p>
                    <div className="btn-permit">
                      <button
                        onClick={async (e) => {
                          e.preventDefault();
                          const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                          popUpPermit.classList.toggle('permitShow');
                          const statusKSPJ = await updateKetSPJ();
                          if (statusKSPJ == true) {
                            setStatus('SPJ Diterima');

                            // UPdate status
                            const newStatus = 'SPJ Diterima';
                            const formData = new FormData();
                            formData.append('status', newStatus);

                            try {
                              await axios.patch(`http://localhost:3000/spj/status/${uuid}`, formData, {
                                headers: {
                                  'Content-type': 'multipart/form-data',
                                },
                              });
                            } catch (error) {
                              console.log(error);
                            }

                            const PopUpSetuju = document.getElementsByClassName('popUp-KSPJ')[0];
                            PopUpSetuju.classList.toggle('SPJShow');
                            setTimeout(() => {
                              PopUpSetuju.classList.toggle('SPJShow');
                            }, 2000);
                          } else {
                            const PopUpSetuju = document.getElementsByClassName('popUp-KSPJ')[1];
                            PopUpSetuju.classList.toggle('SPJShow');
                            setTimeout(() => {
                              PopUpSetuju.classList.toggle('SPJShow');
                            }, 2000);
                          }
                          setTimeout(() => {
                            navigate('/SPJ');
                          }, 1000);
                        }}
                      >
                        Oke
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                          popUpPermit.classList.toggle('permitShow');
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>

                <div className="container-popup-permit permitShow">
                  <div className="container-content">
                    <div className="icon">
                      <i className="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <p> Apakah Anda yakin ingin merevisi SPJ ini ?</p>
                    <div className="btn-permit">
                      <button
                        type="submit"
                        onClick={async (e) => {
                          e.preventDefault();
                          const popUpPermit = document.getElementsByClassName('container-popup-permit')[1];
                          popUpPermit.classList.toggle('permitShow');
                          const statusKSPJ = await updateKetSPJ();
                          if (statusKSPJ == true) {
                            setStatus('SPJ Revisi');

                            // Update Status
                            const newStatus = 'SPJ Revisi';
                            const formData = new FormData();
                            formData.append('status', newStatus);

                            try {
                              await axios.patch(`http://localhost:3000/spj/status/${uuid}`, formData, {
                                headers: {
                                  'Content-type': 'multipart/form-data',
                                },
                              });
                            } catch (error) {
                              console.log(error);
                            }
                            const PopUpSetuju = document.getElementsByClassName('popUp-KSPJ')[2];
                            PopUpSetuju.classList.toggle('SPJShow');
                            setTimeout(() => {
                              PopUpSetuju.classList.toggle('SPJShow');
                            }, 2000);
                            setTimeout(() => {
                              navigate('/SPJ');
                            }, 1500);
                          }
                        }}
                      >
                        Oke
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const popUpPermit = document.getElementsByClassName('container-popup-permit')[1];
                          popUpPermit.classList.toggle('permitShow');
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>

                {/* POPUP CONDITION */}
                <div className="popUp-KSPJ SPJShow">
                  <div className="container-popUp">
                    <div className="icon">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <p>Berhasil!</p>
                    <p>Menyetujui SPJ</p>
                  </div>
                </div>
                <div className="popUp-KSPJ SPJShow">
                  <div className="container-popUp">
                    <div className="icon">
                      <i className="fa-solid fa-xmark"></i>
                    </div>
                    <p>Gagal!</p>
                    <p>Menyetujui SPJ</p>
                  </div>
                </div>

                <div className="popUp-KSPJ SPJShow">
                  <div className="container-popUp">
                    <div className="icon">
                      <i className="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <p>Revisi SPJ</p>
                  </div>
                </div>
                <div className="popUp-KSPJ SPJShow">
                  <div className="container-popUp">
                    <div className="icon">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <p>Berhasil!</p>
                    <p>Menyimpan SPJ</p>
                  </div>
                </div>
              </>
            )}

            {user && user.role == 'admin' && (
              <>
                <div className="btn-komfirm-lpj">
                  <button
                    id="btn_setuju"
                    onClick={(e) => {
                      e.preventDefault();
                      const popUpPermit = document.getElementsByClassName('container-popup-permit')[1];
                      popUpPermit.classList.toggle('permitShow');
                    }}
                    type="submit"
                    className="setuju"
                  >
                    <i className="fa-solid fa-check"></i>Setuju
                  </button>

                  <button
                    id="btn_revisi"
                    onClick={(e) => {
                      e.preventDefault();
                      const popUpPermit = document.getElementsByClassName('container-popup-permit')[2];
                      popUpPermit.classList.toggle('permitShow');
                    }}
                    type="submit"
                    className="revisi"
                  >
                    <i className="fa-solid fa-pen"></i>Revisi
                  </button>

                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      const updateKSPJ = await updateKetSPJ();
                      if (updateKSPJ === true) {
                        const PopUpSetuju = document.getElementsByClassName('popUp-KSPJ')[3];
                        PopUpSetuju.classList.toggle('SPJShow');
                        setTimeout(() => {
                          PopUpSetuju.classList.toggle('SPJShow');
                        }, 2000);
                        setStatus(status);
                      }
                      setTimeout(() => {
                        navigate('/SPJ');
                      }, 1500);
                    }}
                    className="edit"
                  >
                    <i className="fa-solid fa-floppy-disk"></i>Simpan
                  </button>
                </div>
                {/* POPUP PERMIT */}
                <div className="container-popup-permit permitShow">
                  <div className="container-content">
                    <div className="icon">
                      <i className="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <p> apakah anda yakin ingin menyetujui SPJ ini ?</p>
                    <div className="btn-permit">
                      <button
                        onClick={async (e) => {
                          e.preventDefault();
                          const popUpPermit = document.getElementsByClassName('container-popup-permit')[1];
                          popUpPermit.classList.toggle('permitShow');
                          const statusKSPJ = await updateKetSPJ();
                          if (statusKSPJ == true) {
                            setStatus('SPJ Diterima');

                            // UPdate status
                            const newStatus = 'SPJ Diterima';
                            const formData = new FormData();
                            formData.append('status', newStatus);

                            try {
                              await axios.patch(`http://localhost:3000/spj/status/${uuid}`, formData, {
                                headers: {
                                  'Content-type': 'multipart/form-data',
                                },
                              });
                            } catch (error) {
                              console.log(error);
                            }

                            const PopUpSetuju = document.getElementsByClassName('popUp-KSPJ')[0];
                            PopUpSetuju.classList.toggle('SPJShow');
                            setTimeout(() => {
                              PopUpSetuju.classList.toggle('SPJShow');
                            }, 2000);
                          } else {
                            const PopUpSetuju = document.getElementsByClassName('popUp-KSPJ')[1];
                            PopUpSetuju.classList.toggle('SPJShow');
                            setTimeout(() => {
                              PopUpSetuju.classList.toggle('SPJShow');
                            }, 2000);
                          }
                          setTimeout(() => {
                            navigate('/SPJ');
                          }, 1500);
                        }}
                      >
                        Oke
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const popUpPermit = document.getElementsByClassName('container-popup-permit')[1];
                          popUpPermit.classList.toggle('permitShow');
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>

                <div className="container-popup-permit permitShow">
                  <div className="container-content">
                    <div className="icon">
                      <i className="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <p> Apakah Anda yakin ingin merevisi SPJ ini ?</p>
                    <div className="btn-permit">
                      <button
                        type="submit"
                        onClick={async (e) => {
                          e.preventDefault();
                          const popUpPermit = document.getElementsByClassName('container-popup-permit')[2];
                          popUpPermit.classList.toggle('permitShow');
                          const statusKSPJ = await updateKetSPJ();
                          if (statusKSPJ == true) {
                            setStatus('SPJ Revisi');

                            // Update Status
                            const newStatus = 'SPJ Revisi';
                            const formData = new FormData();
                            formData.append('status', newStatus);

                            try {
                              await axios.patch(`http://localhost:3000/spj/status/${uuid}`, formData, {
                                headers: {
                                  'Content-type': 'multipart/form-data',
                                },
                              });
                            } catch (error) {
                              console.log(error);
                            }
                            const PopUpSetuju = document.getElementsByClassName('popUp-KSPJ')[2];
                            PopUpSetuju.classList.toggle('SPJShow');
                            setTimeout(() => {
                              PopUpSetuju.classList.toggle('SPJShow');
                            }, 2000);
                            setTimeout(() => {
                              navigate('/SPJ');
                            }, 1500);
                          }
                        }}
                      >
                        Oke
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const popUpPermit = document.getElementsByClassName('container-popup-permit')[2];
                          popUpPermit.classList.toggle('permitShow');
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>

                {/* POPUP CONDITION */}
                <div className="popUp-KSPJ SPJShow">
                  <div className="container-popUp">
                    <div className="icon">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <p>Berhasil!</p>
                    <p>Menyetujui SPJ</p>
                  </div>
                </div>
                <div className="popUp-KSPJ SPJShow">
                  <div className="container-popUp">
                    <div className="icon">
                      <i className="fa-solid fa-xmark"></i>
                    </div>
                    <p>Gagal!</p>
                    <p>Menyetujui SPJ</p>
                  </div>
                </div>

                <div className="popUp-KSPJ SPJShow">
                  <div className="container-popUp">
                    <div className="icon">
                      <i className="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <p>Revisi SPJ</p>
                  </div>
                </div>
                <div className="popUp-KSPJ SPJShow">
                  <div className="container-popUp">
                    <div className="icon">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <p>Berhasil!</p>
                    <p>Menyimpan SPJ</p>
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default DSuratPJ;
