import React, { useEffect, useState } from 'react';
import './Register.css';
import axios from 'axios';

function Register() {
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confpass, setconfpass] = useState('');
  const [file, setfile] = useState('');
  const [role, setrole] = useState('');
  const [msg, setMsg] = useState('');
  const [popUp, setPopUp] = useState(false);

  const loadImage = (e) => {
    const image = e.target.files[0];
    setfile(image);
  };
  
  const handleClose = () => {
    const closepop = document.getElementsByClassName('popUp')[0];
    closepop.classList.toggle('popshow');
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
      await axios.post('http://localhost:3000/users', formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      setMsg('success');
      console.log(msg);
      if (msg == 'success') {
        console.log('OK');
        this.props.navigation.navigate('Dashboard');
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <>
      <div className="conRegister">
        <form onSubmit={Register} className="form-Register" action="">
          <h2>REGISTER</h2>
          <label> Username</label>
          <input type="text" placeholder="Username ..." value={username} onChange={(e) => setusername(e.target.value)} />
          <label> Email</label>
          <input type="email" placeholder="email ..." value={email} onChange={(e) => setemail(e.target.value)} />
          <label>Password</label>
          <input type="password" placeholder="password" value={password} onChange={(e) => setpassword(e.target.value)} />
          <label>Confirm Password</label>
          <input type="password" placeholder="password" value={confpass} onChange={(e) => setconfpass(e.target.value)} />
          <input className="upload" type="file" name="file" onChange={loadImage} />
          <label>Role</label>
          <input type="text" placeholder="role" value={role} onChange={(e) => setrole(e.target.value)} />
          <button type="submit" onClick={handleClose}>
            Register
          </button>
        </form>
      </div>
      <div className="popUp pophide">
        <div className="conPopUp" onClick={handleClose}>
          <button>X</button>
          <p>{msg}</p>
        </div>
      </div>
    </>
  );
}

export default Register;
