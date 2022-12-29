import express from "express";
import { updateBD, updateSpj, updateKeteranganSpj } from "../controllers/SPJ.js";
import { verifyUser } from "../middleware/AuthUser.js";

const Spjroute = express.Router();

Spjroute.patch('/spj/berkasdukung/:id', verifyUser, updateBD);
Spjroute.patch('/spj/:id', verifyUser, updateSpj);
Spjroute.patch('/spj/ketspj/:id', verifyUser, updateKeteranganSpj);

export default Spjroute;