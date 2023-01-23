import React, { useEffect, useState } from 'react';
import './userForm.css';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from 'react-router-dom';
import { TablePagination } from '@mui/material';

function UserForm() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');
  const [msg, setMsg] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [page, keyword]);

  const getUsers = async () => {
    const response = await axios.get(`http://localhost:3000/users?search_query=${keyword}&page=${page}&limit=${limit}`);
    setUsers(response.data.result);
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
  };

  const deleteUsers = async (productId) => {
    const popUp = document.getElementById(productId);
    console.log(popUp);
    popUp.classList.toggle('deleteShow');
  };

  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 9) {
      setMsg('Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!');
    } else {
      setMsg('');
    }
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setMsg('');
    setKeyword(query);
  };

  const handleAddUser = (data) => {
    if (data.target) {
      console.log('Ok');
      navigate('add');
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div className="userContainer">
        <div className="headContainer">
          <h2>Users</h2>
        </div>
        <div className="tUserContainer">
          <button className="btn-addUser" onClick={handleAddUser}>
            <i class="fa-solid fa-user-plus" />
          </button>
          <table className="tUser">
            <thead>
              <tr>
                <th>No</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>
                    <input type="checkbox" />
                    {index + 1}
                  </td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className="form-icon">
                    <button className="delete-user">
                      <i class="fa-solid fa-trash" onClick={() => deleteUsers(user.uuid)} />
                    </button>
                    <Link to={`/users/edit/${user.uuid}`}>
                      <button className="sunting-user">
                        <i class="fa-solid fa-user-pen"></i>
                      </button>
                    </Link>
                  </td>
                  {/* POP UP */}
                  <div id={user.uuid} className="popUpContainer deleteShow">
                    <div className="container-content">
                      <p className="text"> Apakah anda benar ingin menghapus {user.username} ?</p>
                      <div className="cont-btn">
                        <button
                          onClick={async () => {
                            const popUp = document.getElementById(user.uuid);
                            popUp.classList.toggle('deleteShow');
                            await axios.delete(`http://localhost:3000/users/${user.uuid}`);
                            // bikinin try catch nangkep berhasil atau tidak
                            const popUpDelete = document.getElementById(user.uuid + 1);
                            popUpDelete.classList.toggle('deleteShow');
                            setTimeout(() => {
                              getUsers();
                              popUpDelete.classList.toggle('deleteShow');
                            }, 2000);
                          }}
                        >
                          ok
                        </button>
                        <button
                          onClick={() => {
                            const popUp = document.getElementById(user.uuid);
                            popUp.classList.toggle('deleteShow');
                          }}
                        >
                          cencel
                        </button>
                      </div>
                    </div>
                  </div>
                  <div id={user.uuid + 1} className="popUpContainer deleteShow">
                    <div className="container-content">
                      <div className="icon">
                        <i class="fa-solid fa-check"></i>
                      </div>
                      <p> Akun Berhasil Di hapus {user.username}</p>
                    </div>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="tfooter">
            {/* <p>Total Rows: {rows}</p>
            <p>
              Page: {rows ? page + 1 : 0} of {pages}
            </p>
            <p className="has-text-centered has-text-danger">{msg}</p>

            <nav className="pagination is-centered" key={rows} role="navigation" aria-label="pagination">
              <ReactPaginate
                previousLabel={'< Prev'}
                nextLabel={'Next >'}
                pageCount={Math.min(10, pages)}
                onPageChange={changePage}
                containerClassName={'pagination-list'}
                pageLinkClassName={'pagination-link'}
                previousLinkClassName={'pagination-previous'}
                nextLinkClassName={'pagination-next'}
                activeLinkClassName={'pagination-link is-current'}
                disabledLinkClassName={'pagination-link is-disabled'}
              />
            </nav> */}
            <TablePagination component="div" count={rows} page={page} onPageChange={handleChangePage} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleChangeRowsPerPage} />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserForm;
