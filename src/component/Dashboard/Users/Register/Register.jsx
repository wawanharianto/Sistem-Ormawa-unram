import React, { useEffect, useState } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

function Register() {
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confpass, setconfpass] = useState('');
  const [file, setfile] = useState('');
  const [role, setrole] = useState('');
  const [msg, setMsg] = useState('');
  const [popUp, setPopUp] = useState(false);
  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setfile(image);
  };

  const Register = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confPassword', confpass);
    formData.append('file', file);
    formData.append('role', role);

    try {
      await axios
        .post('http://localhost:3000/users', formData, {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        })
        .then(() => {
          const popup = document.getElementsByClassName('popUpRegister')[0];
          popup.classList.toggle('popshow');
          setTimeout(() => {
            popup.classList.toggle('popshow');
            navigate('/users');
          }, 2000);
        });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        const popup = document.getElementsByClassName('popUpRegister')[1];
        popup.classList.toggle('popshow');
        setTimeout(() => {
          popup.classList.toggle('popshow');
        }, 2000);
      }
    }
  };

  return (
    <>
      <div className="conRegister">
        <h2>Register User</h2>
        <div className="container-formAddProp">
          <form onSubmit={Register} className="form-Register" action="">
            <h2>REGISTER</h2>
            <hr className="line-space" />
            <div className="item-set">
              <label> Username</label>
              <input type="text" placeholder="Username ..." value={username} onChange={(e) => setusername(e.target.value)} />
            </div>
            <div className="item-set">
              <label> Email</label>
              <input type="email" placeholder="email ..." value={email} onChange={(e) => setemail(e.target.value)} />
            </div>
            <div className="item-set">
              <label>Password</label>
              <input type="password" placeholder="password" value={password} onChange={(e) => setpassword(e.target.value)} />
            </div>
            <div className="item-set">
              <label>Confirm Password</label>
              <input type="password" placeholder="confirm password" value={confpass} onChange={(e) => setconfpass(e.target.value)} />
            </div>
            <div className="item-set">
              <label>source foto</label>
              <input className="upload" type="file" name="file" onChange={loadImage} />
            </div>
            <div className="item-set">
              <label>Role</label>
              <select
                className="role"
                value={role}
                onChange={(e) => {
                  setrole(e.target.value);
                }}
              >
                <option>-- select --</option>
                <option value="mahasiswa">Mahasiswa</option>
                <option value="admin">Super User</option>
                <option value="WD3">Wakil Dekan 3</option>
                <option value="adminAkademik">Admin Akademik</option>
                <option value="adminKeuangan">Admin Keuangan</option>
              </select>
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
      <div className="popUpRegister popshow">
        <div className="container-popup">
          <div className="icon">
            <i class="fa-regular fa-circle-check"></i>
          </div>
          <p className="text">Berhasil Register</p>
        </div>
      </div>
      <div className="popUpRegister popshow">
        <div className="container-popup">
          <div className="iconx">
            <i class="fa-solid fa-x"></i>
          </div>
          <p className="text">Gagal Register</p>
          <p className="text">Note : {msg} </p>
        </div>
      </div>
    </>
  );
}

export default Register;
