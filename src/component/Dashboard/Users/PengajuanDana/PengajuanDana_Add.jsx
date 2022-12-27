import React from 'react';
import './PengajuanDana_Add.css';

function PengajuanDana_Add() {
  // const handleClose = () => {
  //   const closepop = document.getElementsByClassName('popUp')[0];
  //   closepop.classList.toggle('popshow');
  // };

  return (
    <>
      <div className="addPropalForm-container">
        <div className="hProposalForm">
          <h2>Pengajual Propsal</h2>
          <p>List Pengajuan / Detail</p>
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
              <p>Tempat Pelaksanaan</p>
              <input type="text" placeholder="Tempat Pelaksanaan"></input>
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
                  {' '}
                  <i class="fa-solid fa-file-arrow-up"></i>Choose file
                </button>
              </div>
            </div>

            <div className="finput">
              <p>Status</p>
              <button disabled className="condition-acc">
                <i class="fa-solid fa-circle-info"></i> Proposal di ajukan
              </button>
            </div>

            <div className="fbtn-form">
              <button type="submit" className="Ajukan">
                <i class="fa-solid fa-check"></i>Setuju
              </button>
              <button type="submit" className="Ajukan">
                <i class="fa-solid fa-floppy-disk"></i>Simpan
              </button>
              <button type="submit" className="Ajukan">
                <i class="fa-solid fa-xmark"></i>Tolak
              </button>
            </div>
          </form>
        </div>
        <form action="" className="form-Komfirmasi">
          <div className="headForm">
            <p>Kolom Komfirmasi Bagian Keuangan</p>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <hr className="line" />
          <div className="finput">
            <p>Keterangan dari Bagian Keuangan</p>
            <input type="text" placeholder="Nomor Ketua Umum" className="textbox"></input>
          </div>
          <div className="finput">
            <p></p>
            <p className="holder-finput">keterangan</p>
          </div>
          <div className="finput">
            <p>Jumlah Dana Yang di setujui</p>
            <input type="text" placeholder="Nomor Ketua Umum"></input>
          </div>
          <div className="finput">
            <p></p>
            <p className="holder-finput">jumlah dana yang di setujui</p>
          </div>
          <div className="btn-komfirm">
            <button type="submit" className="Ajukan">
              <i class="fa-solid fa-check"></i>Setuju
            </button>
            <button type="submit" className="Ajukan">
              <i class="fa-solid fa-floppy-disk"></i>Edit
            </button>
          </div>
        </form>
      </div>
      {/* <div className="popUp pophide">
        <div className="conPopUp" onClick={handleClose}>
          <button>X</button>
          <p></p>
        </div>
      </div> */}
    </>
  );
}

export default PengajuanDana_Add;
