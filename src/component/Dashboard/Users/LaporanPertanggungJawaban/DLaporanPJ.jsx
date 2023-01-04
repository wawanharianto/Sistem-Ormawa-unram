import React from 'react';
import './DLaporanPJ.css';

function DLaporanPJ() {
  return (
    <>
      <div className="addPropalForm-container">
        <div className="hProposalForm">
          <h2>Laporan Pertanggung Jawaban</h2>
          <p>List Pengajuan/ Proposal</p>
        </div>
        <div className="formaddProp">
          <div className="headForm">
            <p>Detail Pengajuan Dana</p>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <form className="addProposal" action="">
            <hr className="line" />
            <div className="finput">
              <p>Nama Kegiatan</p>
              <input type="text" placeholder="Nama Kegiatan"></input>
            </div>
            <div className="finput">
              <p className="hide">....</p>
              <p className="kosong">Nama Kegiatan</p>
            </div>
            <div className="finput">
              <p>Nama Organisasi</p>
              <input type="text" placeholder="Nama Organisasi"></input>
            </div>
            <div className="finput">
              <p className="hide">....</p>
              <p className="kosong">Nama Organisasi</p>
            </div>
            <div className="finput">
              <p>Jumlah Dana yang Diajukan</p>
              <input type="text" placeholder="Jumlah Dana yang Diajukan"></input>
            </div>
            <div className="finput">
              <p className="hide">....</p>
              <p className="kosong">Jumlah Dana yang Diajukan</p>
            </div>
            <div className="finput">
              <p>Nama Ketua Panitia</p>
              <input type="text" placeholder="Nama Ketua Panitia"></input>
            </div>
            <div className="finput">
              <p className="hide">....</p>
              <p className="kosong">Nama Ketua Panitia</p>
            </div>
            <div className="finput">
              <p>Nomor Hp</p>
              <input type="text" placeholder="Nomor Hp"></input>
            </div>
            <div className="finput">
              <p className="hide">....</p>
              <p className="kosong">Nomor HP</p>
            </div>
            <div className="finput">
              <p>Tanggal Pelaksanaan</p>
              <input type="text" placeholder="Tanggal Pelaksanaan"></input>
            </div>
            <div className="finput">
              <p className="hide">....</p>
              <p className="kosong">Tanggal Pelaksanaan</p>
            </div>
            <div className="finput">
              <p>Tempat Pelaksanaan</p>
              <input type="text" placeholder="Tempat Pelaksanaan"></input>
            </div>
            <div className="finput">
              <p className="hide">....</p>
              <p className="kosong">Tempat Pelaksanaan</p>
            </div>
            <div className="finput">
              <p>Nomor Ketua Umum</p>
              <input type="text" placeholder="Nomor Ketua Umum"></input>
            </div>
            <div className="finput">
              <p className="hide">....</p>
              <p className="kosong">Nomor Ketua Umum</p>
            </div>
            <div className="finput">
              <p>UploadLPJ</p>
              <div className="load-file">
                <button>
                  <i class="fa-solid fa-file-arrow-up"></i>Choose file
                </button>
              </div>
            </div>

            <div className="finput">
              <p>Status</p>
              <button disabled className="condition-acc">
                <i class="fa-solid fa-circle-info"></i> Proposal di ajukan
              </button>
              <input type="text" placeholder="text"></input>
            </div>
            <div className="finput">
              <p>Laporan Pertanggung Jawaban</p>
              <div className="load-file">
                <button>
                  <i class="fa-solid fa-download"></i>Download File
                </button>
              </div>
            </div>
            <div className="finput">
              <p>Revisi LPJ Dari Bagian Akademik</p>
              <div className="load-file">
                <button>
                  <i class="fa-solid fa-download"></i>Download File
                </button>
              </div>
            </div>
            <div className="finput">
              <p>Keterangan Dari bagian akademik</p>
              <input type="text" placeholder="Nomor Ketua Umum"></input>
            </div>
            {/* <div className="fbtn-form">
              <button type="submit" className="Ajukan">
                <i class="fa-solid fa-check"></i>Setuju
              </button>
              <button type="submit" className="Ajukan">
                <i class="fa-solid fa-floppy-disk"></i>Simpan
              </button>
              <button type="submit" className="Ajukan">
                <i class="fa-solid fa-xmark"></i>Tolak
              </button>
            </div> */}
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
            <input type="text" placeholder="Nomor Ketua Umum" className="textbox"></input>
          </div>
          <div className="finput">
            <p></p>
            <p className="holder-finput">Nama Kegiatan</p>
          </div>
          <div className="finput">
            <p>Keterangan bagian akademmik</p>
            <input type="text" placeholder="Nomor Ketua Umum"></input>
          </div>
          <div className="finput">
            <p></p>
            <p className="holder-finput">Keterangan</p>
          </div>
          <div className="btn-komfirm-lpj">
            <button type="submit" className="setuju">
              <i class="fa-solid fa-check"></i>Setuju
            </button>
            <button type="submit" className="revisi">
              <i class="fa-solid fa-pen"></i>Revisi
            </button>
            <button type="submit" className="tolak">
              <i class="fa-solid fa-xmark"></i>Tolak
            </button>
            <button type="submit" className="edit">
              <i class="fa-solid fa-floppy-disk"></i>Edit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default DLaporanPJ;
