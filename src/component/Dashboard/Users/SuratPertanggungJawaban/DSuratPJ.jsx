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
  const [msg1, setMsg1] = useState('');
  const [msg2, setMsg2] = useState('');
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
    // e.preventDefault();
    const formData = new FormData();
    formData.append('file', fileSPJ);
    formData.append('status', status);

    try {
      await axios
        .patch(`http://localhost:3000/spj/${uuid}`, formData, {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        })
        .then(() => setMsg2('success'))
        .catch(function (error) {
          if (error.response) {
            setMsg2(error.response.data);
            setMsg2(error.response.status);
          } else {
            setMsg2(error.message);
          }
        });
    } catch (error) {
      if (error.response) {
        setMsg1(error.response.data.msg);
      }
    }
  };

  const updateBerkasDukung = async (e) => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append('file', fileBerkas);

    try {
      await axios
        .patch(`http://localhost:3000/spj/berkasdukung/${uuid}`, formData, {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        })
        .then(() => setMsg2('success'))
        .catch(function (error) {
          if (error.response) {
            setMsg2(error.response.data);
            setMsg2(error.response.status);
          } else {
            setMsg2(error.message);
          }
        });
    } catch (error) {
      if (error.response) {
        setMsg2(error.response.data.msg);
      }
    }
  };

  const spj = async (e) => {
    e.preventDefault();
    await updateSPJ();
    await updateBerkasDukung();
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
    e.preventDefault();
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
  };

  //check status button
  const btn = document.getElementById('btn_ajukan');
  if (status == 'SPJ' || status == 'SPJ Revisi') {
    btn.style.visibility = 'hidden';
  } else {
    // btn.style.visibility = 'visible';
  }

  const btnRevisi = document.getElementById('btn_revisi');
  const btnSetuju = document.getElementById('btn_setuju');
  if (status == 'SPJ Diterima') {
    btnRevisi.style.visibility = 'hidden';
    btnSetuju.style.visibility = 'hidden';
  } else {
    // btnRevisi.style.visibility = 'visible';
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
              <i class="fa-solid fa-chevron-down"></i>
            </div>
            <form onSubmit={spj} className="addProposal" action="">
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
                <p>Jumlah Dana Yang di setujui</p>
                <div className="contInput">
                  <input value={dana_disetujui} readOnly={true} type="text" placeholder="Data belum di input"></input>
                  <p className="kosong">jumlah dana yang di setujui</p>
                </div>
              </div>

              <div className="finput">
                <p>Keterangan Oleh Bagian Keuangan</p>
                <div className="contInput">
                  <input className="textbox" type="text" placeholder="Data belum di input" value={keterangan_keuangan} readOnly={true} />
                </div>
              </div>

              <div className="finput">
                <p>Upload Berkas SPJ</p>
                <div className="contInput">
                  <div className="file-up">
                    <label className="file-upload">
                      <i class="fa-solid fa-file-arrow-up"></i>
                      <input type="file" className="upload" onChange={loadFileSPJ}></input>
                      {/* <p className="text">name file .pdf</p> */}
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
                      <i class="fa-solid fa-file-arrow-up"></i>
                      <input type="file" className="upload" onChange={loadFileDukungSPJ}></input>
                      <span>Select File</span>
                    </label>
                    <p className="text-upload">{nameFilePdkg}</p>
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
                    {/* <input className="input-status" type="text" placeholder="text"></input> */}
                  </div>
                </div>
              </div>
              <div className="finput">
                <p>Berkas File SPJ</p>
                <div className="contInput">
                  <div className="file-BSPJ">
                    <a href={urlSPJ} target="_blank" className="btn_download">
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
                    <a href={urlDukungSPJ} target="_blank" className="btn_download">
                      {' '}
                      <i class="fa-solid fa-file-arrow-down"></i>Download
                    </a>
                    <p className="text">{namafileDukungSPJ}</p>
                  </div>
                </div>
              </div>

              {user && user.role === 'mahasiswa' && (
                <>
                  <div className="fbtn-form">
                    <button id="btn_ajukan" onClick={(e) => {
                      e.preventDefault();
                      const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                      popUpPermit.classList.toggle('permitShow');
                    }} type="submit" className="Ajukan">
                      <i class="fa-solid fa-check"></i>Ajukan SPJ
                    </button>

                    <button onClick={() => {
                      if (msg1 == 'success' && msg2 == 'success') {
                        setStatus(status);
                        const PopUpSPJ = document.getElementsByClassName('popUp-SPJ')[1];
                        PopUpSPJ.classList.toggle('SPJShow');
                        setTimeout(() => {
                          PopUpSPJ.classList.toggle('SPJShow');
                        }, 2500);
                      } else {
                        const PopUpSetuju = document.getElementsByClassName('popUp-SPJ')[2];
                        PopUpSetuju.classList.toggle('SPJShow');
                        setTimeout(() => {
                          PopUpSetuju.classList.toggle('SPJShow');
                        }, 2000);
                      }
                    }} type="submit" className="Ajukan">
                      <i class="fa-solid fa-floppy-disk"></i>Simpan
                    </button>
                  </div>

                  <div className="popUp-SPJ SPJShow">
                    <div className="container-popUp">
                      <div className="icon">
                        <i class="fa-solid fa-check"></i>
                      </div>
                      <p>Berhasil!</p>
                      <p>Mengajukan Surat Pertanggung Jawaban</p>
                    </div>
                  </div>
                  <div className="popUp-SPJ SPJShow">
                    <div className="container-popUp">
                      <div className="icon">
                        <i class="fa-solid fa-check"></i>
                      </div>
                      <p>Berhasil!</p>
                      <p>Menyimpan Data</p>
                    </div>
                  </div>
                  <div className="popUp-SPJ SPJShow Critical">
                    <div className="container-popUp">
                      <div className="icon">
                        <i class="fa-solid fa-x"></i>
                      </div>
                      <p>Periksa File Upload</p>
                    </div>
                  </div>
                  <div className="container-popup-permit permitShow">
                    <div className="container-content">
                      <p> apakah data SPJ anda sudah benar ?</p>
                      <div className="btn-permit">
                        <button
                          type="submit"
                          onClick={() => {
                            if (msg1 == 'success' && msg2 == 'success') {
                              const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                              popUpPermit.classList.toggle('permitShow');
                              setStatus('SPJ');

                              const PopUpSetuju = document.getElementsByClassName('popUp-SPJ')[0];
                              PopUpSetuju.classList.toggle('SPJShow');
                              setTimeout(() => {
                                PopUpSetuju.classList.toggle('SPJShow');
                              }, 2000);
                            } else {
                              const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                              popUpPermit.classList.toggle('permitShow');
                              const PopUpSetuju = document.getElementsByClassName('popUp-SPJ')[2];
                              PopUpSetuju.classList.toggle('SPJShow');
                              setTimeout(() => {
                                PopUpSetuju.classList.toggle('SPJShow');
                              }, 2000);
                            }
                          }}
                        >
                          ok
                        </button>
                        <button
                          onClick={() => {
                            const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                            popUpPermit.classList.toggle('permitShow');
                          }}
                        >
                          cancel
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
                      <i class="fa-solid fa-check"></i>Ajukan SPJ
                    </button>

                    <button
                      onClick={() => {
                        if (msg1 == 'success' && msg2 == 'success') {
                          setStatus(status);
                          const PopUpSPJ = document.getElementsByClassName('popUp-SPJ')[1];
                          PopUpSPJ.classList.toggle('SPJShow');
                          setTimeout(() => {
                            PopUpSPJ.classList.toggle('SPJShow');
                          }, 2500);
                        } else {
                          const PopUpSetuju = document.getElementsByClassName('popUp-SPJ')[2];
                          PopUpSetuju.classList.toggle('SPJShow');
                          setTimeout(() => {
                            PopUpSetuju.classList.toggle('SPJShow');
                          }, 2000);
                        }
                      }}
                      type="submit"
                      className="Ajukan"
                    >
                      <i class="fa-solid fa-floppy-disk"></i>Simpan
                    </button>
                  </div>
                  <div className="popUp-SPJ SPJShow">
                    <div className="container-popUp">
                      <div className="icon">
                        <i class="fa-solid fa-check"></i>
                      </div>
                      <p>Berhasil!</p>
                      <p>Mengajukan Surat Pertanggung Jawaban</p>
                    </div>
                  </div>
                  <div className="popUp-SPJ SPJShow">
                    <div className="container-popUp">
                      <div className="icon">
                        <i class="fa-solid fa-check"></i>
                      </div>
                      <p>Berhasil!</p>
                      <p>Menyimpan Data</p>
                    </div>
                  </div>
                  <div className="popUp-SPJ SPJShow Critical">
                    <div className="container-popUp">
                      <div className="icon">
                        <i class="fa-solid fa-x"></i>
                      </div>
                      <p>Periksa File Upload</p>
                    </div>
                  </div>
                  <div className="container-popup-permit permitShow">
                    <div className="container-content">
                      <p> apakah data SPJ anda sudah benar ?</p>
                      <div className="btn-permit">
                        <button
                          type="submit"
                          onClick={() => {
                            if (msg1 == 'success' && msg2 == 'success') {
                              const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                              popUpPermit.classList.toggle('permitShow');
                              setStatus('SPJ');

                              const PopUpSetuju = document.getElementsByClassName('popUp-SPJ')[0];
                              PopUpSetuju.classList.toggle('SPJShow');
                              setTimeout(() => {
                                PopUpSetuju.classList.toggle('SPJShow');
                              }, 2000);
                            } else {
                              const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                              popUpPermit.classList.toggle('permitShow');
                              const PopUpSetuju = document.getElementsByClassName('popUp-SPJ')[2];
                              PopUpSetuju.classList.toggle('SPJShow');
                              setTimeout(() => {
                                PopUpSetuju.classList.toggle('SPJShow');
                              }, 2000);
                            }
                          }}
                        >
                          ok
                        </button>
                        <button
                          onClick={() => {
                            const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                            popUpPermit.classList.toggle('permitShow');
                          }}
                        >
                          cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>
          <form onSubmit={updateKetSPJ} className="form-Komfirmasi">
            <div className="headForm">
              <p>Kolom Konfirmasi SPJ</p>
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
                <input type="text" placeholder={keterangan_spj ? keterangan_spj : 'Keterangan SPJ'} value={keterangan_spj} onChange={(e) => setKetSpj(e.target.value)}></input>
                <p className="text-konfirmasi">Keterangan</p>
              </div>
            </div>

            <div className="finput">
              <p>Revisi file SPJ</p>
              <div className="contInput">
                <div className="file-BSPJ">
                  <label className="file-upload">
                    <i class="fa-solid fa-file-arrow-up"></i>
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
                  <p className="text-upload">{nameRevisiSpj}</p>
                </div>
              </div>
            </div>
            {user && user.role === 'adminKeuangan' && (
              <div className="btn-komfirm-lpj">
                <button id="btn_setuju" onClick={() => setStatus('SPJ Diterima')} type="submit" className="setuju">
                  <i class="fa-solid fa-check"></i>Setuju
                </button>

                <button id="btn_revisi" onClick={() => setStatus('SPJ Revisi')} type="submit" className="revisi">
                  <i class="fa-solid fa-pen"></i>Revisi
                </button>

                <button onClick={() => setStatus(status)} type="submit" className="edit">
                  <i class="fa-solid fa-floppy-disk"></i>Simpan
                </button>
              </div>
            )}

            {user && user.role == 'admin' && (
              <>
                <div className="btn-komfirm-lpj">
                  <button
                    id="btn_setuju"
                    onClick={() => {
                      const popUpPermit = document.getElementsByClassName('container-popup-permit')[1];
                      popUpPermit.classList.toggle('permitShow');
                    }}
                    className="setuju"
                  >
                    <i class="fa-solid fa-check"></i>Setuju
                  </button>

                  <button
                    id="btn_revisi"
                    onClick={() => {
                      const popUpPermit = document.getElementsByClassName('container-popup-permit')[2];
                      popUpPermit.classList.toggle('permitShow');
                    }}
                    type="submit"
                    className="revisi"
                  >
                    <i class="fa-solid fa-pen"></i>Revisi
                  </button>

                  <button
                    onClick={() => {
                      setStatus(status);
                      const PopUpSimpan = document.getElementsByClassName('popUp-KSPJ')[2];
                      PopUpSimpan.classList.toggle('SPJShow');
                      setTimeout(() => {
                        PopUpSimpan.classList.toggle('SPJShow');
                      }, 2000);
                    }}
                    type="submit"
                    className="edit"
                  >
                    <i class="fa-solid fa-floppy-disk"></i>Simpan
                  </button>
                </div>
                <div className="container-popup-permit permitShow">
                  <div className="container-content">
                    <p> apakah anda yakin ingin menyetujui SPJ ini ?</p>
                    <div className="btn-permit">
                      <button
                        type="submit"
                        onClick={() => {
                          const popUpPermit = document.getElementsByClassName('container-popup-permit')[1];
                          popUpPermit.classList.toggle('permitShow');
                          setStatus('SPJ Diterima');

                          const PopUpSetuju = document.getElementsByClassName('popUp-KSPJ')[0];
                          PopUpSetuju.classList.toggle('SPJShow');
                          setTimeout(() => {
                            PopUpSetuju.classList.toggle('SPJShow');
                          }, 2000);
                        }}
                      >
                        ok
                      </button>
                      <button
                        onClick={() => {
                          const popUpPermit = document.getElementsByClassName('container-popup-permit')[1];
                          popUpPermit.classList.toggle('permitShow');
                        }}
                      >
                        cancel
                      </button>
                    </div>
                  </div>
                </div>
                <div className="popUp-KSPJ SPJShow">
                  <div className="container-popUp">
                    <div className="icon">
                      <i class="fa-solid fa-check"></i>
                    </div>
                    <p>Berhasil!</p>
                    <p>Menyetujui SPJ</p>
                  </div>
                </div>
                <div className="container-popup-permit permitShow">
                  <div className="container-content">
                    <p> Apakah Anda yakin ingin merevisi SPJ ini ?</p>
                    <div className="btn-permit">
                      <button
                        type="submit"
                        onClick={() => {
                          const popUpPermit = document.getElementsByClassName('container-popup-permit')[2];
                          popUpPermit.classList.toggle('permitShow');
                          setStatus('SPJ Revisi');

                          const PopUpSetuju = document.getElementsByClassName('popUp-KSPJ')[1];
                          PopUpSetuju.classList.toggle('SPJShow');
                          setTimeout(() => {
                            PopUpSetuju.classList.toggle('SPJShow');
                          }, 2000);
                        }}
                      >
                        ok
                      </button>
                      <button
                        onClick={() => {
                          const popUpPermit = document.getElementsByClassName('container-popup-permit')[2];
                          popUpPermit.classList.toggle('permitShow');
                        }}
                      >
                        cancel
                      </button>
                    </div>
                  </div>
                </div>

                <div className="popUp-KSPJ SPJShow">
                  <div className="container-popUp">
                    <div className="icon">
                      <i class="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <p>Revisi SPJ</p>
                  </div>
                </div>
                <div className="popUp-KSPJ SPJShow">
                  <div className="container-popUp">
                    <div className="icon">
                      <i class="fa-solid fa-check"></i>
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
