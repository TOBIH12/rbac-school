import './types.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression'
import usersV1 from './routes/v1/userRoutes.js';
import postsV1 from './routes/v1/postsRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://rbac-school.vercel.app'); // Replace with frontend URL
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(cors({origin: 'https://rbac-school.vercel.app', credentials: true})); // Allow CORS for the frontend app
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/edu/users', usersV1);
app.use('/api/edu/posts', postsV1);

app.use(notFound);
app.use(errorHandler);

export default app;
