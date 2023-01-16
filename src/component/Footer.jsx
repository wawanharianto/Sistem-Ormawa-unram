import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <>
      <footer>
        <hr className="line1" />
        <h2>Help Desk!</h2>
        <div className="conSide">
          <p>Jika memiliki pertanyaan atau mengalami kendala selama proses pengisian silakan menghubungi kami melalui beberapa jalur yang tertera.</p>
          <p>
            Jl. Majapahit No. 62 Mataram <br /> +62 (0370) 123456 <br />
            kedokteran@unram.ac.id
          </p>
        </div>
        <p>2022 — Fakultas Kedokteran Universitas Mataram</p>
      </footer>
    </>
  );
}

export default Footer;
