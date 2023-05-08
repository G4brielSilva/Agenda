require('dotenv').config();

const express = require("express");
const app = express();

const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit('ready');
    });

const routes = require('./routes')
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const { globalInfoMiddleware, checkCsrfError, csrfMiddleware } = require("./src/middlewares/middleware");


app.use(helmet());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'abracadabra',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(globalInfoMiddleware);
app.use(routes.routes);

app.on('ready', () => {
    app.listen(3030, () => {
        console.log('Server Running on port: 3030');
    });
});
