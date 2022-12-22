import React from 'react';
import './userForm.css';
import { useNavigate } from 'react-router-dom';

function UserForm() {
  const navigate = useNavigate();
  const handleAddUser = (data) => {
    if (data.target) {
      console.log('Ok');
      navigate('/dashboard/users/add');
    }
  };
  return (
    <>
      <div className="userContainer">
        <div className="headContainer">
          <h2>Users</h2>
        </div>
        <div className="tUserContainer">
          <table className="tUser">
            <tr>
              <th>No</th>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
            <tr>
              <td>
                <input type="checkbox" />1
              </td>
              <td>a</td>
              <td>a@gmail.com</td>
              <td>222</td>
              <td>Admin</td>
              <td className="form-icon">
                // <i class="fa-solid fa-trash" />
                // <i class="fa-solid fa-pen" />
              </td>
            </tr>
          </table>
          <button className="btn-addUser" onClick={handleAddUser}>
            <i class="fa-solid fa-user-plus" />
          </button>
        </div>
      </div>
    </>
  );
}

export default UserForm;
