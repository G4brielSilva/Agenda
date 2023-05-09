const express = require('express');
const routes = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const registerController = require('./src/controllers/registerController');
const authController = require('./src/controllers/authController');
const contatoController = require('./src/controllers/contatoController');

const { loginRequired } = require('./src/middlewares/middleware');

// Home Routes
routes.get('/', homeController.index);

// Entering Routes
routes.get('/auth', authController.index);

// Register Routes
routes.post('/auth/register', registerController.index);

// Login Routes
routes.post('/auth/login', loginController.index);
routes.get('/auth/logout', loginController.logout);

// Contato Routes
routes.get('/contato', loginRequired, contatoController.index);
routes.post('/contato/register', loginRequired, contatoController.register);
routes.get('/contato/:id', loginRequired, contatoController.editIndex);
routes.post('/contato/edit/:id', loginRequired, contatoController.edit);
routes.get('/contato/delete/:id', loginRequired, contatoController.delete);

exports.routes =  routes;