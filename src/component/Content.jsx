import React from 'react';
import './Content.css';
import Gambar1 from '../img/img1.png';

function Content() {
  return (
    <>
      <article className="contentContainer">
        <div className="sideLeft">
          <h2>
            Administrasi <br /> Organisasi Mahasiswa
          </h2>
          <p>Sistem Administrasi Organisasi Mahasiswa Fakultas Kedokteran Universitas Mataram</p>
          <div className="conButton">
            <a href="pengumuman">
              <button>Pengumuman</button>
            </a>
            <a href="login">
              <button>Login</button>
            </a>
          </div>
        </div>
        <div className="sideRight">
          <img src={Gambar1} alt="" />
        </div>
      </article>
    </>
  );
}

export default Content;
