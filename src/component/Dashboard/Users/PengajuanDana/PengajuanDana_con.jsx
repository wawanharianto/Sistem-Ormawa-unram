import React from 'react';
import './PengajuanDana_con.css';

import ReactPaginate from 'react-paginate';

function PengajuanDana_con() {
  return (
    <>
      <div className="Proposal_container">
        <div className="hProposal">
          <h2>Pengajuan Proposals</h2>
        </div>
        <div className="tProposal_container">
          <div className="headtproposal">
            <h3>Laporan Pengajuan Dana</h3>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <hr />
          <div className="fproposaltabel">
            <form>
              <div className="fsearch">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" className="search" placeholder="Search" />
              </div>
            </form>
            <div className="fbtn">
              {/* <button>
                <i class="fa-solid fa-trash-can"></i> Delete
              </button>
              <button>
                <i class="fa-solid fa-plus"></i>Tambah Proposal
              </button> */}
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" />1
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div className="fstatustable">
                    <button className="view">
                      <i class="fa-regular fa-file"></i>
                    </button>
                    <button className="sunting">
                      <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button className="delete">
                      <i class="fa-solid fa-delete-left"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          {/* <div className="tfooter tfooter1">
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
          </div> */}
        </div>
      </div>
    </>
  );
}

export default PengajuanDana_con;
