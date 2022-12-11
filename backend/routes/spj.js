import express from "express";
import { updateBD, updateSpj } from "../controllers/SPJ.js";
import { verifyUser } from "../middleware/AuthUser.js";

const Spjroute = express.Router();

Spjroute.patch('/spj/berkasdukung/:id', verifyUser, updateBD);
Spjroute.patch('/spj/:id', verifyUser, updateSpj);

export default Spjroute;