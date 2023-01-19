import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function DArsip() {
  const [kegiatan, setKegiatan] = useState('');
  const [organisasi, setOrganisasi] = useState('');
  const [dana, setDana] = useState('');
  const [ketupat, setKetupat] = useState('');
  const [nohp, setNohp] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [tempat, setTempat] = useState('');
  const [ketum, setKetum] = useState('');
  const [fileproposal, setFileProposal] = useState('');
  const [urlProposal, setUrlProposal] = useState('');
  const [urlSPJ, setUrlSPJ] = useState('');
  const [urlDukungSPJ, setUrlDukungSPJ] = useState('');
  const [namafileSPJ, setNamaFileSPJ] = useState('');
  const [namafileDukungSPJ, setNamaFileDukungSPJ] = useState('');
  const [fileLpj, setFileLpj] = useState('');
  const [urlLpj, setUrlLPJ] = useState('');
  const [status, setStatus] = useState('');
  const [keterangan_spj, setKetSpj] = useState('');
  const [keterangan_keuangan, setKetKeuangan] = useState('');
  const [keterangan_akademik, setKetAkademik] = useState('');
  const [dana_disetujui, setDanaSetuju] = useState('');
  const [msg, setMsg] = useState('');
  const [ketwd3, setKetWd3] = useState('');
  // const { user } = useSelector((state) => state.auth);
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
        setFileProposal(response.data.proposal);
        setUrlProposal(response.data.url_proposal);
        setUrlSPJ(response.data.url_spj);
        setNamaFileSPJ(response.data.spj);
        setNamaFileDukungSPJ(response.data.berkas_dukung);
        setUrlDukungSPJ(response.data.url_bd);
        setKetSpj(response.data.keterangan_spj);
        setFileLpj(response.data.lpj);
        setUrlLPJ(response.data.url_lpj);
        setKetKeuangan(response.data.keterangan_keuangan);
        setKetAkademik(response.data.keterangan_akademik);
        setKetWd3(response.data.keterangan_wd3);
        setDanaSetuju(response.data.dana_disetujui);

      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProposalById();
  }, [uuid]);

  const updateArsip = async (e) => {
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
    formData.append('dana_disetujui', dana_disetujui);
    formData.append('keterangan_keuangan', keterangan_keuangan);
    formData.append('keterangan_wd3', ketwd3);
    formData.append('keterangan_akademik', keterangan_akademik);
    formData.append('keterangan_spj', keterangan_spj);

    try {
      await axios.patch(`http://localhost:3000/updatearsip/${uuid}`, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
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
          <h2>Edit Data Kegiatan</h2>
          <p>Edit Data Kegiatan</p>
        </div>
        <div className="container-formAddProp">
          <div className="formaddProp">
            <div className="headForm">
              <p>Edit Data</p>
              <i class="fa-solid fa-chevron-down"></i>
            </div>
            <form onSubmit={updateArsip} className="addProposal" action="">
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
                <p>Keterangan Wakil Dekan III</p>
                <div className="contInput">
                  <input className="textbox" type="text" placeholder="Data belum di input" value={ketwd3} onChange={(e) => setKetWd3(e.target.value)} />
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
                      setDana(formatRupiah(e.target.value, 'Rp. '));
                    }}
                    type="text"
                    placeholder="Data belum di input"
                  ></input>
                  <p className="kosong">jumlah dana yang di setujui</p>
                </div>
              </div>
              <div className="finput">
                <p>Keterangan Dana ACC</p>
                <div className="contInput">
                  <input className="textbox" type="text" placeholder="Data belum di input" value={keterangan_keuangan} onChange={(e) => setKetKeuangan(e.target.value)} />
                </div>
              </div>
              <div className="finput">
                <p>Keterangan SPJ</p>
                <div className="contInput">
                  <input className="textbox" type="text" placeholder="Data belum di input" value={keterangan_spj} onChange={(e) => setKetSpj(e.target.value)} />
                </div>
              </div>
              <div className="finput">
                <p>Keterangan Akademik</p>
                <div className="contInput">
                  <input className="textbox" type="text" placeholder="Data belum di input" value={keterangan_akademik} onChange={(e) => setKetAkademik(e.target.value)} />
                </div>
              </div>
              <div className="finput">
                <p>Download Proposal</p>
                <div className="contInput">
                  <div className="down-approve">
                    <a href={urlProposal} target="_blank">
                      {' '}
                      <i class="fa-solid fa-file-arrow-down"></i>Download
                    </a>
                    <p>{fileproposal}</p>
                  </div>
                </div>
              </div>
              <div className="finput">
                <p>Download SPJ</p>
                <div className="contInput">
                  <div className="down-approve">
                    <a href={urlSPJ} target="_blank">
                      {' '}
                      <i class="fa-solid fa-file-arrow-down"></i>Download
                    </a>
                    <p>{namafileSPJ}</p>
                  </div>
                </div>
              </div>
              <div className="finput">
                <p>Download Berkas Dukung SPJ</p>
                <div className="contInput">
                  <div className="down-approve">
                    <a href={urlDukungSPJ} target="_blank">
                      {' '}
                      <i class="fa-solid fa-file-arrow-down"></i>Download
                    </a>
                    <p>{namafileDukungSPJ}</p>
                  </div>
                </div>
              </div>
              <div className="finput">
                <p>Download LPJ</p>
                <div className="contInput">
                  <div className="down-approve">
                    <a href={urlLpj} target="_blank">
                      {' '}
                      <i class="fa-solid fa-file-arrow-down"></i>Download
                    </a>
                    <p>{fileLpj}</p>
                  </div>
                </div>
              </div>
              <div className="finput">
                <p>Status</p>
                <div className="contInput">
                  <button disabled className="status">
                    <i class="fa-solid fa-circle-exclamation"></i>
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
                  <i class="fa-solid fa-location-arrow"></i>Simpan
                </button>
                <div className="container-popup-permit permitShow">
                  <div className="container-content">
                    <p> apakah anda yakin ingin menolak proposal ini ?</p>
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
                        ok
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const popUpPermit = document.getElementsByClassName('container-popup-permit')[0];
                          popUpPermit.classList.toggle('permitShow');
                        }}
                      >
                        cancel
                      </button>
                    </div>
                  </div>
                </div>
                <div className="popUp-Approve SetujuShow">
                  <div className="container-popUp">
                    <div className="icon">
                      <i class="fa-solid fa-check"></i>
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

export default DArsip;