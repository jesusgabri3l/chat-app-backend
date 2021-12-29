const {httpServer: server} = require('../../app');
const { googleAuth: googleAuthMiddleware } = require('../auth/googleAuth');
const {addMessage : addNewMessage} = require('../firebase/firebase.ts');

const io = require('socket.io')(server, {
  cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] },
});
// -- AUTH MIDDLEWARE --
io.use(async (socket: any, next: any) => {
  const token = socket.handshake.auth.token;
  const response = await googleAuthMiddleware(token);
  if (response) next();
  else next(new Error('invalid credentials'));
});

io.on('connection', (socket: any) => {
  socket.on('newMessage', async (newMessage: any) => {
    await addNewMessage(newMessage);
    socket.broadcast.emit('hasANewMessage', newMessage);
  });
});
