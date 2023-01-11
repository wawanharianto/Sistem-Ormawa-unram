import express from "express";
import { updateBD, updateSpj, updateKeteranganSpj, revisiSpj, revisiBerkas } from "../controllers/SPJ.js";
import { verifyUser } from "../middleware/AuthUser.js";

const Spjroute = express.Router();

Spjroute.patch('/spj/berkasdukung/:id', verifyUser, updateBD);
Spjroute.patch('/spj/berkasdukung/revisi/:id', verifyUser, revisiBerkas);
Spjroute.patch('/spj/:id', verifyUser, updateSpj);
Spjroute.patch('/spj/revisi/:id', verifyUser, revisiSpj);
Spjroute.patch('/spj/ketspj/:id', verifyUser, updateKeteranganSpj);

export default Spjroute;