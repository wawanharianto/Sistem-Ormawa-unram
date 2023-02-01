import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditProposal.css';
function UpdateProposal() {
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
  const [file, setFile] = useState('');
  const [status, setStatus] = useState('Proposal di ajukan');
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

  const loadFile = (e) => {
    const proposal = e.target.files[0];
    setFile(proposal);
  };

  const handleClose = () => {
    const closepop = document.getElementsByClassName('popUp')[0];
    closepop.classList.toggle('popshow');
  };

  const updateProposal = async (e) => {
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

    try {
      await axios
        .patch(`http://localhost:3000/proposal/${uuid}`, formData, {
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

  return (
    <>
      <div className="addPropalForm-container">
        <div className="hProposalForm">
          <h2>Edit Proposal</h2>
          <p>Edit Proposal</p>
        </div>
        <div className="container-formAddProp">
          <div className="formaddProp">
            <div className="headForm">
              <p>Edit Proposal</p>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            <form onSubmit={updateProposal} className="addProposal" action="">
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
                    type="text"
                    placeholder="Jumlah Dana yang Diajukan"
                    value={dana}
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
                      setDana(formatRupiah(e.target.value, 'Rp. '));
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
                  <input type="number" placeholder="Nomor Ketua Umum" value={ketum} onChange={(e) => setKetum(e.target.value)}></input>
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
                <p>Download Proposal</p>
                <div className="contInput">
                  <div className="down-approve">
                    <a href={url} target="_blank">
                      {' '}
                      <i className="fa-solid fa-file-arrow-down"></i>Download
                    </a>
                    <p>{namafile}</p>
                  </div>
                </div>
              </div>
              <div className="finput">
                <p>Status</p>
                <div className="contInput">
                  <button disabled className="status">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    {status}
                  </button>
                </div>
              </div>
              <div className="fbtn-form">
                <button
                  className="Ajukan"
                  onClick={(e) => {
                    e.preventDefault();
                    const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                    popUpPermit.classList.toggle('permitShow');
                  }}
                >
                  <i className="fa-solid fa-location-arrow"></i>Update
                </button>
                <div className="container-popup-permit permitShow">
                  <div className="container-content">
                    <div className="icon">
                      <i className="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <p> Apakah anda yakin ingin meng-update proposal ini ?</p>
                    <div className="btn-permit">
                      <button
                        type="submit"
                        onClick={() => {
                          const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                          popUpPermit.classList.toggle('permitShow');
                          const popUpUpdate = document.getElementsByClassName('popUp-Approve')[0];
                          popUpUpdate.classList.toggle('SetujuShow');
                          setTimeout(() => {
                            popUpUpdate.classList.toggle('SetujuShow');
                            navigate('/pengajuan-proposal');
                          }, 2000);
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
                <div className="popUp-Approve SetujuShow">
                  <div className="container-popUp">
                    <div className="icon">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <p>Berhasil Di Ubah</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProposal;
