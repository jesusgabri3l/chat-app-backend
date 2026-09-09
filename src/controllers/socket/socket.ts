import type { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import { googleAuth } from '../auth/googleAuth';
import { addMessage, checkUser } from '../firebase/firebase';
import type { ChatMessage } from '../firebase/firebase';

export const registerSocketHandlers = (server: HttpServer) => {
  const io = new Server(server, {
    cors: { origin: process.env.CLIENT_ORIGIN, methods: ['GET', 'POST'] },
  });

  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    const payload = await googleAuth(token);
    if (!payload || !payload.sub || !payload.email) {
      next(new Error('invalid credentials'));
      return;
    }
    await checkUser({
      googleId: payload.sub,
      givenName: payload.given_name ?? '',
      email: payload.email,
    });
    next();
  });

  io.on('connection', (socket) => {
    socket.on('newMessage', async (newMessage: ChatMessage) => {
      await addMessage(newMessage);
      socket.broadcast.emit('hasANewMessage', newMessage);
    });
  });

  return io;
};
