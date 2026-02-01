import express from 'express';

import checkAuth from '../middleware/authMiddleWare.js';
import { getDraft, saveDraft, submitForm } from '../controller/dataController.js';

const dataRoute = express.Router();

dataRoute.post("/draft",checkAuth,saveDraft); // save draft
dataRoute.get("/getDraft",checkAuth,getDraft); // getdraft
dataRoute.post("/finalSubmit",checkAuth,submitForm); // getdraft

export default dataRoute;
