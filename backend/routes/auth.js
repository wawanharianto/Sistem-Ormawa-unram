import express from "express";
import {Login, Logout, getcurrentloginUser} from "../controllers/Auth_services.js";

const Authroute = express.Router();

Authroute.get('/currentusers', getcurrentloginUser);
Authroute.post('/login', Login);
Authroute.delete('/logout', Logout);

export default Authroute;