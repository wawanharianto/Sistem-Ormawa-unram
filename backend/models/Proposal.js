import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Proposal = db.define('tb_proposal', {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  nama_kegiatan: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  nama_organisasi: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  jumlah_dana: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  ketua_panitia: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  nomer_ketupat: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  tanggal_pelaksanaan: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  tempat_pelaksanaan: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  nomer_ketum: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  proposal: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  url_proposal: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  spj: {
    type: DataTypes.STRING,
  },
  url_spj: {
    type: DataTypes.STRING,
  },
  keterangan_spj: {
    type: DataTypes.TEXT,
  },
  keterangan_wd3: {
    type: DataTypes.TEXT,
  },
  berkas_dukung: {
    type: DataTypes.STRING,
  },
  url_bd: {
    type: DataTypes.STRING,
  },
  lpj: {
    type: DataTypes.STRING,
  },
  url_lpj: {
    type: DataTypes.STRING,
  },
  keterangan_keuangan: {
    type: DataTypes.TEXT,
  },
  keterangan_akademik: {
    type: DataTypes.TEXT,
  },
  dana_disetujui: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  }
}, {
  freezeTableName: true
});

Users.hasMany(Proposal);
Proposal.belongsTo(Users, {foreignKey: 'userId'});

export default Proposal;
