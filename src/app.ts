const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const { createServer } = require('http');

dotenv.config({
  path: '.env'
});

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

//ROUTES//
const messagesRouter = require('./routes/messagesRouter');
app.use('/api/messages', messagesRouter);

((port = process.env.PORT || 5000) => {
  httpServer.listen(port, () => console.log(`🚀 Server running on port ${port}`));
})();

module.exports = {express, httpServer};
require('./controllers/socket/socket');