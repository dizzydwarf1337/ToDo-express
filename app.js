import express, { json, urlencoded } from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import logger from 'morgan';
import { config } from 'dotenv';
import tasksRouter from './routes/tasksRoutes.js';
import authRouter from './routes/authRoutes.js';
import usersRouter from './routes/userRoutes.js';

import { errorHandler } from './middleware/errorHandler.js';
import { apiHandler } from './middleware/apiHandler.js';
import { verifyToken } from "./middleware/authMiddleware.js";

config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));


app.use(express.static(join(__dirname, 'public')));

app.use('/tasks', verifyToken, tasksRouter);
app.use('/auth', authRouter);
app.use('/users', verifyToken, usersRouter);

app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

app.use(apiHandler);
app.use(errorHandler);

export default app;
