const express = require('express');
const routes = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const registerController = require('./src/controllers/registerController');
const authController = require('./src/controllers/authController');

// Home Routes
routes.get('/', homeController.index);

// Entering Routes
routes.get('/auth', authController.index);

// Register Routes
routes.post('/auth/register', registerController.index);

// Login Routes
routes.post('/auth/login', loginController.index);
routes.get('/auth/logout', loginController.logout);

exports.routes =  routes;