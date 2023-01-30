import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './DLaporanPJ.css';
import { useSyncExternalStore } from 'react';

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
  const [status, setStatus] = useState('');
  const [ket_spj, setKetSpj] = useState('');
  const [keterangan_akademik, setKetAkademik] = useState('');
  const [dana_disetujui, setDanaSetuju] = useState('');
  const [msg, setMsg] = useState('');
  const [nameLPJ, setNameLPJ] = useState('');
  const [nameRevisiLPJ, setNameRevisiLPJ] = useState('');
  const [ketAka, setKetAka] = useState('');
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
        setUrl(response.data.url_lpj);
        setNamaFile(response.data.lpj);
        setKetSpj(response.data.keterangan_spj);
        setDanaSetuju(response.data.dana_disetujui);
        setKetAka(response.data.keterangan_akademik);
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
    setNameLPJ(e.target.files[0].name);
  };

  const handleStatus = async (status) => {
    const formData = new FormData();
    formData.append('status', status);

    try {
      await axios.patch(`http://localhost:3000/spj/status/${uuid}`, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateLPJ = async (e) => {
    const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
    popUpPermit.classList.toggle('permitShow');
    e.preventDefault();
    const newstatus = 'LPJ Di Ajukan';
    const oldstatus = 'SPJ Diterima';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('status', newstatus);

    try {
      await axios
        .patch(`http://localhost:3000/lpj/${uuid}`, formData, {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        })
        .then(() => {
          const PopUpSetuju = document.getElementsByClassName('popUp-LPJ')[0];
          PopUpSetuju.classList.toggle('LPJShow');
          setStatus('LPJ Di Ajukan');
          handleStatus(newstatus);
          setTimeout(() => {
            PopUpSetuju.classList.toggle('LPJShow');
          }, 2000);
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data.msg);
            const PopUpSetuju = document.getElementsByClassName('popUp-LPJ')[1];
            PopUpSetuju.classList.toggle('LPJShow');
            setTimeout(() => {
              PopUpSetuju.classList.toggle('LPJShow');
            }, 2000);
          }
        });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const handleSimpanLPJ = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('status', status);

    try {
      await axios
        .patch(`http://localhost:3000/lpj/${uuid}`, formData, {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        })
        .then(() => {
          const PopUpSetuju = document.getElementsByClassName('popUp-LPJ')[2];
          PopUpSetuju.classList.toggle('LPJShow');
          setTimeout(() => {
            PopUpSetuju.classList.toggle('LPJShow');
          }, 2000);
        })
        .catch(function (error) {
          if (error.response) {
            const PopUpSetuju = document.getElementsByClassName('popUp-LPJ')[3];
            PopUpSetuju.classList.toggle('LPJShow');
            setTimeout(() => {
              PopUpSetuju.classList.toggle('LPJShow');
            }, 2000);
            setMsg(error.response.data.msg);
          }
        });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const revisiLPJ = async (e) => {
    // e.preventDefault();
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
  };

  const updateKetAkademik = async (e) => {
    const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
    popUpPermit.classList.toggle('permitShow');
    e.preventDefault();
    const formData = new FormData();
    formData.append('keterangan_akademik', keterangan_akademik);
    formData.append('file', file);
    formData.append('status', status);

    try {
      await axios
        .patch(`http://localhost:3000/lpj/akademik/${uuid}`, formData, {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        })
        .then(() => {
          handleStatus('Selesai');
          setStatus('Selesai');
          const PopUpSetuju = document.getElementsByClassName('popUp-KLPJ')[0];
          PopUpSetuju.classList.toggle('LPJShow');
          setTimeout(() => {
            PopUpSetuju.classList.toggle('LPJShow');
          }, 2000);
        });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        const PopUpSetuju = document.getElementsByClassName('popUp-KLPJ')[1];
        PopUpSetuju.classList.toggle('LPJShow');
        setTimeout(() => {
          PopUpSetuju.classList.toggle('LPJShow');
        }, 2000);
      }
    }
  };

  const updateKetAkademikAdmin = async () => {
    const formData = new FormData();
    formData.append('keterangan_akademik', keterangan_akademik);
    formData.append('file', file);
    formData.append('status', status);

    try {
      await axios
        .patch(`http://localhost:3000/lpj/akademik/${uuid}`, formData, {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        })
        .then(() => {
          const popUpPermit = document.getElementsByClassName('container-popup-permit')[1];
          popUpPermit.classList.toggle('permitShow');
          handleStatus('Selesai');
          setStatus('Selesai');
          const PopUpSetuju = document.getElementsByClassName('popUp-KLPJ')[0];
          PopUpSetuju.classList.toggle('LPJShow');
          setTimeout(() => {
            PopUpSetuju.classList.toggle('LPJShow');
          }, 2000);
        });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        const PopUpSetuju = document.getElementsByClassName('popUp-KLPJ')[1];
        PopUpSetuju.classList.toggle('LPJShow');
        setTimeout(() => {
          PopUpSetuju.classList.toggle('LPJShow');
        }, 2000);
      }
    }
  };
  const revisiKetAkademik = async (e, item) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('keterangan_akademik', keterangan_akademik);
    formData.append('file', file);
    formData.append('status', item);

    try {
      await axios
        .patch(`http://localhost:3000/lpj/akademik/${uuid}`, formData, {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        })
        .then(() => {
          setStatus('LPJ Revisi');
          const PopUpSetuju = document.getElementsByClassName('popUp-KLPJ')[2];
          PopUpSetuju.classList.toggle('LPJShow');
          setTimeout(() => {
            PopUpSetuju.classList.toggle('LPJShow');
          }, 2000);
        });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        const PopUpSetuju = document.getElementsByClassName('popUp-KLPJ')[3];
        PopUpSetuju.classList.toggle('LPJShow');
        setTimeout(() => {
          PopUpSetuju.classList.toggle('LPJShow');
        }, 2000);
      }
    }
  };

  const simpanKetAkademik = async (e, item) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('keterangan_akademik', keterangan_akademik);
    formData.append('file', file);
    formData.append('status', item);

    try {
      await axios
        .patch(`http://localhost:3000/lpj/akademik/${uuid}`, formData, {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        })
        .then(() => {
          setStatus(status);
          const PopUpSetuju = document.getElementsByClassName('popUp-KLPJ')[4];
          PopUpSetuju.classList.toggle('LPJShow');
          setTimeout(() => {
            PopUpSetuju.classList.toggle('LPJShow');
          }, 2000);
        });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const RenderUpload = () => {
    return (
      <div className="finput">
        <p>Upload Laporan Pertanggung Jawaban</p>
        <div className="contInput">
          <div className="file-up">
            <label className="file-upload">
              <i class="fa-solid fa-file-arrow-up"></i>
              <input type="file" name="file" onChange={loadFile} className="upload"></input>
              <span>Select File</span>
            </label>
            <p className="text-upload">{nameLPJ}</p>
          </div>
        </div>
      </div>
    );
  };
  const RUploadRevisi = () => {
    return (
      <div className="finput">
        <p>Upload Laporan Pertanggung Jawaban [Revisi]</p>
        <div className="contInput">
          <div className="file-up">
            <label className="file-upload">
              <i class="fa-solid fa-file-arrow-up"></i>
              <input type="file" name="file" onChange={loadFile} className="upload"></input>
              <span>Select File</span>
            </label>
            <p className="text-upload">{nameLPJ}</p>
          </div>
        </div>
      </div>
    );
  };

  const RenderUploadKonfirmasi = () => {
    return (
      <div className="finput">
        <p>Revisi file LPJ</p>
        <div className="contInput">
          <div className="file-BSPJ">
            <label className="file-upload">
              <i class="fa-solid fa-file-arrow-up"></i>
              <input
                type="file"
                name="file"
                onChange={(e) => {
                  const proposal = e.target.files[0];
                  setFile(proposal);
                  setNameRevisiLPJ(e.target.files[0].name);
                }}
                className="upload"
              ></input>
              <span>Select File</span>
            </label>
            <p className="text-upload">{nameRevisiLPJ}</p>
          </div>
        </div>
      </div>
    );
  };
  if (user.role == 'mahasiswa') {
    if (status == 'LPJ Di Ajukan') {
      const buttonAjukanmhs = document.getElementsByClassName('btn-ajukanmhs')[0];
      buttonAjukanmhs.style.visibility = 'hidden';
    }
  }

  return (
    <>
      <div className="addPropalForm-container">
        <div className="hProposalForm">
          <h2>Laporan Pertanggung Jawaban</h2>
          <p>List LPJ/ Detail LPJ</p>
        </div>
        <div className="container-formAddProp">
          <div className="formaddProp">
            <div className="headForm">
              <p>Detail Laporan Pertanggung Jawaban</p>
              <i class="fa-solid fa-chevron-down"></i>
            </div>
            <form onSubmit={updateLPJ} className="addProposal" action="">
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
                <p>Keterangan SPJ Oleh Bagian Keuangan</p>
                <div className="contInput">
                  <input className="textbox" type="text" placeholder="Data belum di input" value={ket_spj} readOnly={true} />
                </div>
              </div>

              {/* Render upload  */}
              {user && user.role == 'mahasiswa' && status == 'SPJ Diterima' ? RenderUpload() : ''}
              {user && user.role == 'mahasiswa' && status == 'LPJ Revisi' ? RUploadRevisi() : ''}
              {user && user.role == 'admin' && RenderUpload()}

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
                    <a href={url} target="_blank" className="btn_download">
                      <i class="fa-solid fa-file-arrow-down"></i>Download
                    </a>
                    <p>{namafile}</p>
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
                      className="Ajukan btn-ajukanmhs"
                    >
                      <i class="fa-solid fa-check"></i>Ajukan
                    </button>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleSimpanLPJ();
                      }}
                      className="Ajukan"
                    >
                      <i class="fa-solid fa-floppy-disk"></i>Simpan
                    </button>
                  </div>
                  {/* POPUP */}
                  <div className="container-popup-permit permitShow">
                    <div className="container-content">
                      <div className="icon">
                        <i class="fa-solid fa-circle-exclamation"></i>
                      </div>
                      <p> Apakah Anda yakin ingin mengajukan LPJ ini ?</p>
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
                  <div className="popUp-LPJ LPJShow">
                    <div className="container-popUp">
                      <div className="icon">
                        <i class="fa-solid fa-check"></i>
                      </div>
                      <p>Berhasil!</p>
                      <p>Mengajukan Laporan Pertanggung Jawaban</p>
                    </div>
                  </div>
                  <div className="popUp-LPJ LPJShow">
                    <div className="container-popUp">
                      <div className="icon">
                        <i class="fa-solid fa-check"></i>
                      </div>
                      <p>Gagal!</p>
                      <p>Mengajukan Laporan Pertanggung Jawaban</p>
                      <p>{msg}</p>
                    </div>
                  </div>
                  <div className="popUp-LPJ LPJShow">
                    <div className="container-popUp">
                      <div className="icon">
                        <i class="fa-solid fa-check"></i>
                      </div>
                      <p>Berhasil Menyimpan Pembaruan</p>
                    </div>
                  </div>
                  <div className="popUp-LPJ LPJShow ">
                    <div className="container-popUp">
                      <div className="icon">
                        <i class="fa-solid fa-check"></i>
                      </div>
                      <p>Gagal Menyimpan Pembaruan</p>
                      <p>{msg}</p>
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
                      className="Ajukan"
                    >
                      <i class="fa-solid fa-check"></i>Ajukan
                    </button>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleSimpanLPJ();
                      }}
                      className="Ajukan"
                    >
                      <i class="fa-solid fa-floppy-disk"></i>Simpan
                    </button>
                  </div>

                  <div className="container-popup-permit permitShow">
                    <div className="container-content">
                      <div className="icon">
                        <i class="fa-solid fa-circle-exclamation"></i>
                      </div>
                      <p> Apakah Anda yakin ingin mengajukan LPJ ini ?</p>
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
                  <div className="popUp-LPJ LPJShow">
                    <div className="container-popUp">
                      <div className="icon">
                        <i class="fa-solid fa-check"></i>
                      </div>
                      <p>Berhasil!</p>
                      <p>Mengajukan Laporan Pertanggung Jawaban</p>
                    </div>
                  </div>
                  <div className="popUp-LPJ LPJShow">
                    <div className="container-popUp">
                      <div className="icon">
                        <i class="fa-solid fa-check"></i>
                      </div>
                      <p>Gagal!</p>
                      <p>Mengajukan Laporan Pertanggung Jawaban</p>
                      <p>{msg}</p>
                    </div>
                  </div>
                  <div className="popUp-LPJ LPJShow">
                    <div className="container-popUp">
                      <div className="icon">
                        <i class="fa-solid fa-check"></i>
                      </div>
                      <p>Berhasil Menyimpan Pembaruan</p>
                    </div>
                  </div>
                  <div className="popUp-LPJ LPJShow ">
                    <div className="container-popUp">
                      <div className="icon">
                        <i class="fa-solid fa-check"></i>
                      </div>
                      <p>Gagal Menyimpan Pembaruan</p>
                      <p>{msg}</p>
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>
          <form onSubmit={updateKetAkademik} className="form-Komfirmasi">
            <div className="headForm">
              <p>Kolom Konfirmasi Bagian Akademik</p>
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

            {user && user.role == 'mahasiswa' && (
              <div className="finput">
                <p>Keterangan bagian Akademik</p>
                <div className="contInput">
                  <input type="text" placeholder="Ketikan disini ..." value={ketAka} onChange={(e) => setKetAkademik(e.target.value)} readOnly></input>
                  <p className="text-konfirmasi">Keterangan</p>
                </div>
              </div>
            )}
            {user && (user.role == 'adminAkademik' || user.role == 'admin') ? (
              <div className="finput">
                <p>Keterangan bagian Akademik</p>
                <div className="contInput">
                  <input type="text" placeholder="Ketikan disini ..." value={keterangan_akademik} onChange={(e) => setKetAkademik(e.target.value)}></input>
                  <p className="text-konfirmasi">Keterangan</p>
                </div>
              </div>
            ) : (
              ''
            )}

            {/* Render Upload Konfirmasi */}
            {user && user.role == 'adminAkademik' && RenderUploadKonfirmasi()}
            {user && user.role == 'admin' && RenderUploadKonfirmasi()}

            {user && user.role === 'adminAkademik' && (
              <>
                <div className="btn-komfirm-lpj">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                      popUpPermit.classList.toggle('permitShow');
                    }}
                    id="btn_setuju"
                    className="setuju"
                  >
                    <i class="fa-solid fa-check"></i>Setuju
                  </button>

                  <button
                    id="btn_revisi"
                    onClick={(e) => {
                      e.preventDefault();
                      const popUpPermit = document.getElementsByClassName('container-popup-permit')[1];
                      popUpPermit.classList.toggle('permitShow');
                    }}
                    className="revisi"
                  >
                    <i class="fa-solid fa-pen"></i>Revisi
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      simpanKetAkademik(e, status);
                    }}
                    className="edit"
                  >
                    <i class="fa-solid fa-floppy-disk"></i>Simpan
                  </button>
                </div>

                {/* POP UP */}
                <div className="container-popup-permit permitShow">
                  <div className="container-content">
                    <p> Apakah Anda yakin ingin menyetujui LPJ ini ?</p>
                    <div className="btn-permit">
                      <button type="submit">Oke</button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          updateKetAkademik();
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
                      <i class="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <p> Apakah Anda yakin ingin revisi LPJ ini ?</p>
                    <div className="btn-permit">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const popUpPermit = document.getElementsByClassName('container-popup-permit')[1];
                          popUpPermit.classList.toggle('permitShow');
                          revisiKetAkademik(e, 'LPJ Revisi');
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

                <div className="popUp-KLPJ LPJShow">
                  <div className="container-popUp">
                    <div className="icon">
                      <i class="fa-solid fa-check"></i>
                    </div>
                    <p>LPJ Berhasil DiSetujui</p>
                  </div>
                </div>
                <div className="popUp-KLPJ LPJShow">
                  <div className="container-popUp">
                    <div className="icon">
                      <i class="fa-solid fa-check"></i>
                    </div>
                    <p>Gagal Menyetujui LPJ</p>
                    <p>{msg}</p>
                  </div>
                </div>
                <div className="popUp-KLPJ LPJShow">
                  <div className="container-popUp">
                    <div className="icon">
                      <i class="fa-solid fa-exclamation"></i>
                    </div>
                    <p>LPJ Revisi</p>
                  </div>
                </div>
                <div className="popUp-KLPJ LPJShow">
                  <div className="container-popUp">
                    <div className="icon">
                      <i class="fa-solid fa-exclamation"></i>
                    </div>
                    <p>Gagal!</p>
                    <p>Merevisi LPJ</p>
                    <p>Note : {msg}</p>
                  </div>
                </div>
                <div className="popUp-KLPJ LPJShow">
                  <div className="container-popUp">
                    <div className="icon">
                      <i class="fa-solid fa-check"></i>
                    </div>
                    <p>Berhasi Perbarui!</p>
                  </div>
                </div>
              </>
            )}

            {user && user.role == 'admin' && (
              <>
                <div className="btn-komfirm-lpj">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const popUpPermit = document.getElementsByClassName('container-popup-permit')[1];
                      popUpPermit.classList.toggle('permitShow');
                    }}
                    id="btn_setuju"
                    className="setuju"
                  >
                    <i class="fa-solid fa-check"></i>Setuju
                  </button>

                  <button
                    id="btn_revisi"
                    onClick={(e) => {
                      e.preventDefault();
                      const popUpPermit = document.getElementsByClassName('container-popup-permit')[2];
                      popUpPermit.classList.toggle('permitShow');
                    }}
                    className="revisi"
                  >
                    <i class="fa-solid fa-pen"></i>Revisi
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();

                      simpanKetAkademik(e, status);
                    }}
                    className="edit"
                  >
                    <i class="fa-solid fa-floppy-disk"></i>Simpan
                  </button>
                </div>
                {/* pop komfirm */}
                <div className="container-popup-permit permitShow">
                  <div className="container-content">
                    <div className="icon">
                      <i class="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <p> Apakah Anda yakin ingin menyetujui LPJ ini ?</p>
                    <div className="btn-permit">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          updateKetAkademikAdmin();
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
                      <i class="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <p> Apakah Anda yakin ingin revisi LPJ ini ?</p>
                    <div className="btn-permit">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const popUpPermit = document.getElementsByClassName('container-popup-permit')[2];
                          popUpPermit.classList.toggle('permitShow');
                          revisiKetAkademik(e, 'LPJ Revisi');
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

                <div className="popUp-KLPJ LPJShow">
                  <div className="container-popUp">
                    <div className="icon">
                      <i class="fa-solid fa-check"></i>
                    </div>
                    <p>LPJ Berhasil DiSetujui</p>
                  </div>
                </div>
                <div className="popUp-KLPJ LPJShow">
                  <div className="container-popUp">
                    <div className="icon">
                      <i class="fa-solid fa-check"></i>
                    </div>
                    <p>Gagal Menyetujui LPJ</p>
                    <p>{msg}</p>
                  </div>
                </div>
                <div className="popUp-KLPJ LPJShow">
                  <div className="container-popUp">
                    <div className="icon">
                      <i class="fa-solid fa-exclamation"></i>
                    </div>
                    <p>LPJ Revisi</p>
                  </div>
                </div>
                <div className="popUp-KLPJ LPJShow">
                  <div className="container-popUp">
                    <div className="icon">
                      <i class="fa-solid fa-exclamation"></i>
                    </div>
                    <p>Gagal!</p>
                    <p>Merevisi LPJ</p>
                    <p>Note : {msg}</p>
                  </div>
                </div>
                <div className="popUp-KLPJ LPJShow">
                  <div className="container-popUp">
                    <div className="icon">
                      <i class="fa-solid fa-check"></i>
                    </div>
                    <p>Berhasi Perbarui!</p>
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
