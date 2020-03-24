﻿const express = require('express');
const session = require('express-session');
const cors = require('cors');
const routers = require('./router');
const logger = require('./middlewares/logger');
const { SESSION_TIMEOUT } = require('./constants');

function appGenerator(sessionId) {
    const app = express();

    app.use(express.static('wwwroot'));
    app.use(cors());
    app.use(express.json());
    
    let sessionOptions = {
        secret: 'KDJSKLDJsjadkjasdjaidqiw',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: SESSION_TIMEOUT
        }
    };
    
    if (sessionId) {
        sessionOptions.genid = (req) => { return sessionId };
    }

    app.use(session(sessionOptions));

//app.use(logger());
    app.use(routers);
    return app;
}



module.exports = appGenerator;