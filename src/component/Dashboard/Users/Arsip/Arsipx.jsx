import React, { useEffect, useState } from 'react';
import './Arsip.css';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function Arsipx() {
  const [proposals, setProposals] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [startdate, setStartdate] = useState('');
  const [enddate, setEnddate] = useState('');
  const [query, setQuery] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getProposal();
  }, [page, keyword]);

  const getProposal = async () => {
    const response = await axios.get(`http://localhost:3000/proposal?search_query=${keyword}&page=${page}&limit=${limit}`);
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
          createdAt: d.createdAt
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

  const Export = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('startdate', startdate);
    formData.append('enddate', enddate);
    try {
      await axios.get(`http://localhost:3000/export?startdate=${startdate}&enddate=${enddate}`, formData, 
      {
        headers: {
          'Content-type': 'multipart/form-data',
        }
      })
      setMsg('success export data');
      console.log(msg);
      if (msg == 'success export data') {
        console.log('OK');
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }

  return (
    <>
      <div className="Proposal_container">
        <div className="hProposal">
          <h2>ARSIP DATA</h2>
        </div>
        <div className="tProposal_container">
          <div className="headtproposal">
            <h3>Arsip dokumen</h3>
            <i class="fa-solid fa-chevron-down"></i>
            {/* <button onClick={Export}>export</button> */}
          </div>
          <hr />
          <div className="fproposaltabel">
            <form onSubmit={searchData}>
              <div className="fsearch">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" className="search" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
            </form>
            <div className="fexport">
              <form action="">
                <input type="date"  value={startdate} onChange={(e)=>setStartdate(e.target.value)} />
                <p>To</p>
                <input type="date" name="" id="" value={enddate} onChange={(e)=> setEnddate(e.target.value)} />
                <button onClick={Export}>export</button>
              </form>
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
                <th className="head8">Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map((proposal, index) => (
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
                      <button className="view">
                        <i class="fa-regular fa-file"></i>
                      </button>
                      <Link to={``} className="sunting">
                        <i class="fa-regular fa-pen-to-square"></i>
                      </Link>
                      <button className="delete">
                        <i class="fa-solid fa-delete-left"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="tfooter tfooter1">
            <p>Total Rows: {rows}</p>
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
    </>
  );
}

export default Arsipx;
