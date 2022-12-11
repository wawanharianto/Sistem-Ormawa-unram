import { Sequelize } from "sequelize";

const db = new Sequelize('db_ormawa', 'root', '', {
  host: "localhost",
  dialect: "mysql"
});

export default db;