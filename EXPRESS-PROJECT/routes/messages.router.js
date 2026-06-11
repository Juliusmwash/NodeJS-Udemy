const express = require('express');

const messagesController = require('../controllers/messages.controller');

const messagesRouter = express.Router();

messagesRouter.use((req, res, next) => {
    console.log('messages router, ip address: ', req.ip);
    next();
    console.log('messages router done');
})

messagesRouter.get('/', messagesController.getMessages);
messagesRouter.post('/', messagesController.postMessage);

module.exports = messagesRouter;