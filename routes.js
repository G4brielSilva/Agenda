const express = require('express');
const routes = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const registerController = require('./src/controllers/registerController');
// Home Routes
routes.get('/', homeController.index);

// Login Routes
routes.get('/login/index', loginController.index);

// Register Routes
routes.post('/login/register', registerController.index);

exports.routes =  routes;