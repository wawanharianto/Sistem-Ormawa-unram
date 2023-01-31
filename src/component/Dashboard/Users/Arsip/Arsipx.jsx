import React, { useEffect, useState } from 'react';
import './Arsip.css';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { TablePagination } from '@mui/material';

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
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
    const popUpDelete = document.getElementsByClassName('popUpContainer')[0];
    popUpDelete.classList.toggle('deleteShow');
    let arrayIds = [];
    proposals.forEach((d) => {
      if (d.select) {
        arrayIds.push(d.id);
      }
    });
    if (arrayIds.length == 0) {
      const popUpDelete = document.getElementsByClassName('popUpContainer')[1];
      popUpDelete.classList.toggle('deleteShow');
      setTimeout(() => {
        const popUpDelete = document.getElementsByClassName('popUpContainer')[1];
        popUpDelete.classList.toggle('deleteShow');
      }, 2000);
    } else {
      await axios
        .delete(
          `http://localhost:3000/proposal/`,
          {
            params: {
              id: arrayIds,
            },
          },
          {
            headers: {
              'Content-type': 'application/json',
            },
          }
        )
        .then((data) => {
          const popUpDelete = document.getElementsByClassName('popUpContainer')[2];
          popUpDelete.classList.toggle('deleteShow');
          setTimeout(() => {
            const popUpDelete = document.getElementsByClassName('popUpContainer')[2];
            popUpDelete.classList.toggle('deleteShow');
          }, 2000);
          getProposal();
        })
        .catch((err) => {
          const popUpDelete = document.getElementsByClassName('popUpContainer')[3];
          popUpDelete.classList.toggle('deleteShow');
          setTimeout(() => {
            const popUpDelete = document.getElementsByClassName('popUpContainer')[3];
            popUpDelete.classList.toggle('deleteShow');
          }, 3000);
          setMsg(err.response.data.msg);
        });
    }
  };

  const Export = async (e) => {
    const popUpDelete = document.getElementsByClassName('popUpContainer')[4];
    popUpDelete.classList.toggle('deleteShow');
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
      const popUpDelete = document.getElementsByClassName('popUpContainer')[5];
      popUpDelete.classList.toggle('deleteShow');
      setTimeout(() => {
        popUpDelete.classList.toggle('deleteShow');
      }, 2000);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        const popUpDelete = document.getElementsByClassName('popUpContainer')[6];
        popUpDelete.classList.toggle('deleteShow');
        setTimeout(() => {
          popUpDelete.classList.toggle('deleteShow');
        }, 2000);
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
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const popUpDelete = document.getElementsByClassName('popUpContainer')[0];
                      popUpDelete.classList.toggle('deleteShow');
                    }}
                  >
                    <i class="fa-solid fa-trash-can"></i> Delete
                  </button>
                  <input type="date" value={startdate} onChange={(e) => setStartdate(e.target.value)} />
                  <p>To</p>
                  <input type="date" name="" id="" value={enddate} onChange={(e) => setEnddate(e.target.value)} />
                  <button
                    className="btn-export"
                    onClick={(e) => {
                      e.preventDefault();
                      const popUpDelete = document.getElementsByClassName('popUpContainer')[4];
                      popUpDelete.classList.toggle('deleteShow');
                    }}
                  >
                    export
                  </button>
                  {/* POP UP MULTIPLE */}
                  <div className="popUpContainer deleteShow">
                    <div className="container-content">
                      <div className="icon-i">
                        <i class="fa-solid fa-circle-info"></i>
                      </div>
                      <p className="text"> Apakah anda benar ingin menghapus item yang di pilih?</p>
                      <div className="cont-btn">
                        <button
                          onClick={async (e) => {
                            e.preventDefault();
                            multipleDeleteById();
                          }}
                        >
                          Oke
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            const popUpDelete = document.getElementsByClassName('popUpContainer')[0];
                            popUpDelete.classList.toggle('deleteShow');
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>

                  <div i className="popUpContainer deleteShow Critical">
                    <div className="container-content">
                      <div className="icon">
                        <i class="fa-solid fa-x"></i>
                      </div>
                      <p> Tidak Ada Item yang DiPilih</p>
                    </div>
                  </div>
                  <div i className="popUpContainer deleteShow">
                    <div className="container-content">
                      <div className="icon">
                        <i class="fa-solid fa-check"></i>
                      </div>
                      <p> Berhasil Mengahapus Kumpulan Item</p>
                    </div>
                  </div>
                  <div i className="popUpContainer deleteShow Critical">
                    <div className="container-content">
                      <div className="icon">
                        <i class="fa-solid fa-x"></i>
                      </div>
                      <p>Periksa Item Terjadi Kesalahan</p>
                      <p>Note : {msg}</p>
                    </div>
                  </div>

                  <div className="popUpContainer deleteShow">
                    <div className="container-content">
                      <div className="icon-i">
                        <i class="fa-solid fa-circle-info"></i>
                      </div>
                      <p className="text"> Apakah Anda Sudah Yakin dengan Data yang Anda export??</p>
                      <div className="cont-btn">
                        <button
                          onClick={async (e) => {
                            e.preventDefault();
                            Export();
                          }}
                        >
                          Oke
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            const popUpDelete = document.getElementsByClassName('popUpContainer')[4];
                            popUpDelete.classList.toggle('deleteShow');
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>

                  <div i className="popUpContainer deleteShow">
                    <div className="container-content">
                      <div className="icon">
                        <i class="fa-solid fa-check"></i>
                      </div>
                      <p>{msg}</p>
                    </div>
                  </div>
                  <div i className="popUpContainer deleteShow Critical">
                    <div className="container-content">
                      <div className="icon">
                        <i class="fa-solid fa-x"></i>
                      </div>
                      <p>Error!</p>
                      <p>{msg}</p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <table id="myTable" className="tabPengajuanProposal">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Kegiatan</th>
                  <th onClick={() => sortTable(0)}>Nama Organisasi</th>
                  <th onClick={() => sortTable(1)}>Tanggal Pelaksanaan</th>
                  <th>Ketua Panitia</th>
                  <th>Kontak Kegiatan</th>
                  <th>Dana ACC</th>
                  <th className="head8">Status</th>
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
                      <td>{proposal.tanggal_pelaksanaan}</td>
                      <td>{proposal.ketua_panitia}</td>
                      <td>{proposal.nomer_ketum}</td>
                      <td>{proposal.dana_disetujui}</td>
                      <td>{proposal.status}</td>
                      <td>
                        <div className="fstatustable">
                          <button onClick={() => navigate(`details/${proposal.uuid}`)} className="view-spj">
                            <i class="fa-regular fa-file"></i>
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

export default Arsipx;
