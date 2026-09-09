import type { Request, Response } from 'express';
import { getMessages } from './firebase/firebase';

export const getAllMessages = async (_req: Request, res: Response) => {
  const messages = await getMessages();
  if (messages) res.send(messages);
  else res.status(500).send('Could not load messages');
};
