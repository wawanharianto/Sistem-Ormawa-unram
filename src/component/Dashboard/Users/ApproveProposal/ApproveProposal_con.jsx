import React from 'react';
import './ApproveProposal_con.css';

function ApproveProposal_con() {
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
            <p>Details Pengajuan Proposal</p>
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
              <p>Download Proposal</p>
              <div className="load-file">
                <button>
                  {' '}
                  <i class="fa-solid fa-file-arrow-down"></i>Download
                </button>
                <p>nama file</p>
              </div>
            </div>

            <div className="finput">
              <p>Status</p>
              <button disabled className="condition-acc">
                <i class="fa-solid fa-circle-info"></i> Proposal di ajukan
              </button>
            </div>
            <div className="finput">
              <p>Keterangan Oleh WD3</p>
              <input className="textbox" type="text" placeholder="silahkan isi ..." />
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

export default ApproveProposal_con;
