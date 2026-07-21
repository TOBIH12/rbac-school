import './types';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersV1 from './routes/v1/userRoutes';
import postsV1 from './routes/v1/postsRoutes';
import { errorHandler, notFound } from './middleware/errorMiddleware';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/edu/users', usersV1);
app.use('/api/edu/posts', postsV1);

app.use(notFound);
app.use(errorHandler);

export default app;
