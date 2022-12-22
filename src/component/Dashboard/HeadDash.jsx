import React from 'react';
import './HeadDash.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOut, reset } from '../../features/auth';

function HeadDash() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate('/');
  };

  const handleSideBar = (e) => {
    const isCheckedSide = document.getElementsByClassName('on-burger')[0];
    const SideDash = document.getElementsByClassName('SideDash');
    const cSideDash = document.getElementsByClassName('c-SideDash')[0];
    const cImg = cSideDash.getElementsByTagName('img');
    const cP = cSideDash.getElementsByTagName('P');
    const cIcon = document.getElementsByClassName('icon');
    const cSideDashf = document.getElementsByClassName('sideDash-f');
    console.log(cSideDashf[0]);

    if (e.target.checked) {
      isCheckedSide.style.paddingLeft = '6%';
      cImg[0].style.display = 'none';
      for (let i = 0; i < cP.length; i++) {
        cP[i].style.display = 'none';
      }
      for (let i = 0; i < cIcon.length; i++) {
        cIcon[i].style.fontSize = '30px';
      }
      SideDash[0].style.width = '100px';
      cSideDashf[0].classList.toggle('sideDash-fe');
    } else {
      isCheckedSide.style.paddingLeft = '16%';
      cImg[0].style.display = 'block';
      for (let i = 0; i < cP.length; i++) {
        cP[i].style.display = 'flex';
      }
      SideDash[0].style.width = '15%';
      cSideDashf[0].classList.toggle('sideDash-fe');
    }
  };

  const clickhandle = (data) => {
    const comClick = data.target;
    if (comClick) {
      comClick.classList.toggle('select');
    }
  };
  return (
    <>
      <div className="HeadDash on-burger">
        <div className="burger-button">
          <input id="menu-toggle" type="checkbox" onChange={handleSideBar} />
          <label class="menu-button-container" for="menu-toggle">
            <div class="menu-button"></div>
          </label>
        </div>
        <h1>
          ORMAWA
          <i class="fa-solid fa-circle" />
        </h1>
        <div className="backBeranda">
          <i class="fa-solid fa-house"></i>
          <p>Beranda</p>

          <a onClick={logout}>
            <i class="fa-solid fa-right-from-bracket"></i>
          </a>
        </div>
      </div>
      {/* side bar */}

      <div className="SideDash">
        <div className="c-SideDash">
          <img src="" alt="" />
          <p>Nama Ormawa</p>
          <div className="sideDash-f" onClick={clickhandle}>
            <div className="icon select-f">
              <i class="fa-solid fa-qrcode" />
              <p>Dashboard</p>
            </div>
            <div className="icon" onClick={clickhandle}>
              <i class="fa-solid fa-file-circle-plus"></i>
              <p>Pengajuan Proposal</p>
            </div>
            <div className="icon" onClick={clickhandle}>
              <i class="fa-regular fa-file-lines"></i>
              <p>LPJ</p>
            </div>
            <div className="icon" onClick={clickhandle}>
              <i class="fa-regular fa-file"></i>
              <p>SPJ</p>
            </div>
            <div className="icon" onClick={clickhandle}>
              <i class="fa-solid fa-folder-tree"></i>
              <p>Arsip</p>
            </div>
            <div className="icon" onClick={clickhandle}>
              <i class="fa-solid fa-user"></i>
              <p>Users</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeadDash;
