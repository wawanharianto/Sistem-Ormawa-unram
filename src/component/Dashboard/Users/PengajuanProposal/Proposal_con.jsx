import React, { useEffect, useState } from 'react';
import './Proposal_con.css';
import axios from 'axios';
import { TablePagination } from '@mui/material';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function Proposal_con() {
  const [proposals, setProposals] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [Statuscount, setStatuscount] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getProposal();
  }, [page, keyword]);

  const getProposal = async () => {
    const response = await axios.get(
      `http://localhost:3000/proposal?search_query=${keyword}&page=${page}&limit=${limit}&status=Proposal di ajukan&status=Proposal di tolak&status=Proposal ACC`
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
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
    setStatuscount(response.data.totalStatus);
  };

  const deleteProposal = async (proposalId) => {
    await axios.delete(`http://localhost:3000/proposal/${proposalId}`);
    const popUpDelete = document.getElementById(proposalId + 1);
    popUpDelete.classList.toggle('SetujuShow');
    setTimeout(() => {
      getProposal();
    }, 2000);
  };
  const handleAddProposal = () => {
    navigate('add');
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
          <h2>Pengajuan Proposal</h2>
        </div>
        <div className="container-tabel">
          <div className="tProposal_container">
            <div className="headtproposal">
              <h3>Form Pengajuan Proposal</h3>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            <hr />
            <div className="fproposaltabel">
              <div className="fsearch">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" className="search" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              {user && user.role !== 'WD3' && user && user.role !== 'adminAkademik' && (
                <div className="fbtn">
                  {Statuscount >= 3 && user && user.role == 'mahasiswa' && user ? (
                    console.log(Statuscount)
                  ) : (
                    <button onClick={handleAddProposal}>
                      <i className="fa-solid fa-plus"></i>Tambah Proposal
                    </button>
                  )}
                </div>
              )}
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
                {}
                {proposals
                  .filter((proposal) => proposal.nama_kegiatan.toLowerCase().includes(query) || proposal.nama_organisasi.toLowerCase().includes(query))
                  .map((proposal, index) => (
                    <tr key={proposal.id}>
                      <td>
                        {index + 1}
                      </td>
                      <td>{proposal.nama_kegiatan}</td>
                      <td>{proposal.nama_organisasi}</td>
                      <td>{proposal.jumlah_dana}</td>
                      <td>{proposal.ketua_panitia}</td>
                      <td>{proposal.nomer_ketum}</td>
                      <td>{proposal.dana_disetujui}</td>
                      <td>{proposal.status}</td>
                      <td>
                        <div className="fstatustable">
                          <Link to={`/approve-proposal/${proposal.uuid}`} className="view">
                            <button className="views-prop">
                              <i className="fa-regular fa-file"></i>
                            </button>
                          </Link>

                          {(user && user.role === 'mahasiswa') || (user && user.role === 'admin') ? (
                            proposal.status !== 'Proposal ACC' ? (
                              <Link to={`/proposal/edit/${proposal.uuid}`} className="sunting">
                                <button className="edit-prop">
                                  <i className="fa-regular fa-pen-to-square"></i>
                                </button>
                              </Link>
                            ) : (
                              ''
                            )
                          ) : (
                            ''
                          )}

                          {(user && user.role === 'mahasiswa') || (user && user.role === 'admin') ? (
                            proposal.status !== 'Proposal ACC' ? (
                              <button
                                className="delete-prop"
                                onClick={() => {
                                  console.log(proposal.uuid);
                                  const popupDelete = document.getElementById(proposal.uuid);
                                  popupDelete.classList.toggle('showoff');
                                }}
                              >
                                <i className="fa-solid fa-delete-left"></i>
                              </button>
                            ) : (
                              ''
                            )
                          ) : (
                            ''
                          )}
                        </div>
                        {/* popup */}
                        <div id={proposal.uuid} className="popUp-Delete showoff">
                          <div className="box">
                            <div className="icon">
                              <i className="fa-solid fa-circle-exclamation icon"></i>
                            </div>
                            <p>Apakah anda mau menghapus {proposal.nama_kegiatan} ?</p>
                            <div className="g-btn">
                              <button
                                className="setuju"
                                onClick={() => {
                                  const popupDelete = document.getElementById(proposal.uuid);
                                  popupDelete.classList.toggle('showoff');
                                  deleteProposal(proposal.uuid);
                                }}
                              >
                                Oke
                              </button>
                              <button
                                className="cancel"
                                onClick={() => {
                                  const popupDelete = document.getElementById(proposal.uuid);
                                  popupDelete.classList.toggle('showoff');
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                        <div id={proposal.uuid + 1} className="popUp-Approve SetujuShow">
                          <div className="container-popUp">
                            <div className="icon">
                              <i className="fa-solid fa-check"></i>
                            </div>
                            <p>Berhasil Dihapus</p>
                          </div>
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

export default Proposal_con;
