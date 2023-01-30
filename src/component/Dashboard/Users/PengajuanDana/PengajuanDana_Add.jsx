import React, { useEffect, useState } from 'react';
import './PengajuanDana_Add.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

function PengajuanDana_Add() {
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
  const [keterangan_keuangan, setKetKeuangan] = useState('');
  const [dana_disetujui, setDanaSetuju] = useState('');
  const [ketwd3, setKetWd3] = useState('');
  const [msg, setMsg] = useState('');
  const [namePropWD3, setNamePropWD3] = useState('');
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [validFile, setValidFile] = useState(false);

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
        setUrl(response.data.url_proposal);
        setNamaFile(response.data.proposal);
        setKetWd3(response.data.keterangan_wd3);
        setKetKeuangan(response.data.keterangan_keuangan);
        setDanaSetuju(response.data.dana_disetujui);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProposalById();
    // if (user && user.role !== 'admin') {
    //   const btn = document.getElementById('btn_setuju');
    //   btn.style.visibility = 'hidden';
    // }
  }, [uuid]);

  const loadFile = (e) => {
    const proposal = e.target.files[0];
    setFile(proposal);
    setNamePropWD3(e.target.files[0].name);
    setValidFile(true);
  };

  // const handleClose = () => {
  //   const closepop = document.getElementsByClassName('popUp')[0];
  //   closepop.classList.toggle('popshow');
  // };

  const updateProposalTDD = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('status', status);

    try {
      await axios
        .patch(`http://localhost:3000/updaterevisi/${uuid}`, formData, {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        })
        .then(() => setMsg('success'))
        .catch(function (error) {
          if (error.response) {
            setMsg(error.response.data);
            setMsg(error.response.status);
          } else {
            setMsg(error.message);
          }
        });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const updateKetKeuangan = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('keterangan_keuangan', keterangan_keuangan);
    formData.append('dana_disetujui', dana_disetujui);
    formData.append('status', status);

    try {
      await axios
        .patch(`http://localhost:3000/updatekeuangan/${uuid}`, formData, {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        })
        .then(() => setMsg('success'))
        .catch(function (error) {
          if (error.response) {
            setMsg(error.response.data);
            setMsg(error.response.status);
          } else {
            setMsg(error.message);
          }
        });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  // check kondition button setujui/ tolak
  if (status == 'Proposal ACC') {
    const conditionAcc = document.getElementsByClassName('condition-acc')[0];
    conditionAcc.style.backgroundColor = 'green';
    const icon = conditionAcc.getElementsByTagName('i')[0];
    console.log(icon);
    icon.className = 'fa-solid fa-check';
  } else if (status == 'Proposal di tolak') {
    const conditionAcc = document.getElementsByClassName('condition-acc')[0];

    conditionAcc.style.backgroundColor = 'red';
    const icon = conditionAcc.getElementsByTagName('i')[0];
    console.log(icon);
    icon.className = 'fa-solid fa-x';
  }

  //check status button
  if (status == 'Berkegiatan') {
    const btn = document.getElementById('btn_setuju');
    btn.style.visibility = 'hidden';
  }

  return (
    <>
      <div className="addPropalForm-container">
        <div className="hProposalForm">
          <h2>Pengajuan Dana</h2>
          <p>List Pengajuan / Detail Dana</p>
        </div>
        <div className="container-formAddProp">
          <div className="formaddProp">
            <div className="headForm">
              <p>Detail Pengajuan Dana</p>
              <i class="fa-solid fa-chevron-down"></i>
            </div>
            <form onSubmit={updateProposalTDD} className="addProposal" action="">
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
                <p>Keterangan Oleh WD3</p>
                <div className="contInput">
                  <input className="textbox" type="text" placeholder="silahkan isi ..." value={ketwd3} readOnly={true} />
                </div>
              </div>

              {(user && user.role === 'mahasiswa') || (user && user.role === 'admin') ? (
                <div className="finput">
                  <p>Upload Proposal sudah ada ttd WDIII</p>
                  <div className="contInput">
                    <div className="content">
                      <label className="file-upload">
                        <input type="file" name="file" onChange={loadFile} className="upload"></input>
                        <span>Choose File</span>
                      </label>
                      <p className="text-upload">{namePropWD3}</p>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}

              <div className="finput">
                <p>Status</p>
                <div className="contInput">
                  <button disabled className="condition-acc">
                    <i class="fa-solid fa-circle-info"></i> {status}
                  </button>
                </div>
              </div>

              {status == 'Proposal pengajuan dana' && (
                <div className="finput">
                  <p>Download proposal sudah ada ttd WDIII</p>
                  <div className="contInput">
                    <div className="down-approve">
                      <a href={url} target="_blank">
                        {' '}
                        <i class="fa-solid fa-file-arrow-down"></i>Download
                      </a>
                      <p>{namafile}</p>
                    </div>
                  </div>
                </div>
              )}

              {user && user.role === 'mahasiswa' && (
                <>
                  <div className="fbtn-form">
                    <button
                      onClick={() => {
                        if (validFile === false) {
                          const PopUpSetuju = document.getElementsByClassName('popUp-Ajukan')[1];
                          PopUpSetuju.classList.toggle('AjukanShow');
                          setTimeout(() => {
                            PopUpSetuju.classList.toggle('AjukanShow');
                          }, 2000);
                        } else {
                          const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                          popUpPermit.classList.toggle('permitShow');
                        }
                      }}
                      type="submit"
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
                      <p> Apakah anda sudah yakin untuk mengajukan dana ?</p>
                      <div className="btn-permit">
                        <button
                          type="submit"
                          onClick={() => {
                            const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                            popUpPermit.classList.toggle('permitShow');
                            setStatus('Proposal pengajuan dana');

                            const PopUpSetuju = document.getElementsByClassName('popUp-Ajukan')[0];
                            PopUpSetuju.classList.toggle('AjukanShow');
                            setTimeout(() => {
                              PopUpSetuju.classList.toggle('AjukanShow');
                            }, 2000);
                          }}
                        >
                          Oke
                        </button>
                        <button
                          onClick={() => {
                            const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                            popUpPermit.classList.toggle('permitShow');
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="popUp-Ajukan AjukanShow">
                    <div className="container-popUp">
                      <div className="icon">
                        <i class="fa-solid fa-check"></i>
                      </div>
                      <p>Berhasil Mengajukan Dana</p>
                    </div>
                  </div>
                  <div className="popUp-Ajukan AjukanShow">
                    <div className="container-popUp">
                      <div className="iconx">
                        <i class="fa-solid fa-xmark"></i>
                      </div>
                      <p>Upload File Pengajuan Dana!</p>
                    </div>
                  </div>
                </>
              )}

              {user && user.role == 'admin' && (
                <>
                  <div className="fbtn-form">
                    <button
                      onClick={() => {
                        if (validFile == false) {
                          const PopUpSetuju = document.getElementsByClassName('popUp-Ajukan')[1];
                          PopUpSetuju.classList.toggle('AjukanShow');
                          setTimeout(() => {
                            PopUpSetuju.classList.toggle('AjukanShow');
                          }, 2000);
                        } else {
                          setStatus(status);
                          const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                          popUpPermit.classList.toggle('permitShow');
                        }
                      }}
                      type="submit"
                      className="Ajukan"
                    >
                      <i class="fa-solid fa-floppy-disk"></i>Simpan
                    </button>
                  </div>
                  <div className="popUp-Ajukan AjukanShow">
                    <div className="container-popUp">
                      <div className="icon">
                        <i class="fa-solid fa-check"></i>
                      </div>
                      <p>Berhasil Mengajukan Dana</p>
                    </div>
                  </div>
                  <div className="popUp-Ajukan AjukanShow">
                    <div className="container-popUp">
                      <div className="iconx">
                        <i class="fa-solid fa-xmark"></i>
                      </div>
                      <p>Upload File Pengajuan Dana!</p>
                    </div>
                  </div>
                  <div className="container-popup-permit permitShow">
                    <div className="container-content">
                      <div className="icon">
                        <i class="fa-solid fa-circle-exclamation"></i>
                      </div>
                      <p> Apakah anda sudah yakin untuk mengajukan dana ?</p>
                      <div className="btn-permit">
                        <button
                          type="submit"
                          onClick={() => {
                            const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                            popUpPermit.classList.toggle('permitShow');
                            setStatus('Proposal pengajuan dana');

                            const PopUpSetuju = document.getElementsByClassName('popUp-Ajukan')[0];
                            PopUpSetuju.classList.toggle('AjukanShow');
                            setTimeout(() => {
                              PopUpSetuju.classList.toggle('AjukanShow');
                            }, 2000);
                          }}
                        >
                          Oke
                        </button>
                        <button
                          onClick={() => {
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
          <form onSubmit={updateKetKeuangan} className="form-Komfirmasi">
            {user && user.role == 'mahasiswa' ? (
              status !== 'Proposal ACC' && status !== 'Proposal pengajuan dana' ? (
                <>
                  <div className="headForm">
                    <p>Konfirmasi Bagian Keuangan</p>
                    <i class="fa-solid fa-chevron-down"></i>
                  </div>
                  <hr className="line" />
                  <div className="finput">
                    <p>Keterangan dari Bagian Keuangan</p>
                    <div className="contInput">
                      <input
                        value={keterangan_keuangan}
                        onChange={(e) => setKetKeuangan(e.target.value)}
                        type="text"
                        placeholder={keterangan_keuangan}
                        className="textbox"
                        readOnly
                      ></input>
                      <p className="kosong">Keterangan</p>
                    </div>
                  </div>
                  <div className="finput">
                    <p>Jumlah Dana Yang di setujui</p>
                    <div className="contInput">
                      <input
                        value={dana_disetujui}
                        onChange={(e) => {
                          const formatRupiah = (angka, prefix) => {
                            let number_string = angka.replace(/[^,\d]/g, '').toString(),
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
                          };
                          setDanaSetuju(formatRupiah(e.target.value, 'Rp. '));
                        }}
                        type="text"
                        placeholder={dana_disetujui}
                        readOnly
                      ></input>
                      <p className="kosong">jumlah dana yang di setujui</p>
                    </div>
                  </div>
                  <div className="finput">
                    <p></p>
                  </div>
                </>
              ) : (
                <>
                  <h2>Menunggu ...</h2>
                  <p>Confirmasi Bagian Keuangan</p>
                </>
              )
            ) : (
              ''
            )}
            {user && user.role !== 'mahasiswa' && (
              <>
                <div className="headForm">
                  <p>Kolom Konfirmasi Bagian Keuangan</p>
                  <i class="fa-solid fa-chevron-down"></i>
                </div>
                <hr className="line" />
                <div className="finput">
                  <p>Keterangan dari Bagian Keuangan</p>
                  <div className="contInput">
                    <input value={keterangan_keuangan} onChange={(e) => setKetKeuangan(e.target.value)} type="text" placeholder="Ketikan disini..." className="textbox"></input>
                    <p className="kosong">keterangan</p>
                  </div>
                </div>
                <div className="finput">
                  <p>Jumlah Dana Yang di setujui</p>
                  <div className="contInput">
                    <input
                      value={dana_disetujui}
                      onChange={(e) => {
                        const formatRupiah = (angka, prefix) => {
                          let number_string = angka.replace(/[^,\d]/g, '').toString(),
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
                        };
                        setDanaSetuju(formatRupiah(e.target.value, 'Rp. '));
                      }}
                      type="text"
                      placeholder="Ketikan disini ..."
                    ></input>
                    <p className="kosong">jumlah dana yang di setujui</p>
                  </div>
                </div>
                <div className="finput">
                  <p></p>
                </div>
              </>
            )}
            {user && user.role === 'adminKeuangan' && (
              <>
                <div className="btn-komfirm">
                  <button
                    id="btn_setuju"
                    onClick={() => {
                      const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                      popUpPermit.classList.toggle('permitShow');
                    }}
                    type="submit"
                    className="Ajukan"
                  >
                    <i class="fa-solid fa-check"></i>Setuju
                  </button>

                  <div className="container-popup-permit permitShow">
                    <div className="container-content">
                      <div className="icon">
                        <i class="fa-solid fa-circle-exclamation"></i>
                      </div>
                      <p> Apakah Anda yakin menyetujui pengajuan dana tersebut ?</p>
                      <div className="btn-permit">
                        <button
                          type="submit"
                          onClick={() => {
                            const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                            popUpPermit.classList.toggle('permitShow');
                            setStatus('Berkegiatan');
                            const BKpopUp = document.getElementsByClassName('popUp-Bkeuangan')[0];
                            BKpopUp.classList.toggle('BKShow');
                            setTimeout(() => {
                              BKpopUp.classList.toggle('BKShow');
                            }, 2500);
                          }}
                        >
                          Oke
                        </button>
                        <button
                          onClick={() => {
                            const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                            popUpPermit.classList.toggle('permitShow');
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="popUp-Bkeuangan BKShow">
                    <div className="container-popUp">
                      <div className="icon">
                        <i class="fa-solid fa-check"></i>
                      </div>
                      <p>Berhasil!</p>
                      <p>Menyetujui Pengajuan Dana</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setStatus(status);
                      const BKpopUp = document.getElementsByClassName('popUp-Bkeuangan')[1];
                      BKpopUp.classList.toggle('BKShow');
                      setTimeout(() => {
                        BKpopUp.classList.toggle('BKShow');
                      }, 2000);

                      setTimeout(() => {
                        navigate('/pengajuan-dana');
                      }, 1500);
                    }}
                    type="submit"
                    className="Ajukan simpan"
                  >
                    <i class="fa-solid fa-floppy-disk"></i>Simpan
                  </button>
                </div>
                <div className="popUp-Bkeuangan BKShow">
                  <div className="container-popUp">
                    <div className="icon">
                      <i class="fa-solid fa-check"></i>
                    </div>
                    <p>Berhasil! Menyimpan</p>
                  </div>
                </div>
              </>
            )}

            {user && user.role == 'admin' && (
              <>
                <div className="btn-komfirm">
                  <button
                    id="btn_setuju"
                    onClick={() => {
                      const popUpPermit = document.getElementsByClassName('container-popup-permit')[1];
                      popUpPermit.classList.toggle('permitShow');
                    }}
                    type="submit"
                    className="Ajukan"
                  >
                    <i class="fa-solid fa-check"></i>Setuju
                  </button>
                  <div className="container-popup-permit permitShow">
                    <div className="container-content">
                      <div className="icon">
                        <i class="fa-solid fa-circle-exclamation"></i>
                      </div>
                      <p> Apakah Anda yakin menyetujui pengajuan dana tersebut ?</p>
                      <div className="btn-permit">
                        <button
                          type="submit"
                          onClick={() => {
                            const popUpPermit = document.getElementsByClassName('container-popup-permit')[1];
                            popUpPermit.classList.toggle('permitShow');
                            setStatus('Berkegiatan');
                            const BKpopUp = document.getElementsByClassName('popUp-Bkeuangan')[0];
                            BKpopUp.classList.toggle('BKShow');
                            setTimeout(() => {
                              BKpopUp.classList.toggle('BKShow');
                            }, 2500);
                          }}
                        >
                          Oke
                        </button>
                        <button
                          onClick={() => {
                            const popUpPermit = document.getElementsByClassName('container-popup-permit')[1];
                            popUpPermit.classList.toggle('permitShow');
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setStatus(status);
                      const BKpopUp = document.getElementsByClassName('popUp-Bkeuangan')[1];
                      BKpopUp.classList.toggle('BKShow');
                      setTimeout(() => {
                        BKpopUp.classList.toggle('BKShow');
                      }, 2000);

                      setTimeout(() => {
                        navigate('/pengajuan-dana');
                      }, 1500);
                    }}
                    type="submit"
                    className="Ajukan"
                  >
                    <i class="fa-solid fa-floppy-disk"></i>Simpan
                  </button>
                </div>
                <div className="popUp-Bkeuangan BKShow">
                  <div className="container-popUp">
                    <div className="icon">
                      <i class="fa-solid fa-check"></i>
                    </div>
                    <p>Berhasil!</p>
                    <p>Menyetujui Pengajuan Dana</p>
                  </div>
                </div>
                <div className="popUp-Bkeuangan BKShow">
                  <div className="container-popUp">
                    <div className="icon">
                      <i class="fa-solid fa-check"></i>
                    </div>
                    <p>Berhasil! Menyimpan</p>
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

export default PengajuanDana_Add;
