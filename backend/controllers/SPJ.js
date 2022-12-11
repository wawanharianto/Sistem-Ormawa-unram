import path from "path";
import fs from "fs";
import { Op } from "sequelize";
import Proposal from "../models/Proposal.js";

export const updateSpj = async (req, res) => {
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
  const url = `${req.protocol}://${req.get("host")}/spj/${fileName}`;
  const allowedType = ['.pdf', '.docx'];

  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid File" });
  if (fileSize > 5000000) return res.status(422).json({ msg: "Spj must be less than 5 MB" });

  file.mv(`./spjData/spj/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      if (req.role === "admin") {
        await Proposal.update({
          spj: fileName,
          url_spj: url
        }, {
          where: {
            id: proposal.id
          }
        });
      } else {
        if (req.userId !== proposal.userId) return res.status(403).json({ msg: "Akses terlarang" });
        await Proposal.update({
          spj: fileName,
          url_spj: url
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


export const updateBD = async (req, res) => {
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
  const url = `${req.protocol}://${req.get("host")}/berkasDukung/${fileName}`;
  const allowedType = ['.zip', '.rar'];

  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid File" });
  if (fileSize > 5000000) return res.status(422).json({ msg: "Berkas must be less than 5 MB" });


  file.mv(`./spjData/berkasDukung/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      if (req.role === "admin") {
        await Proposal.update({
          berkas_dukung: fileName,
          url_bd: url
        }, {
          where: {
            id: proposal.id
          }
        });
      } else {
        if (req.userId !== proposal.userId) return res.status(403).json({ msg: "Akses terlarang" });
        await Proposal.update({
          berkas_dukung: fileName,
          url_bd: url
        }, {
          where: {
            [Op.and]: [{ id: proposal.id }, { userId: req.userId }]
          }
        });
      }
      res.status(200).json({ msg: "Berkas update successfuly" });
    } catch (error) {
      console.log(error);
    }
  });


}