import Proposal from "../models/Proposal.js";
import Users from "../models/UserModel.js";
// import XLSX from "xlsx";
import XLSX from "xlsx-js-style";
import path from "path";
import { Op } from "sequelize";
import { ClientRequest } from "http";

export const ExportToExcel = async (req, res) => {
  const proposal = await Proposal.findAll({
    attributes: ['uuid', 'nama_kegiatan', 'nama_organisasi', 'jumlah_dana', 'ketua_panitia', 'nomer_ketupat', 'tanggal_pelaksanaan', 'tempat_pelaksanaan', 'nomer_ketum', 'url_proposal', 'spj', 'url_spj', 'berkas_dukung', 'url_bd', 'lpj', 'url_lpj', 'keterangan_wd3', 'keterangan_keuangan', 'keterangan_akademik', 'keterangan_spj' ,'dana_disetujui', 'status'],
    include: [{
      model: Users,
      attributes: ['username', 'email']
    }],
    where: {
      status: 'Selesai',
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
      nomer_ketum: row.nomer_ketum,
      dana_disetujui: row.dana_disetujui,
      keterangan_wd3: row.keterangan_wd3,
      keterangan_keuangan: row.keterangan_keuangan,
      keterangan_spj: row.keterangan_spj,
      keterangan_akademik: row.keterangan_akademik,
      url_proposal: row.url_proposal,
      url_spj: row.url_spj,
      url_bd: row.url_bd,
      url_lpj: row.url_lpj,
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
      { v: "Nomer Ketua Umum", t: "s", s: { font: { name: "Times New Roman", sz: 12, bold: true }, alignment: { wrapText: false, vertical: "center", horizontal: "center" } } },
      { v: "Dana ACC", t: "s", s: { font: { name: "Times New Roman", sz: 12, bold: true }, alignment: { wrapText: false, vertical: "center", horizontal: "center" } } },
      { v: "Keterangan Wakil Dekan III", t: "s", s: { font: { name: "Times New Roman", sz: 12, bold: true }, alignment: { wrapText: false, vertical: "center", horizontal: "center" } } },
      { v: "Keterangan Pengajuan Dana", t: "s", s: { font: { name: "Times New Roman", sz: 12, bold: true }, alignment: { wrapText: false, vertical: "center", horizontal: "center" } } },
      { v: "Keterangan Surat Pertanggung Jawaban", t: "s", s: { font: { name: "Times New Roman", sz: 12, bold: true }, alignment: { wrapText: false, vertical: "center", horizontal: "center" } } },
      { v: "Keterangan Akademik", t: "s", s: { font: { name: "Times New Roman", sz: 12, bold: true }, alignment: { wrapText: false, vertical: "center", horizontal: "center" } } },
      { v: "Proposal", t: "s", s: { font: { name: "Times New Roman", sz: 12, bold: true }, alignment: { wrapText: false, vertical: "center", horizontal: "center" } } },
      { v: "Surat Pertanggung Jawaban", t: "s", s: { font: { name: "Times New Roman", sz: 12, bold: true }, alignment: { wrapText: false, vertical: "center", horizontal: "center" } } },
      { v: "Berkas Surat Pertanggung Jawaban", t: "s", s: { font: { name: "Times New Roman", sz: 12, bold: true }, alignment: { wrapText: false, vertical: "center", horizontal: "center" } } },
      { v: "Laporan Pertanggung Jawaban", t: "s", s: { font: { name: "Times New Roman", sz: 12, bold: true }, alignment: { wrapText: false, vertical: "center", horizontal: "center" } } },

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
    const width_col7 = rows.reduce((w, r) => Math.max(w, r.tempat_pelaksanaan.length), 25);
    const width_col8 = rows.reduce((w, r) => Math.max(w, r.tempat_pelaksanaan.length), 25);
    const width_col9 = rows.reduce((w, r) => Math.max(w, r.tempat_pelaksanaan.length), 40);
    const width_col10 = rows.reduce((w, r) => Math.max(w, r.tempat_pelaksanaan.length), 40);
    const width_col11 = rows.reduce((w, r) => Math.max(w, r.tempat_pelaksanaan.length), 40);
    const width_col12 = rows.reduce((w, r) => Math.max(w, r.tempat_pelaksanaan.length), 40);
    const width_col13 = rows.reduce((w, r) => Math.max(w, r.tempat_pelaksanaan.length), 40);
    const width_col14 = rows.reduce((w, r) => Math.max(w, r.tempat_pelaksanaan.length), 40);
    const width_col15 = rows.reduce((w, r) => Math.max(w, r.tempat_pelaksanaan.length), 40);
    const width_col16 = rows.reduce((w, r) => Math.max(w, r.tempat_pelaksanaan.length), 40);
    const width_col17 = rows.reduce((w, r) => Math.max(w, r.tempat_pelaksanaan.length), 40);

    workSheet["!cols"] = [{ wch: width_col1 },
    { wch: width_col2 },
    { wch: width_col3 },
    { wch: width_col4 },
    { wch: width_col5 },
    { wch: width_col6 },
    { wch: width_col7 },
    { wch: width_col8 },
    { wch: width_col9 },
    { wch: width_col10 },
    { wch: width_col11 },
    { wch: width_col12 },
    { wch: width_col13 },
    { wch: width_col14 },
    { wch: width_col15 },
    { wch: width_col16 },
    { wch: width_col17 },
    ];

    workSheet["!rows"] = [
      { hpx: 20 }
    ]

    const merge = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } },
    ];

    workSheet["!merges"] = merge;

    XLSX.writeFile(workBook,`DATA EXPORT ${req.query.startdate} sampai ${req.query.enddate}.xlsx`, { compression: true });

    res.status(200).json({ msg: "Export Data successfuly" });
  } catch (error) {
    console.log(error);
  }
}