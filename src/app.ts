import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import messagesRouter from './routes/messagesRouter';

export const app = express();
export const httpServer = createServer(app);

app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());

app.use('/api/messages', messagesRouter);
