import express from "express";
import { getUsers,getUsersbyId ,createUser, updateUser, deleteUser} from "../controllers/User.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { adminOnly } from "../middleware/AuthUser.js";

const Userroute = express.Router();

Userroute.get('/users', adminOnly, getUsers);
Userroute.get('/users/:uuid', adminOnly, getUsersbyId);
Userroute.post('/users', createUser);
Userroute.patch('/users/:uuid', updateUser);
Userroute.delete('/users/:id', deleteUser);
Userroute.get('/token', refreshToken);


export default Userroute;