import {Response, Request} from 'express';
const { getMessages: getAllMessagesHandler } = require('./firebase/firebase');

const getAllMessages = async (req: Request, res: Response) => {
    if (res.statusCode === 403) res.send('Invalid credentials'); return;
    const messages = await getAllMessagesHandler();
    if(messages) res.send(messages);
    else res.status(500);
};

module.exports = { getAllMessages };