import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { TablePagination } from '@mui/material';
import './Pengumuman.css';

function Pengumuman() {
  const [proposals, setProposals] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    getProposal();
  }, []);

  const getProposal = async () => {
    const response = await axios.get(`http://localhost:3000/pengumuman?search_query=${keyword}&page=${page}&limit=${limit}`);
    setProposals(response.data.result);
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
  };

  const changePage = ({ selected }) => {
    setPage(selected);
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
      <article className="conPengumuman">
        <div className="headPengumuman">
          <h1>PENGUMUMAN</h1>
          <hr />
        </div>
        <div className="container-flow">
          <table className="tPengumuman">
            <thead>
              <tr>
                <th>No</th>
                <th>Organisasi Mahasiswa</th>
                <th>Nama Kegiatan</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map((proposal, index) => (
                <tr key={proposal.id}>
                  <td>{index + 1}</td>
                  <td>{proposal.nama_organisasi}</td>
                  <td>{proposal.nama_kegiatan}</td>
                  <td>{proposal.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="tfooter tfooter1">
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
      </article>
    </>
  );
}

export default Pengumuman;
