const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contatoController')
const express = require('express');
const routes = express.Router();

// function myMiddleware(req, res, next) {
//     req.session = { nome: 'Luiz', sobrenome: 'Miranda'};
//     next();
// }

routes.get('/', homeController.homePage);
routes.post('/', homeController.postData);
routes.get('/contato', contatoController.contatoPage);

exports.routes =  routes;

// route.get('/', (req, res) => {
//     res.send(`
//         <form action="/" method="POST"> 
//             Nome: <input type="text" name="nome">
//             <button>Send</button>
//         </form>
//     `);
// });