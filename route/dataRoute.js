import express from 'express';

import checkAuth from '../middleware/authMiddleWare.js';
import { getDraft, saveDraft } from '../controller/dataController.js';

const dataRoute = express.Router();

dataRoute.post("/draft",checkAuth,saveDraft);
dataRoute.get("/getDraft",checkAuth,getDraft);

export default dataRoute;
