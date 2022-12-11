import React from 'react';
import './Login.css';
import logounram from '../../img/img3.png';
function Login() {
  return (
    <>
      <article className="conLogin">
        <div className="loginleft">
          <h2>Welcome Back!</h2>
          <span>login to Continue</span>
          <form action="">
            <div className="username">
              <i class="fa-solid fa-user"></i>
              <input type="text" name="username" id="" placeholder="Username" />
            </div>
            <div className="password">
              <i class="fa-solid fa-key"></i>
              <input type="password" name="password" id="" placeholder="Password" />
            </div>

            <button type="submit">Login</button>
          </form>
        </div>

        <div className="loginright">
          <img src={logounram} alt="" />
          <h2>Organisasi Mahasiswa</h2>
          <span>FAKULTAS KEDOKTERAN UNRAM</span>
        </div>
      </article>
    </>
  );
}

export default Login;
