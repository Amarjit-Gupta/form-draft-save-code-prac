import express from 'express';
import { isauth, login, logout, signup } from '../controller/authController.js';
import checkAuth from '../middleware/authMiddleWare.js';

const authroute = express.Router();

authroute.post("/signup",signup);
authroute.post("/login",login);
authroute.get("/isAuth",checkAuth,isauth);
authroute.post("/logout",logout);

export default authroute;
