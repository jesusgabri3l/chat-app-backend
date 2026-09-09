import { Router } from 'express';
import type { NextFunction, Request, Response } from 'express';
import { getAllMessages } from '../controllers/messagesController';
import { googleAuth } from '../controllers/auth/googleAuth';

const router = Router();

const requireGoogleAuth = async (req: Request, res: Response, next: NextFunction) => {
  const payload = await googleAuth(req.headers.authorization ?? '');
  if (payload) next();
  else res.status(403).send('Invalid credentials');
};

router.use(requireGoogleAuth);
router.get('/', getAllMessages);

export default router;
