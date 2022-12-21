import React, { useState } from 'react';
import './Login.css';
import logounram from '../../img/img3.png';
import axios from 'axios';

function Login() {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [msg, setmsg] = useState('');
  // const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      await axios.post('http://localhost:3000/login', formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      setmsg('Login Success');

      // navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        setmsg(error.response.data.msg);
      }
    }
  };
  return (
    <>
      <article className="conLogin">
        <div className="loginleft">
          <h2>Welcome Back!</h2>
          <span>login to Continue</span>

          <form onSubmit={Auth} action="">
            <p>{msg}</p>
            <div className="username">
              <i class="fa-solid fa-user"></i>
              <input type="text" name="username" id="" placeholder="Username" value={username} onChange={(e) => setusername(e.target.value)} />
            </div>
            <div className="password">
              <i class="fa-solid fa-key"></i>
              <input type="password" name="password" id="" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
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
