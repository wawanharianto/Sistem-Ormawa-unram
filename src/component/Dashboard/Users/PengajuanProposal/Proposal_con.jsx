import React from 'react';
import './Proposal_con.css';

function Proposal_con() {
  return (
    <>
      <div className="Proposal_container">
        <div className="hProposal">
          <h2>Pengajuan Proposals</h2>
        </div>
        <div className="tProposal_container">
          <div className="headtproposal">
            <h3>Laporan Pertanggu ng Jawaban</h3>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <hr />
          <div className="fproposaltabel">
            <div className="fsearch">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="text" className="search" placeholder="Search" />
            </div>
            <div className="fbtn">
              <button>
                <i class="fa-solid fa-trash-can"></i> Delete
              </button>
              <button>
                <i class="fa-solid fa-plus"></i>Tambah Proposal
              </button>
            </div>
          </div>
          <table className="tabPengajuanProposal">
            <tr>
              <th>No</th>
              <th>Nama Kegiatan</th>
              <th>Nama Organisasi</th>
              <th>Dana Permintaan</th>
              <th>Ketua Panitia</th>
              <th>Kontak Kegiatan</th>
              <th>Dana ACC</th>
              <th>Status</th>
            </tr>
            <tr>
              <td>
                <input type="checkbox" /> 1
              </td>
              <td>a</td>
              <td>a</td>
              <td>d</td>
              <td>f</td>
              <td>g</td>
              <td>s</td>
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
            <tr>
              <td>
                <input type="checkbox" /> 2
              </td>
              <td>a</td>
              <td>a</td>
              <td>d</td>
              <td>f</td>
              <td>g</td>
              <td>s</td>
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
            <tr>
              <td>
                <input type="checkbox" /> 3
              </td>
              <td>a</td>
              <td>a</td>
              <td>d</td>
              <td>f</td>
              <td>g</td>
              <td>s</td>
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
          </table>
        </div>
      </div>
    </>
  );
}

export default Proposal_con;
