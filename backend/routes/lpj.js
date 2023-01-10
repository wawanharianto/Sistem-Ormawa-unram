import express from "express";
import { updateLpj,revisiLpj ,updateKeteranganAkademik } from "../controllers/Lpj.js";
import { verifyUser } from "../middleware/AuthUser.js";

const Lpjroute = express.Router();

Lpjroute.patch('/lpj/:id', verifyUser, updateLpj);
Lpjroute.patch('/lpj/revisi/:id', verifyUser, revisiLpj);
Lpjroute.patch('/lpj/akademik/:id', verifyUser, updateKeteranganAkademik);

export default Lpjroute;