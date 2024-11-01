import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();
const app = express();

//middlewares

const corsconfig = {
    origin: "https://projectchatai.vercel.app",
    credentials: true
}
app.use(cors(corsconfig));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
    
//remove at production
// app.use(morgan('dev'));

// app.get('/api/test', (req, res) => {
//     console.error("there is mistake");
//     res.status(200).json({message: "happy ga vundu mowa"});
// })

app.use('/api/v1', appRouter);


export default app;