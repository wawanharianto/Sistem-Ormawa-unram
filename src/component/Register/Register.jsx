import React, { useState } from 'react';
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

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/users', {
        username: username,
        email: email,
        password: password,
        confPassword: confpass,
        file: file,
        role: role,
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
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
          <input className="upload" type="file" name="file" value={file} onChange={(e) => setfile(e.target.value)} />
          <label>Role</label>
          <input type="text" placeholder="role" value={role} onChange={(e) => setrole(e.target.value)} />
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}

export default Register;
