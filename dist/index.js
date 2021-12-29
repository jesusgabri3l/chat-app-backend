"use strict";
var dotenv = require('dotenv');
var express = require('express');
var cors = require('cors');
var createServer = require('http').createServer;
dotenv.config({
    path: '.env'
});
var app = express();
var httpServer = createServer(app);
app.use(cors());
app.use(express.json());
//ROUTES//
var messagesRouter = require('./routes/messagesRouter');
app.use('/api/messages', messagesRouter);
(function (port) {
    if (port === void 0) { port = process.env.PORT || 5000; }
    httpServer.listen(port, function () { return console.log("\uD83D\uDE80 Server running on port ".concat(port)); });
})();
module.exports = { express: express, httpServer: httpServer };
require('./controllers/socket/socket');
//# sourceMappingURL=index.js.map