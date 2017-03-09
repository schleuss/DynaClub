let express = require('express');
let session = require('express-session');
let consign = require('consign');
let bodyParser = require('body-parser');
let path = require('path');
let morgan = require('morgan');
let logger = require('../app/services/logger.js');
let expressValidator = require('express-validator');
let app = express();

const secret = '3mG!pYBa8#5r1J6';

app.set('secret', secret);

app.use(morgan("dev", {
    stream: {
        write: log => {
            logger.debug(`MORGAN: ${log}`);
        }
    }
}));

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: false
    }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressValidator({
    customValidators: {
        isArray: function(value) {
            return Array.isArray(value);
        },
        gte: function(param, num) {
            return param >= num;
        },
        lte: function(param, num) {
            return param <= num;
        }
    }
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Expose-Headers", "x-access-token");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, X-XSRF-TOKEN, Authorization, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");

    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }

});

consign({
        cwd: 'app'
    })
    .include('models')
    .then('api')
    .then('routes/auth.js')
    .then('routes')
    .then('services')
    .into(app);

module.exports = app;