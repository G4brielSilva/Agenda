const express = require('express');
const routes = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

// Home Routes
routes.get('/index', homeController.index);

// Login Routes
routes.get('/login/index', loginController.index);

exports.routes =  routes;