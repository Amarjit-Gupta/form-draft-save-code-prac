import express from 'express';
import cors from 'cors';
import "dotenv/config.js";
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authroute from './route/authRoute.js';
import dataRoute from './route/dataRoute.js';

const app = express();

const port = process.env.PORT || 5000;

app.use(cors({
    origin:"*",
    credentials:true
}));

app.use(express.json());

app.use(cookieParser());

connectDB();

app.use("/auth",authroute);

app.use("/data",dataRoute);

app.get("/test",(req,res)=>{
    return res.status(200).json({mesage:"API Working"});
});

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});