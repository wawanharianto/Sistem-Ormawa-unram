import React, { useEffect, useState } from 'react';

import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import './LaporanPJ.css';
import { TablePagination } from '@mui/material';

function PengajuanDana_con() {
  const [proposals, setProposals] = useState([]);
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
    getProposal();
  }, [page, keyword]);

  const getProposal = async () => {
    const response = await axios.get(
      `http://localhost:3000/proposal?search_query=${keyword}&page=${page}&limit=${limit}&status=SPJ Diterima&status=LPJ Di Ajukan&status=LPJ Revisi`
    );
    setProposals(
      response.data.result.map((d) => {
        return {
          select: false,
          uuid: d.uuid,
          id: d.id,
          nama_kegiatan: d.nama_kegiatan,
          nama_organisasi: d.nama_organisasi,
          jumlah_dana: d.jumlah_dana,
          ketua_panitia: d.ketua_panitia,
          nomer_ketum: d.nomer_ketum,
          dana_disetujui: d.dana_disetujui,
          status: d.status,
        };
      })
    );
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div className="Proposal_container">
        <div className="hProposal">
          <h2>Laporan Pertanggung Jawaban</h2>
        </div>

        <div className="container-tabel">
          <div className="tProposal_container">
            <div className="headtproposal">
              <h3>Laporan Pertanggung Jawaban</h3>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            <hr />
            <div className="fproposaltabel">
              <div className="fsearch">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" className="search" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>

              <div className="fbtn">
              </div>
            </div>
            <table className="tabPengajuanProposal">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Kegiatan</th>
                  <th>Nama Organisasi</th>
                  <th>Dana Permintaan</th>
                  <th>Ketua Panitia</th>
                  <th>Kontak Kegiatan</th>
                  <th>Dana ACC</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {proposals
                  .filter((proposal) => proposal.nama_kegiatan.toLowerCase().includes(query) || proposal.nama_organisasi.toLowerCase().includes(query))
                  .map((proposal, index) => (
                    <tr key={proposal.id}>
                      <td>{index + 1}</td>
                      <td>{proposal.nama_kegiatan}</td>
                      <td>{proposal.nama_organisasi}</td>
                      <td>{proposal.jumlah_dana}</td>
                      <td>{proposal.ketua_panitia}</td>
                      <td>{proposal.nomer_ketum}</td>
                      <td>{proposal.dana_disetujui}</td>
                      <td>{proposal.status}</td>
                      <td>
                        <div className="fstatustable">
                          <button onClick={() => navigate(`details/${proposal.uuid}`)} className="view-lpj">
                            <i className="fa-regular fa-file"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="tfooter tfooter1">
              <TablePagination component="div" count={rows} page={page} onPageChange={handleChangePage} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleChangeRowsPerPage} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PengajuanDana_con;
