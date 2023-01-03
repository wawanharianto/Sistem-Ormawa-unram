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
    where: {
      tanggal_pelaksanaan: {
        [Op.between] : [new Date(req.query.startdate),new Date(req.query.enddate)],
      },
    },
    order: [
      ['tanggal_pelaksanaan', 'ASC']
  ]
  });

  if (!proposal) return res.status(404).json({ msg: "Data tidak ditemukan" });

  try {

    const rows = proposal.map(row => ({
      nama_kegiatan: row.nama_kegiatan,
      nama_organisasi: row.nama_organisasi,
      jumlah_dana: row.jumlah_dana,
      ketua_panitia: row.ketua_panitia,
      tanggal_pelaksanaan: row.tanggal_pelaksanaan,
      tempat_pelaksanaan: row.tempat_pelaksanaan,
    }));

    const workSheet = XLSX.utils.json_to_sheet(rows, { origin: "A4" });
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Data Ormawa");

    XLSX.utils.sheet_add_aoa(workSheet, [[
      { v: "Nama Kegiatan", t: "s", s: { font: { name: "Times New Roman", sz: 12, bold: true }, alignment: { wrapText: false, vertical: "center", horizontal: "center" } } },
      { v: "Nama Organisasi", t: "s", s: { font: { name: "Times New Roman", sz: 12, bold: true }, alignment: { wrapText: false, vertical: "center", horizontal: "center" } } },
      { v: "Jumlah Dana", t: "s", s: { font: { name: "Times New Roman", sz: 12, bold: true }, alignment: { wrapText: false, vertical: "center", horizontal: "center" } } },
      { v: "Ketua Panitia", t: "s", s: { font: { name: "Times New Roman", sz: 12, bold: true }, alignment: { wrapText: false, vertical: "center", horizontal: "center" } } },
      { v: "Tanggal Pelaksanaan", t: "s", s: { font: { name: "Times New Roman", sz: 12, bold: true }, alignment: { wrapText: false, vertical: "center", horizontal: "center" } } },
      { v: "Tempat Pelaksanaan", t: "s", s: { font: { name: "Times New Roman", sz: 12, bold: true }, alignment: { wrapText: false, vertical: "center", horizontal: "center" } } },

    ]], { origin: "A4" });

    XLSX.utils.sheet_add_aoa(workSheet, [[
      { v: "DATA ORGANISASI MAHASISWA FAKULTAS KEDOKTERAN", t: "s", s: { font: { name: "Times New Roman", sz: 12, bold: true }, alignment: { wrapText: false, vertical: "center", horizontal: "center" } } },

    ]], { origin: "A1" });

    XLSX.utils.sheet_add_aoa(workSheet, [[
      { v: `DARI TANGGAL ${req.query.startdate} SAMPAI ${req.query.enddate}`, t: "s", s: { font: { name: "Times New Roman", sz: 12, bold: true }, alignment: { wrapText: false, vertical: "center", horizontal: "center" } } },

    ]], { origin: "A2" });

    const width_col1 = rows.reduce((w, r) => Math.max(w, r.nama_kegiatan.length), 20);
    const width_col2 = rows.reduce((w, r) => Math.max(w, r.nama_organisasi.length), 20);
    const width_col3 = rows.reduce((w, r) => Math.max(w, r.jumlah_dana.length), 20);
    const width_col4 = rows.reduce((w, r) => Math.max(w, r.ketua_panitia.length), 20);
    const width_col5 = rows.reduce((w, r) => Math.max(w, r.tanggal_pelaksanaan.length), 25);
    const width_col6 = rows.reduce((w, r) => Math.max(w, r.tempat_pelaksanaan.length), 25);

    workSheet["!cols"] = [{ wch: width_col1 },
    { wch: width_col2 },
    { wch: width_col3 },
    { wch: width_col4 },
    { wch: width_col5 },
    { wch: width_col6 },
    ];

    workSheet["!rows"] = [
      { hpx: 20 }
    ]

    const merge = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } },
    ];

    workSheet["!merges"] = merge;

    XLSX.writeFile(workBook,"DATA EXPORT.xlsx", { compression: true });

    res.status(200).json({ msg: "Export Data successfuly" });
  } catch (error) {
    console.log(error);
  }
}