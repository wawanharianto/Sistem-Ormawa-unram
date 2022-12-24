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
    const halfhide = document.getElementsByClassName('SideDash')[0];
    const tagP = document.getElementsByTagName('p');
    const iconL = halfhide.getElementsByTagName('i');
    const imgResize = halfhide.getElementsByTagName('img')[0];
    const sideDashgap = halfhide.getElementsByClassName('sideDash-f')[0];
    const burgerHalf = document.getElementsByClassName('on-burger')[0];

    if (e.target.checked) {
      [...tagP].forEach((data) => {
        data.classList.add('text');
      });
      halfhide.classList.add('half');
      [...iconL].forEach((data) => {
        data.classList.add('iconL');
      });
      imgResize.classList.add('resize');
      sideDashgap.classList.add('sideDash-fgap');
      burgerHalf.classList.add('on-burgerHalf');
    } else {
      [...tagP].forEach((data) => {
        data.classList.remove('text');
      });
      halfhide.classList.remove('half');
      [...iconL].forEach((data) => {
        data.classList.remove('iconL');
      });
      imgResize.classList.remove('resize');
      sideDashgap.classList.remove('sideDash-fgap');
      burgerHalf.classList.remove('on-burgerHalf');
    }
  };

  const clickhandle = (data) => {
    const comClick = data.target;
    console.log(comClick);
    if (comClick) {
      comClick.classList.toggle('select-f');
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
        <div className="c-SideDash ">
          <img src="" alt="" />
          <p>Nama Ormawa</p>
          <div className="sideDash-f sideDash-fgap">
            <div className="icon select-f" onClick={clickhandle}>
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
