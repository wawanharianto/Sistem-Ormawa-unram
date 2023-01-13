import React, { useEffect, useState } from 'react';
import './Proposal_con.css';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
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
  // const status = ['Proposal di ajukan']
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getProposal();
  }, [page, keyword]);

  const getProposal = async () => {
    const response = await axios.get(`http://localhost:3000/proposal?search_query=${keyword}&page=${page}&limit=${limit}&status=Proposal di ajukan&status=Proposal ditolak`);
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
    setStatuscount(response.data.totalStatus);
  };

  const deleteProposal = async (proposalId) => {
    console.log(proposalId);
    await axios.delete(`http://localhost:3000/proposal/${proposalId}`);
    getProposal();
  };

  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 9) {
      setMsg('Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!');
    } else {
      setMsg('');
    }
  };

  // const searchData = (e) => {
  //   e.preventDefault();
  //   setPage(0);
  //   setMsg('');
  //   setKeyword(query);
  // };

  const handleAddProposal = () => {
    navigate('add');
  };

  const multipleDeleteById = async () => {
    let arrayIds = [];
    proposals.forEach((d) => {
      if (d.select) {
        arrayIds.push(d.id);
      }
    });
    console.log(arrayIds);
    await axios
      .delete(`http://localhost:3000/proposal/${arrayIds}`)
      .then((data) => {
        console.log(data);
        getProposal();
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <div className="Proposal_container">
        <div className="hProposal">
          <h2>Pengajuan Proposals</h2>
        </div>
        <div className="container-tabel">
          <div className="tProposal_container">
            <div className="headtproposal">
              <h3>Form Pengajuan Proposal</h3>
              <i class="fa-solid fa-chevron-down"></i>
            </div>
            <hr />
            <div className="fproposaltabel">
              <div className="fsearch">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" className="search" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="fbtn">
                <button onClick={() => multipleDeleteById()}>
                  <i class="fa-solid fa-trash-can"></i> Delete
                </button>

                {Statuscount >= 3 && user && user.role == 'mahasiswa' ? (
                  ''
                ) : (
                  <button onClick={handleAddProposal}>
                    <i class="fa-solid fa-plus"></i>Tambah Proposal
                  </button>
                )}
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
                      <td>
                        <input
                          type="checkbox"
                          checked={proposal.select}
                          onChange={(e) => {
                            let value = e.target.checked;
                            setProposals(
                              proposals.map((d) => {
                                if (d.id == proposal.id) {
                                  d.select = value;
                                }
                                return d;
                              })
                            );
                          }}
                        />{' '}
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
                              <i class="fa-regular fa-file"></i>
                            </button>
                          </Link>

                          <Link to={`/proposal/edit/${proposal.uuid}`} className="sunting">
                            <button className="edit-prop">
                              <i class="fa-regular fa-pen-to-square"></i>
                            </button>
                          </Link>
                          <button
                            className="delete-prop"
                            onClick={() => {
                              console.log(proposal.uuid);
                              const popupDelete = document.getElementById(proposal.uuid);
                              popupDelete.classList.toggle('showoff');
                            }}
                          >
                            <i class="fa-solid fa-delete-left"></i>
                          </button>
                        </div>
                        {/* popup */}
                        <div id={proposal.uuid} className="popUp-Delete showoff">
                          <div className="box">
                            <i class="fa-solid fa-circle-exclamation icon"></i>
                            <p>apakah anda mau menghapus {proposal.nama_kegiatan} ?</p>
                            <div className="g-btn">
                              <button className="setuju" onClick={() => deleteProposal(proposal.uuid)}>
                                OK
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
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="tfooter tfooter1">
              {/* <p>Total Rows: {rows}</p> */}
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
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Proposal_con;
