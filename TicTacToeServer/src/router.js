﻿const router = require('express').Router();
const controller = require('./controller');
const appRoot = require('../app-root-path');

router.get('/', (req, res) => {
    if(appRoot)
        res.sendFile('/wwwroot/index.html', { root: appRoot });
    else
        res.send(200, appRoot);
});

router.get('/getFIeld', (req, res) => {
    res.status(200).send(controller.getField(req.sessionID));
});

router.post('/move', (req, res) => {
    const {x, y} = req.body;
    let err = controller.move(x, y, req.sessionID);
    if (err)
        res.status(400).send(err);
    else
        res.status(200).send();
});

module.exports = router;