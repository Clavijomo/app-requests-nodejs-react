import dotenv from 'dotenv';
import express from 'express';
import { ConnectMongoDB } from './config/db.js';
import signUp from './routes/signUp.js';
import loginUser from './routes/login.js';
import requestRoutes from './routes/request.js';
import { corsMiddleware } from './middlewares/cors.js';

dotenv.config();

const app = express();
app.use(corsMiddleware());
app.use(express.json())
const PORT = process.env.PORT ?? 3000;

ConnectMongoDB();

app.use('/api/signup', signUp);
app.use('/api/login', loginUser)
app.use('/api/requests', requestRoutes);

app.listen(PORT, () => {
    console.log(`Success http://localhost:${PORT}`);
});