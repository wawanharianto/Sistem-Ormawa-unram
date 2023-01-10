import Proposal from "../models/Proposal.js";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";

export const updateLpj = async (req, res) => {
  const proposal = await Proposal.findOne({
    where: {
      uuid: req.params.id
    }
  });

  if (!proposal) return res.status(404).json({ msg: "Data tidak ditemukan" });

  if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/lpj/${fileName}`;
  const allowedType = ['.pdf', '.docx'];

  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid File" });
  if (fileSize > 5000000) return res.status(422).json({ msg: "Proposal must be less than 5 MB" });

  const { status } = req.body;
 
  file.mv(`./lpjData/lpj/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      if (req.role === "admin" || req.role === "adminAkademik") {
        await Proposal.update({
          lpj: fileName,
          url_lpj: url,
          status: status
        }, {
          where: {
            id: proposal.id
          }
        });
      } else {
        if (req.userId !== proposal.userId) return res.status(403).json({ msg: "Akses terlarang" });
        await Proposal.update({
          lpj: fileName,
          url_lpj: url
        }, {
          where: {
            [Op.and]: [{ id: proposal.id }, { userId: req.userId }]
          }
        });
      }
      res.status(200).json({ msg: "Spj update successfuly" });
    } catch (error) {
      console.log(error);
    }
  });

}
export const revisiLpj = async (req, res) => {
  const proposal = await Proposal.findOne({
    where: {
      uuid: req.params.id
    }
  });

  if (!proposal) return res.status(404).json({ msg: "Data tidak ditemukan" });

  if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/lpj/${fileName}`;
  const allowedType = ['.pdf', '.docx'];

  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid File" });
  if (fileSize > 5000000) return res.status(422).json({ msg: "Proposal must be less than 5 MB" });

  file.mv(`./lpjData/lpj/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      if (req.role === "admin" || req.role === "adminAkademik") {
        await Proposal.update({
          lpj: fileName,
          url_lpj: url
        }, {
          where: {
            id: proposal.id
          }
        });
      } else {
        if (req.userId !== proposal.userId) return res.status(403).json({ msg: "Akses terlarang" });
        await Proposal.update({
          lpj: fileName,
          url_lpj: url
        }, {
          where: {
            [Op.and]: [{ id: proposal.id }, { userId: req.userId }]
          }
        });
      }
      res.status(200).json({ msg: "Spj update successfuly" });
    } catch (error) {
      console.log(error);
    }
  });

}

export const updateKeteranganAkademik = async (req, res) => {
  const proposal = await Proposal.findOne({
    where: {
      uuid: req.params.id
    }
  });

  if (!proposal) return res.status(404).json({ msg: "Data tidak ditemukan" });

  const { keterangan_akademik } = req.body;

  try {
    await Proposal.update({
      keterangan_akademik: keterangan_akademik,
    }, {
      where: {
        id: proposal.id
      }
    }),
    res.status(200).json({ msg: "update berhasil "});
  } catch (error) {
    console.log(error);
  }
}