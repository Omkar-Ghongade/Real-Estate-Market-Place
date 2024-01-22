import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('DB is connected');
}).catch((err)=>{
    console.log(err);
});

const app=express();
app.use(express.json());

app.listen(9000,()=>{
    console.log('Server on port 9000');
});

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);

app.use((err,req,res,next)=>{
    const status=err.status||500;
    const message=err.message||"Internal Server Error";
    return res.status(status).json({
        success:false,
        status,
        message
    });
});