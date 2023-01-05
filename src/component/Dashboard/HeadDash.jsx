import React, { useEffect } from 'react';
import './HeadDash.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOut, reset, currentLogin } from '../../features/auth';

function HeadDash() {
  // link sidebar
  const activePage = window.location.pathname;
  console.log(activePage);
  const sidelink = document.querySelectorAll('div a').forEach((link) => {
    if (link.href.includes(`${activePage}`)) {
      link.classList.add('select-f');
    }
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(currentLogin());
  }, [dispatch]);

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
          <a onClick={logout} className="logout">
            <p>Logout</p>
            <i class="fa-solid fa-right-from-bracket"></i>
          </a>
        </div>
      </div>
      {/* side bar */}

      <div className="SideDash">
        <div className="c-SideDash ">
          <img src={user?.url || ''} alt="" />
          <p>{user?.username || ''}</p>
          <div className="sideDash-f sideDash-fgap">
            <a href="/dashboard">
              <div id="dashboard" className="icon">
                <i id="dashboard" class="fa-solid fa-qrcode" />
                <p id="dashboard">Dashboard</p>
              </div>
            </a>
            {user && user.role !== 'adminKeuangan' && (
              <a href="/pengajuan-proposal">
                <div id="pengajuan" className="icon">
                  <i id="pengajuan" class="fa-solid fa-file-circle-plus"></i>
                  <p id="pengajuan">Pengajuan Proposal</p>
                </div>
              </a>
            )}
            {user && user.role !== 'adminAkademik' && (
              <a href="/pengajuan-dana">
                <div id="pengajuan" className="icon">
                  <i class="fa-solid fa-dollar-sign"></i>
                  <p id="pengajuan">Pengajuan Dana</p>
                </div>
              </a>
            )}
            {user && user.role !== 'adminAkademik' && (
              <a href="/SPJ">
                <div id="spj" className="icon">
                  <i id="spj" class="fa-regular fa-file"></i>
                  <p id="spj">SPJ</p>
                </div>
              </a>
            )}
            {user && user.role !== 'adminKeuangan' && (
              <a href="/LPJ">
                <div id="lpj" className="icon ">
                  <i id="lpj" class="fa-regular fa-file-lines"></i>
                  <p id="lpj">LPJ</p>
                </div>
              </a>
            )}
            {user && user.role !== 'mahasiswa' && (
              <a href="/arsip">
                <div id="arsip" className="icon">
                  <i id="arsip" class="fa-solid fa-folder-tree"></i>
                  <p id="arsip">Arsip</p>
                </div>
              </a>
            )}
            {user && user.role === 'admin' && (
              <a href="/users">
                <div id="users" className="icon">
                  <i id="users" class="fa-solid fa-user"></i>
                  <p id="users">Users</p>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HeadDash;
