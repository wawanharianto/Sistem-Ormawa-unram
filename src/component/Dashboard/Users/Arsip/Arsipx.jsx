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
  const [sort, setSort] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getProposal();
  }, [page, keyword]);

  const getProposal = async () => {
    const response = await axios.get(`http://localhost:3000/arsip?search_query=${keyword}&page=${page}&limit=${limit}&sortby=${sort}`);
    setProposals(
      response.data.result.map((d) => {
        return {
          select: false,
          uuid: d.uuid,
          id: d.id,
          nama_kegiatan: d.nama_kegiatan,
          nama_organisasi: d.nama_organisasi,
          tanggal_pelaksanaan: d.tanggal_pelaksanaan,
          ketua_panitia: d.ketua_panitia,
          nomer_ketum: d.nomer_ketum,
          dana_disetujui: d.dana_disetujui,
          status: d.status,
          createdAt: d.createdAt,
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

  const multipleDeleteById = async (e) => {
    e.preventDefault();
    let arrayIds = [];
    proposals.forEach((d) => {
      if (d.select) {
        arrayIds.push(d.id);
      }
    });
    console.log(arrayIds);
    if (arrayIds.length == 0) {
      console.log('Tidak ada data');
    } else {
      console.log(arrayIds);
      await axios
        .delete(`http://localhost:3000/proposal/${arrayIds}`)
        .then((data) => {
          console.log(data);
          getProposal();
        })
        .catch((err) => alert(err));
    }
  };

  const Export = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('startdate', startdate);
    formData.append('enddate', enddate);
    try {
      await axios.get(`http://localhost:3000/export?startdate=${startdate}&enddate=${enddate}`, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
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
  };

  function sortTable(n) {
    var table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;
    table = document.getElementById('myTable');
    switching = true;
    //Set the sorting direction to ascending:
    dir = 'asc';
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table?.rows || '';
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < rows.length - 1; i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName('TD')[n];
        y = rows[i + 1].getElementsByTagName('TD')[n];
        /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
        if (dir == 'asc') {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == 'desc') {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
        if (switchcount == 0 && dir == 'asc') {
          dir = 'desc';
          switching = true;
        }
      }
    }
  }

  return (
    <>
      <div className="Proposal_container">
        <div className="hProposal">
          <h2>ARSIP DATA</h2>
        </div>
        <div className="container-tabel">
          <div className="tProposal_container">
            <div className="headtproposal">
              <h3>Arsip dokumen</h3>
              <i class="fa-solid fa-chevron-down"></i>
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
                <button onClick={multipleDeleteById}>
                  <i class="fa-solid fa-trash-can"></i> Delete
                </button>
                  <input type="date" value={startdate} onChange={(e) => setStartdate(e.target.value)} />
                  <p>To</p>
                  <input type="date" name="" id="" value={enddate} onChange={(e) => setEnddate(e.target.value)} />
                  <button onClick={Export}>export</button>
                </form>
              </div>
            </div>
            <table id="myTable" className="tabPengajuanProposal">
              <thead>
                <tr>
                  <th>No</th>
                  <th onClick={() => sortTable(0)}>Nama Kegiatan</th>
                  <th onClick={() => sortTable(1)}>Nama Organisasi</th>
                  <th onClick={() => sortTable(2)}>Tanggal Pelaksanaan</th>
                  <th>Ketua Panitia</th>
                  <th>Kontak Kegiatan</th>
                  <th>Dana ACC</th>
                  <th className="head8">Status</th>
                </tr>
              </thead>
              <tbody>
                {proposals
                  .filter((proposal) => proposal.nama_kegiatan.toLowerCase().includes(query) || proposal.nama_organisasi.toLowerCase().includes(query))
                  .map((proposal, index) => (
                    <tr key={proposal.id}>
                      <td><input
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
                        {index + 1}</td>
                      <td>{proposal.nama_kegiatan}</td>
                      <td>{proposal.nama_organisasi}</td>
                      <td>{proposal.tanggal_pelaksanaan}</td>
                      <td>{proposal.ketua_panitia}</td>
                      <td>{proposal.nomer_ketum}</td>
                      <td>{proposal.dana_disetujui}</td>
                      <td>{proposal.status}</td>
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
      </div>
    </>
  );
}

export default Arsipx;
