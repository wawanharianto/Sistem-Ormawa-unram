import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser, reset } from '../../features/auth';
import './Login.css';
import logounram from '../../img/img3.png';

function Login() {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user || isSuccess) {
      navigate('/dashboard');
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = async (e) => {
    e.preventDefault();
    dispatch(LoginUser({ username, password }));
  };

  return (
    <>
      <article className="conLogin">
        <div className="loginleft">
          <h2>Welcome Back!</h2>
          <span>login to Continue</span>

          <form onSubmit={Auth} action="">
            {isError && <p className="has-text-centered">{message}</p>}
            <div className="username">
              <i className="fa-solid fa-user"></i>
              <input type="text" name="username" id="" placeholder="Username" value={username} onChange={(e) => setusername(e.target.value)} />
            </div>
            <div className="password">
              <i className="fa-solid fa-key"></i>
              <input type="password" name="password" id="" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
            </div>

            <button type="submit">{isLoading ? 'Loading...' : 'Login'}</button>
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
