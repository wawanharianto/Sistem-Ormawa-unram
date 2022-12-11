import Proposal from "../models/Proposal.js";
import Users from "../models/UserModel.js";
// import XLSX from "xlsx";
import XLSX from "xlsx-js-style";
import path from "path";
import { Op } from "sequelize";
import { ClientRequest } from "http";

export const ExportToExcel = async (req, res) => {
  const proposal = await Proposal.findAll({
    attributes: ['uuid', 'nama_kegiatan', 'nama_organisasi', 'jumlah_dana', 'ketua_panitia', 'nomer_ketupat', 'tanggal_pelaksanaan', 'tempat_pelaksanaan', 'nomer_ketum', 'url_proposal', 'spj', 'url_spj', 'berkas_dukung', 'url_bd', 'lpj', 'url_lpj', 'keterangan_wd3', 'keterangan_keuangan', 'keterangan_akademik', 'dana_disetujui', 'status'],
    include: [{
      model: Users,
      attributes: ['username', 'email']
    }],
    // where: {
    //   createAt: ,
    // }
  });

  if (!proposal) return res.status(404).json({ msg: "Data tidak ditemukan" });

  const workSheetColumnName = [
    // "Nama Kegiatan",
    // "Nama Organisasi",
    // "Jumlah Dana",
    // "Ketua Panitia",
    // "Tanggal Pelaksanaan",
    // "Tempat Pelaksanaan",
    // "Dana Di setujui"

    { v: "Nama Kegiatan", t: "m", s: { font: { name: "Times New Roman", sz: 12, bold: true }, alignment: { wrapText: false, vertical: "center", horizontal: "center" } } },
    { v: "Nama Organisasi", t: "m", s: { font: { name: "Times New Roman", sz: 12, bold: true }, alignment: { wrapText: false, vertical: "center", horizontal: "center" } } },
    { v: "Jumlah Dana", t: "m", s: { font: { name: "Times New Roman", sz: 12, bold: true }, alignment: { wrapText: false, vertical: "center", horizontal: "center" } } },
    { v: "Ketua Panitia", t: "m", s: { font: { name: "Times New Roman", sz: 12, bold: true }, alignment: { wrapText: false, vertical: "center", horizontal: "center" } } },
    { v: "Tanggal Pelaksanaan", t: "m", s: { font: { name: "Times New Roman", sz: 12, bold: true }, alignment: { wrapText: false, vertical: "center", horizontal: "center" } } },
  ];

  const workSheetName = 'Data Kegiatan';
  const filepath = './data.xlsx'

  const exportDataToExcel = (proposal, workSheetColumnName, workSheetName, filepath) => {
    const data = proposal.map(data => {
      return [data.nama_kegiatan,
      data.nama_organisasi,
      data.jumlah_dana,
      data.ketua_panitia,
      data.tanggal_pelaksanaan,
        // data.tempat_pelaksanaan,
        // data.dana_disetujui,
      ]
    });

    const max_width = data.reduce((w, r) => Math.max(w, r.proposal.nama_organisasi.length), 10);

    const workBook = XLSX.utils.book_new();
    const workSheetData = [
      workSheetColumnName,
      ...data
    ];

    workSheetData["!cols"] = [{ wch: max_width }];

    const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
    XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);
    XLSX.writeFile(workBook, path.resolve(filepath));
    return true
  }

  try {
    exportDataToExcel(proposal, workSheetColumnName, workSheetName, filepath);
    res.status(200).json({ msg: "Export Data successfuly" });
  } catch (error) {
    console.log(error);
  }




}