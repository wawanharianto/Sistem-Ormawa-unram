import React from 'react';
import './DSuratPJ.css';

function DSuratPJ() {
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
                  <input type="text" placeholder="Nama Kegiatan"></input>
                  <p className="kosong">Nama Kegiatan</p>
                </div>
              </div>

              <div className="finput">
                <p>Nama Organisasi</p>
                <div className="contInput">
                  <input type="text" placeholder="Nama Organisasi"></input>
                  <p className="kosong">Nama Organisasi</p>
                </div>
              </div>

              <div className="finput">
                <p>Jumlah Dana yang Diajukan</p>
                <div className="contInput">
                  <input type="text" placeholder="Jumlah Dana yang Diajukan"></input>
                  <p className="kosong">Jumlah Dana yang Diajukan</p>
                </div>
              </div>

              <div className="finput">
                <p>Nama Ketua Panitia</p>
                <div className="contInput">
                  <input type="text" placeholder="Nama Ketua Panitia"></input>
                  <p className="kosong">Nama Ketua Panitia</p>
                </div>
              </div>

              <div className="finput">
                <p>Nomor Hp</p>
                <div className="contInput">
                  <input type="text" placeholder="Nomor Hp"></input>
                  <p className="kosong">Nomor HP</p>
                </div>
              </div>

              <div className="finput">
                <p>Tanggal Pelaksanaan</p>
                <div className="contInput">
                  <input type="date" placeholder="Tanggal Pelaksanaan"></input>
                  <p className="kosong">Tanggal Pelaksanaan</p>
                </div>
              </div>

              <div className="finput">
                <p>Tempat Pelaksanaan</p>
                <div className="contInput">
                  <input type="text" placeholder="Tempat Pelaksanaan"></input>
                  <p className="kosong">Tempat Pelaksanaan</p>
                </div>
              </div>

              <div className="finput">
                <p>Nomor Ketua Umum</p>
                <div className="contInput">
                  <input type="text" placeholder="Nomor Ketua Umum"></input>
                  <p className="kosong">Nomor Ketua Umum</p>
                </div>
              </div>
              <div className="finput">
                <p>Upload Berkas SPJ</p>
                <div className="contInput">
                  <div className="file-up">
                    <i class="fa-solid fa-file-arrow-up"></i>
                    <input type="file" className="upload"></input>
                    {/* <p className="text">name file .pdf</p> */}
                  </div>
                </div>
              </div>
              <div className="finput">
                <p>Upload Berkas Dukung</p>
                <div className="contInput">
                  <div className="file-up">
                    <i class="fa-solid fa-file-arrow-up"></i>
                    <input type="file" className="upload"></input>
                  </div>
                </div>
              </div>

              <div className="finput">
                <p>Status</p>
                <div className="contInput">
                  <div className="status">
                    <button disabled className="condition-acc">
                      <i class="fa-solid fa-check"></i> Setujui
                    </button>
                    <input className="input-status" type="text" placeholder="text"></input>
                  </div>
                </div>
              </div>
              <div className="finput">
                <p>Berkas File SPJ</p>
                <div className="contInput">
                  <div className="file-BSPJ">
                    <button>
                      <i class="fa-solid fa-download"></i>Download File
                    </button>
                    <p className="text">nama file .pdf</p>
                  </div>
                </div>
              </div>
              <div className="finput">
                <p>Download Berkas Dukung</p>
                <div className="contInput">
                  <div className="file-BSPJ">
                    <button>
                      <i class="fa-solid fa-download"></i>Download File
                    </button>
                    <p className="text">nama file .pdf</p>
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
                <button type="submit" className="Ajukan">
                  <i class="fa-solid fa-check"></i>Setuju
                </button>
                <button type="submit" className="Ajukan">
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
              <p>Keterangan SPJ</p>
              <div className="contInput">
                <input type="text" placeholder="Nomor Ketua Umum" className="textbox"></input>
                <p className="text-konfirmasi">Nama Kegiatan</p>
              </div>
            </div>
            <div className="finput">
              <p>Keterangan bagian Keuangan</p>
              <div className="contInput">
                <input type="text" placeholder="Nomor Ketua Umum"></input>
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
              <button type="submit" className="setuju">
                <i class="fa-solid fa-check"></i>Setuju
              </button>
              <button type="submit" className="revisi">
                <i class="fa-solid fa-pen"></i>Revisi
              </button>
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
