import React, { useEffect, useState } from 'react';
import './ApproveProposal_con.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createCacheKeyComparator } from 'reselect/es/defaultMemoize';

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
  const [status, setStatus] = useState('Proposal di ajukan');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
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
        setStatus(response.data.status);
        setUrl(response.data.url_proposal);
        setNamaFile(response.data.proposal);
        setKetWd3(response.data.keterangan_wd3);
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
    formData.append('keterangan_wd3', ketwd3);
    formData.append('status', status);
    try {
      await axios
        .patch(`http://localhost:3000/updateketeranganwd3/${uuid}`, formData, {
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
    console.log(ketwd3);
    handleClose();
    navigate('/pengajuan-proposal');
  };

  const ClosePopUp = () => {
    const PopUpSetuju = document.getElementsByClassName('popUp-Approve')[0];
    PopUpSetuju.classList.toggle('SetujuShow');
    navigate('/pengajuan-proposal');
  };

  const handleClose = () => {
    const closepop = document.getElementsByClassName('popUp')[0];
    closepop.classList.toggle('popshow');
  };

  // check kondition button setujui/ tolak
  if (status == 'Proposal ACC') {
    const conditionAcc = document.getElementsByClassName('condition-acc')[0];
    conditionAcc.style.backgroundColor = 'green';
    const icon = conditionAcc.getElementsByTagName('i')[0];
    // console.log(icon);
    icon.className = 'fa-solid fa-check';
    // const downloadShow = document.getElementsByClassName('download-acc')[0];
    // downloadShow.classList.remove('downloadHide');
  } else if (status == 'Proposal di tolak') {
    const conditionAcc = document.getElementsByClassName('condition-acc')[0];

    conditionAcc.style.backgroundColor = 'red';
    const icon = conditionAcc.getElementsByTagName('i')[0];

    icon.className = 'fa-solid fa-x';
  }
  return (
    <>
      <div className="addPropalForm-container">
        <div className="hProposalForm">
          <h2>Form Approve Wakil Dekan III</h2>
          <p>List Pengajuan / Detail</p>
        </div>
        <div className="container-formAddProp">
          <div className="formaddProp">
            <div className="headForm">
              <p>Form Approve WD III</p>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            <form onSubmit={updateKetWD3} className="addProposal read-only" action="">
              <hr className="line" />
              <div className="finput">
                <p>Nama Kegiatan</p>
                <div className="contInput">
                  <input type="text" placeholder="Nama Kegiatan" value={kegiatan || ''} readOnly={true} ></input>
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
                <p>Download Proposal</p>
                <div className="contInput">
                  <div className="down-approve">
                    <a href={url || ''} target="_blank">
                      {' '}
                      <i className="fa-solid fa-file-arrow-down"></i>Download
                    </a>
                    <p>{namafile || ''}</p>
                  </div>
                </div>
              </div>

              <div className="finput">
                <p>Status</p>
                <div className="contInput">
                  <button disabled className="condition-acc ">
                    <i className="fa-solid fa-circle-info"></i> {status || ''}
                  </button>
                </div>
              </div>
              {user && user.role !== 'mahasiswa' && (
                <>
                  <div className="finput">
                    <p>Keterangan Oleh WD3</p>
                    <div className="contInput">
                      <input className="textbox" type="text" placeholder="silahkan isi ..." value={ketwd3 || ''} onChange={(e) => setKetWd3(e.target.value)} />
                    </div>
                  </div>
                </>
              )}
              {user && user.role == 'mahasiswa' && (
                <>
                  <div className="finput">
                    <p>Keterangan Oleh WD3</p>
                    <div className="contInput">
                      <input className="textbox" type="text" placeholder="silahkan isi ..." value={ketwd3 || ''} onChange={(e) => setKetWd3(e.target.value)} readOnly />
                    </div>
                  </div>
                </>
              )}
              <div className="fbtn-form">
                {user && user.role == 'WD3' && (
                  <>
                    <button
                      onClick={() => {
                        const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                        popUpPermit.classList.toggle('permitShow');
                      }}
                      className="Ajukan"
                    >
                      <i className="fa-solid fa-check"></i>Setuju
                    </button>
                    <div className="container-popup-permit permitShow">
                      <div className="container-content">
                        <div className="icon">
                          <i className="fa-solid fa-circle-exclamation"></i>
                        </div>
                        <p> Apakah anda yakin ingin menyetujui proposal ini ?</p>
                        <div className="btn-permit">
                          <button
                            type="submit"
                            onClick={() => {
                              const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                              popUpPermit.classList.toggle('permitShow');
                              setStatus('Proposal ACC');
                              const PopUpSetuju = document.getElementsByClassName('popUp-Approve')[0];
                              PopUpSetuju.classList.toggle('SetujuShow');

                              setTimeout(() => {
                                PopUpSetuju.classList.toggle('SetujuShow');
                              }, 2000);
                              setTimeout(() => {
                                navigate('/pengajuan-proposal');
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
                    <div className="popUp-Approve SetujuShow">
                      <div className="container-popUp">
                        <div className="icon">
                          <i className="fa-solid fa-check"></i>
                        </div>
                        <p>Berhasil ACC Proposal</p>
                      </div>
                    </div>
                  </>
                )}

                {user && user.role == 'admin' && (
                  <>
                    <button
                      onClick={() => {
                        const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                        popUpPermit.classList.toggle('permitShow');
                      }}
                      className="Ajukan"
                    >
                      <i className="fa-solid fa-check"></i>Setuju
                    </button>

                    <div className="container-popup-permit permitShow">
                      <div className="container-content">
                        <div className="icon">
                          <i className="fa-solid fa-circle-exclamation"></i>
                        </div>
                        <p> Apakah anda yakin ingin menyetujui proposal ini ?</p>
                        <div className="btn-permit">
                          <button
                            type="submit"
                            onClick={() => {
                              const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                              popUpPermit.classList.toggle('permitShow');
                              setStatus('Proposal ACC');

                              const PopUpSetuju = document.getElementsByClassName('popUp-Approve')[0];
                              PopUpSetuju.classList.toggle('SetujuShow');

                              setTimeout(ClosePopUp, 2000);
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
                    <div className="popUp-Approve SetujuShow">
                      <div className="container-popUp">
                        <div className="icon">
                          <i className="fa-solid fa-check"></i>
                        </div>
                        <p>Berhasil ACC Proposal</p>
                      </div>
                    </div>
                  </>
                )}

                {status !== 'Proposal ACC' && user && user.role == 'WD3' && (
                  <>
                    <button
                      onClick={() => {
                        const popUpPermit = document.getElementsByClassName('container-permit-tolak')[0];
                        popUpPermit.classList.toggle('permitShow');
                      }}
                      type="submit"
                      className="tolak"
                    >
                      <i className="fa-solid fa-xmark"></i>Tolak
                    </button>
                    <div className="container-popup-permit container-permit-tolak permitShow">
                      <div className="container-content">
                        <div className="icon">
                          <i className="fa-solid fa-circle-exclamation"></i>
                        </div>
                        <p> Apakah anda yakin ingin menolak proposal ini ?</p>
                        <div className="btn-permit">
                          <button
                            type="submit"
                            onClick={() => {
                              const popUpPermit = document.getElementsByClassName('container-permit-tolak')[0];
                              popUpPermit.classList.toggle('permitShow');
                              setStatus('Proposal di tolak');
                              const PopUpTolak = document.getElementsByClassName('popUp-Approve')[1];
                              PopUpTolak.classList.toggle('TolakShow');
                              setTimeout(() => {
                                PopUpTolak.classList.toggle('TolakShow');
                              }, 2000);
                              setTimeout(() => {
                                navigate('/pengajuan-proposal');
                              }, 2000);
                            }}
                          >
                            Oke
                          </button>
                          <button
                            onClick={() => {
                              const popUpPermit = document.getElementsByClassName('container-permit-tolak')[0];
                              popUpPermit.classList.toggle('permitShow');
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="popUp-Approve TolakShow">
                      <div className="container-popUp">
                        <div className="icon-x">
                          <i className="fa-solid fa-xmark"></i>
                        </div>
                        <p>Proposal Berhasil Ditolak</p>
                      </div>
                    </div>
                  </>
                )}

                {user && user.role == 'admin' && (
                  <>
                    <button
                      onClick={(e) => {
                        const popUpPermit = document.getElementsByClassName('container-popup-permit')[1];
                        popUpPermit.classList.toggle('permitShow');
                      }}
                      type="submit"
                      className="tolak"
                    >
                      <i className="fa-solid fa-xmark"></i>Tolak
                    </button>
                    <div className="container-popup-permit permitShow">
                      <div className="container-content">
                        <div className="icon">
                          <i className="fa-solid fa-circle-exclamation"></i>
                        </div>
                        <p> Apakah anda yakin ingin menolak proposal ini ?</p>
                        <div className="btn-permit">
                          <button
                            type="submit"
                            onClick={() => {
                              const popUpPermit = document.getElementsByClassName('container-popup-permit')[1];
                              popUpPermit.classList.toggle('permitShow');
                              setStatus('Proposal di tolak');
                              const PopUpTolak = document.getElementsByClassName('popUp-Approve')[1];
                              PopUpTolak.classList.toggle('TolakShow');
                              setTimeout(() => {
                                PopUpTolak.classList.toggle('TolakShow');
                              }, 2000);
                              setTimeout(() => {
                                navigate('/pengajuan-proposal');
                              }, 2000);
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

                    <div className="popUp-Approve TolakShow">
                      <div className="container-popUp">
                        <div className="icon-x">
                          <i className="fa-solid fa-xmark"></i>
                        </div>
                        <p>Proposal Berhasil Ditolak</p>
                      </div>
                    </div>
                    <div className="popUp-Approve TolakShow">
                      <div className="container-popUp">
                        <div className="icon-x">
                          <i className="fa-solid fa-xmark"></i>
                        </div>
                        <p>Berhasil Disetujui</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </form>
          </div>
          {status == 'Proposal ACC' && (
            <div className="download-acc downloadShow">
              <div className="headcontent">
                <h4>Lembar Pengesahan Proposal</h4>
                <i className="fa-solid fa-chevron-down"></i>
              </div>
              <hr className=" line" />
              <div className="finput">
                <p>Download Proposal</p>
                <div className="contInput">
                  {status == 'Proposal ACC' && (
                    <div className="down-approve">
                      <button
                        className="download-file"
                        onClick={() => {
                          window.location.href = '../Document/LEMBAR PENGESAHAN PROPOSAL.docx';
                        }}
                      >
                        <i className="fa-solid fa-file-arrow-down"></i>Download
                      </button>
                      <p className="name">File Lembar Pengesahan.docx</p>
                    </div>
                  )}
                  <p className="kosong">File Lembar Pengesahaan</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ApproveProposal_con;
