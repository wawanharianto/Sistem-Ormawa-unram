import Proposal from "../models/Proposal.js";
import Users from "../models/UserModel.js";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";
import _ from "underscore";

export const getProposal = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const status = req.query.status || [''];
    const offset = limit * page;
    try {
        let totalStatus;
        if (req.role === "admin" || req.role === "WD3" || req.role === "adminAkademik" || req.role === "adminKeuangan") {
            totalStatus = await Proposal.count({
                where: {
                    status: "Selesai"
                }
            })
        } else {
            totalStatus = await Proposal.count({
                where: {
                    userId: req.userId,
                    status: !"Selesai"
                }
            })
        }
        //GET TOTAL ROWS
        let totalRows;
        if (req.role === "admin" || req.role === "WD3" || req.role === "adminAkademik" || req.role === "adminKeuangan") {
            totalRows = await Proposal.count({
                [Op.or]: [{
                    nama_kegiatan: {
                        [Op.like]: '%' + search + '%'
                    }
                }, {
                    nama_organisasi: {
                        [Op.like]: '%' + search + '%'
                    }
                }]
            });

        } else {
            totalRows = await Proposal.count({
                where: {
                    userId: req.userId,
                    [Op.or]: [{
                        nama_kegiatan: {
                            [Op.like]: '%' + search + '%'
                        }
                    }, {
                        nama_organisasi: {
                            [Op.like]: '%' + search + '%'
                        }
                    }]
                }
            });
        }
        const totalPage = Math.ceil(totalRows / limit);

        //GET DATA
        let response;
        if (req.role === "admin" || req.role === "WD3" || req.role === "adminAkademik" || req.role === "adminKeuangan") {
            response = await Proposal.findAll({
                attributes: ['id', 'uuid', 'nama_kegiatan', 'nama_organisasi', 'jumlah_dana', 'ketua_panitia', 'nomer_ketupat', 'tanggal_pelaksanaan', 'tempat_pelaksanaan', 'nomer_ketum', 'url_proposal', 'spj', 'url_spj', 'berkas_dukung', 'url_bd', 'lpj', 'url_lpj', 'keterangan_wd3', 'keterangan_keuangan', 'keterangan_spj', 'keterangan_akademik', 'dana_disetujui', 'status'],
                where: {
                    [Op.and]: [{
                        status: status,
                    }],
                    [Op.or]: [{
                        nama_kegiatan: {
                            [Op.like]: '%' + search + '%'
                        }
                    }, {
                        nama_organisasi: {
                            [Op.like]: '%' + search + '%'
                        }
                    }]
                },
                include: [{
                    model: Users,
                    attributes: ['username', 'email']
                }],
                offset: offset,
                limit: limit,
                order: [
                    ['id', 'ASC']
                ]
            });
        } else {
            response = await Proposal.findAll({
                attributes: ['id', 'uuid', 'nama_kegiatan', 'nama_organisasi', 'jumlah_dana', 'ketua_panitia', 'nomer_ketupat', 'tanggal_pelaksanaan', 'tempat_pelaksanaan', 'nomer_ketum', 'url_proposal', 'spj', 'url_spj', 'berkas_dukung', 'url_bd', 'lpj', 'url_lpj', 'keterangan_wd3', 'keterangan_keuangan', 'keterangan_spj', 'keterangan_akademik', 'dana_disetujui', 'status'],
                where: {
                    userId: req.userId,
                    [Op.and]: [{
                        status: status,
                    }],
                    [Op.or]: [{
                        nama_kegiatan: {
                            [Op.like]: '%' + search + '%'
                        }
                    }, {
                        nama_organisasi: {
                            [Op.like]: '%' + search + '%'
                        }
                    }]
                },
                include: [{
                    model: Users,
                    attributes: ['username', 'email']
                }],
                offset: offset,
                limit: limit,
                order: [
                    ['id', 'ASC']
                ]
            });
        }
        res.status(200).json({
            result: response,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage,
            totalStatus: totalStatus
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getProposalArsip = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const sortby = req.query.sortby || "ASC";
    const offset = limit * page;
    try {
        //GET TOTAL ROWS
        let totalRows = await Proposal.count({
                where: {
                    status: 'Selesai',
                    [Op.or]: [{
                        nama_kegiatan: {
                            [Op.like]: '%' + search + '%'
                        }
                    }, {
                        nama_organisasi: {
                            [Op.like]: '%' + search + '%'
                        }
                    }]
                }
            });
        const totalPage = Math.ceil(totalRows / limit);

        //GET DATA
        let response;
        if (req.role === "admin" || req.role === "WD3" || req.role === "adminAkademik" || req.role === "adminKeuangan") {
            response = await Proposal.findAll({
                attributes: ['id', 'uuid', 'nama_kegiatan', 'nama_organisasi', 'jumlah_dana', 'ketua_panitia', 'nomer_ketupat', 'tanggal_pelaksanaan', 'tempat_pelaksanaan', 'nomer_ketum', 'url_proposal', 'spj', 'url_spj', 'berkas_dukung', 'url_bd', 'lpj', 'url_lpj', 'keterangan_wd3', 'keterangan_keuangan', 'keterangan_akademik', 'dana_disetujui', 'status'],
                where: {
                    status: 'Selesai',
                    [Op.or]: [{
                        nama_kegiatan: {
                            [Op.like]: '%' + search + '%'
                        }
                    }, {
                        nama_organisasi: {
                            [Op.like]: '%' + search + '%'
                        }
                    }]
                },
                include: [{
                    model: Users,
                    attributes: ['username', 'email']
                }],
                offset: offset,
                limit: limit,
                order: [
                    ['tanggal_pelaksanaan', sortby]
                ]
            });
        } else {
            res.status(403).json({ msg: 'Akses Dilarang' })
        }
        res.status(200).json({
            result: response,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage,
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getProposalView = async (req, res) => {
    try {
        let response = await Proposal.findAll({
            attributes: ['id', 'uuid', 'nama_kegiatan', 'nama_organisasi', 'jumlah_dana', 'ketua_panitia', 'nomer_ketupat', 'tanggal_pelaksanaan', 'tempat_pelaksanaan', 'nomer_ketum', 'url_proposal', 'spj', 'url_spj', 'berkas_dukung', 'url_bd', 'lpj', 'url_lpj', 'keterangan_wd3', 'keterangan_keuangan', 'keterangan_akademik', 'dana_disetujui', 'status'],
            include: [{
                model: Users,
                attributes: ['username', 'email']
            }]
        });
        res.status(200).json({ result: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getProposalbyId = async (req, res) => {
    try {
        const proposal = await Proposal.findOne({
            where: {
                uuid: req.params.uuid
            }
        });
        if (!proposal) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        if (req.role === "admin" || req.role === "WD3" || req.role === "adminAkademik" || req.role === "adminKeuangan") {
            response = await Proposal.findOne({
                attributes: ['uuid', 'nama_kegiatan', 'nama_organisasi', 'jumlah_dana', 'ketua_panitia', 'nomer_ketupat', 'tanggal_pelaksanaan', 'tempat_pelaksanaan', 'nomer_ketum', 'proposal', 'url_proposal', 'spj', 'url_spj', 'berkas_dukung', 'url_bd', 'lpj', 'url_lpj', 'keterangan_wd3', 'keterangan_keuangan', 'keterangan_spj', 'keterangan_akademik', 'dana_disetujui', 'status'],
                where: {
                    id: proposal.id
                },
                include: [{
                    model: Users,
                    attributes: ['username', 'email']
                }]
            });
        } else {
            response = await Proposal.findOne({
                attributes: ['uuid', 'nama_kegiatan', 'nama_organisasi', 'jumlah_dana', 'ketua_panitia', 'nomer_ketupat', 'tanggal_pelaksanaan', 'tempat_pelaksanaan', 'nomer_ketum', 'url_proposal', 'spj', 'url_spj', 'berkas_dukung', 'url_bd', 'lpj', 'url_lpj', 'keterangan_wd3', 'keterangan_keuangan', 'keterangan_spj', 'keterangan_akademik', 'dana_disetujui', 'status'],
                where: {
                    [Op.and]: [{ id: proposal.id }, { userId: req.userId }]
                },
                include: [{
                    model: Users,
                    attributes: ['username', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createProposal = async (req, res) => {
    const { nama_kegiatan, nama_organisasi, jumlah_dana, ketua_panitia, nomer_ketupat, tanggal_pelaksanaan, tempat_pelaksanaan, nomer_ketum, status } = req.body;

    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/proposal/${fileName}`;
    const allowedType = ['.pdf', '.docx'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid File" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "File proposal must be less than 5 MB" });

    file.mv(`./proposalData/proposal/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Proposal.create({
                nama_kegiatan: nama_kegiatan,
                nama_organisasi: nama_organisasi,
                jumlah_dana: jumlah_dana,
                ketua_panitia: ketua_panitia,
                nomer_ketupat: nomer_ketupat,
                tanggal_pelaksanaan: new Date(tanggal_pelaksanaan),
                tempat_pelaksanaan: tempat_pelaksanaan,
                nomer_ketum: nomer_ketum,
                proposal: fileName,
                url_proposal: url,
                status: status,
                userId: req.userId
            });
            res.json({ msg: "Upload Data Berhasil" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    })
}

export const updateProposal = async (req, res) => {
    const proposal = await Proposal.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if (!proposal) return res.status(404).json({ msg: "Data tidak ditemukan" });

    const { nama_kegiatan, nama_organisasi, jumlah_dana, ketua_panitia, nomer_ketupat, tanggal_pelaksanaan, tempat_pelaksanaan, nomer_ketum } = req.body;

    let fileName = "";
    if (req.files === null) {
        fileName = proposal.proposal;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.pdf', '.docx'];

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid File" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "Proposal must be less than 5 MB" });

        const filepath = `./proposalData/proposal/${proposal.proposal}`;
        fs.unlinkSync(filepath);

        file.mv(`./proposalData/proposal/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }
    const url = `${req.protocol}://${req.get("host")}/proposal/${fileName}`;

    try {
        if (req.role === "admin" || req.role === "WD3" || req.role === "adminAkademik" || req.role === "adminKeuangan") {
            await Proposal.update({
                nama_kegiatan: nama_kegiatan,
                nama_organisasi: nama_organisasi,
                jumlah_dana: jumlah_dana,
                ketua_panitia: ketua_panitia,
                nomer_ketupat: nomer_ketupat,
                tanggal_pelaksanaan: new Date(tanggal_pelaksanaan),
                tempat_pelaksanaan: tempat_pelaksanaan,
                nomer_ketum: nomer_ketum,
                proposal: fileName,
                url_proposal: url
            }, {
                where: {
                    id: proposal.id
                }
            });
        } else {
            if (req.userId !== proposal.userId) return res.status(403).json({ msg: "Akses terlarang" });
            await Proposal.update({
                nama_kegiatan: nama_kegiatan,
                nama_organisasi: nama_organisasi,
                jumlah_dana: jumlah_dana,
                ketua_panitia: ketua_panitia,
                nomer_ketupat: nomer_ketupat,
                tanggal_pelaksanaan: new Date(tanggal_pelaksanaan),
                tempat_pelaksanaan: tempat_pelaksanaan,
                nomer_ketum: nomer_ketum,
                proposal: fileName,
                url_proposal: url
            }, {
                where: {
                    [Op.and]: [{ id: proposal.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Proposal updated successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}

export const deleteProposal = async (req, res) => {
    const proposal = await Proposal.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if (!proposal) return res.status(404).json({ msg: "Data tidak ditemukan" });
    try {
        const filepath = `./proposalData/proposal/${proposal.proposal}`;
        fs.unlinkSync(filepath);
        if (req.role === "admin") {
            await Proposal.destroy({
                where: {
                    id: proposal.id
                }
            });
        } else {
            if (req.userId !== proposal.userId) return res.status(403).json({ msg: "Akses terlarang" });
            await Proposal.destroy({
                where: {
                    [Op.and]: [{ id: proposal.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Proposal deleted successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}

export const deleteMultiple = async (req, res) => {
    const proposal = await Proposal.findAll({
        where: {
            id: req.body.id
        },
        attributes: ['proposal', 'spj', 'berkas_dukung', 'lpj'],
    })
    if (!proposal) return res.status(404).json({ msg: "Data tidak ditemukan" });


    try {


        var files = proposal
        var i = files.length;

        for (let index = 0; index < i; index++) {

            if (!proposal[index].spj && !proposal[index].lpj) {
                fs.unlinkSync(`./proposalData/proposal/${proposal[index].proposal}`);
            } else if (!proposal[index.lpj]) {
                fs.unlinkSync(`./proposalData/proposal/${proposal[index].proposal}`);
                fs.unlinkSync(`./spjData/spj/${proposal[index].spj}`);
                fs.unlinkSync(`./spjData/berkasDukung/${proposal[index].berkas_dukung}`);
            } else {
                fs.unlinkSync(`./proposalData/proposal/${proposal[index].proposal}`);
                fs.unlinkSync(`./spjData/spj/${proposal[index].spj}`);
                fs.unlinkSync(`./spjData/berkasDukung/${proposal[index].berkas_dukung}`);
                fs.unlinkSync(`./lpjData/lpj/${proposal[index].lpj}`);
            }

        }

        try {
            await Proposal.destroy({
                where: {
                    id: req.body.id
                }
            });
        } catch (error) {
            res.status(500).json({ msg: "Data belum dipilih" });
        }

        res.status(200).json({ msg: "Proposal deleted successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}

export const setStatus = async (req, res) => {
    const proposal = await Proposal.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if (!proposal) return res.status(404).json({ msg: "Data tidak ditemukan" });

    const { status } = req.body;

    try {
        await Proposal.update({
            status: status
        }, {
            where: {
                id: proposal.id
            }
        })
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateKeteranganWd3 = async (req, res) => {
    const proposal = await Proposal.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if (!proposal) return res.status(404).json({ msg: "Data tidak ditemukan" });

    const { keterangan_wd3, status } = req.body;

    try {
        await Proposal.update({
            keterangan_wd3: keterangan_wd3,
            status: status
        }, {
            where: {
                id: proposal.id
            }
        })
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateKeteranganKeuangan = async (req, res) => {
    const proposal = await Proposal.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if (!proposal) return res.status(404).json({ msg: "Data tidak ditemukan" });

    const { keterangan_keuangan, dana_disetujui, status } = req.body;

    try {
        await Proposal.update({
            keterangan_keuangan: keterangan_keuangan,
            dana_disetujui: dana_disetujui,
            status: status
        }, {
            where: {
                id: proposal.id
            }
        })
        res.status(200).json({ msg: "update berhasil " });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateRevisi = async (req, res) => {
    const proposal = await Proposal.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if (!proposal) return res.status(404).json({ msg: "Data tidak ditemukan" });

    let fileName = "";
    if (req.files === null) {
        fileName = proposal.proposal;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.pdf', '.docx'];

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid File" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "Proposal must be less than 5 MB" });

        const filepath = `./proposalData/proposal/${proposal.proposal}`;
        fs.unlinkSync(filepath);

        file.mv(`./proposalData/proposal/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }
    const url = `${req.protocol}://${req.get("host")}/proposal/${fileName}`;

    const { status } = req.body;

    try {
        if (req.role === "admin" || req.role === "WD3" || req.role === "adminAkademik" || req.role === "adminKeuangan") {
            await Proposal.update({
                proposal: fileName,
                url_proposal: url,
                status: status
            }, {
                where: {
                    id: proposal.id
                }
            });
        } else {
            if (req.userId !== proposal.userId) return res.status(403).json({ msg: "Akses terlarang" });
            await Proposal.update({
                proposal: fileName,
                url_proposal: url,
                status: status
            }, {
                where: {
                    [Op.and]: [{ id: proposal.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Proposal updated successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}