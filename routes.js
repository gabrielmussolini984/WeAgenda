const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');
const {loginRequired} = require('./src/middlewares/middleware');


// Rotas da home
route.get('/', homeController.home);

// Rotas de login
route.get('/login',loginController.index);
route.post('/login/register',loginController.register);
route.post('/login/entrar', loginController.entrar);
route.get('/login/sair', loginController.sair);

// Rotas de Contato
route.get('/contato', loginRequired, contatoController.index);
route.post('/contato/register', loginRequired, contatoController.register);
route.get('/contato/index/:id', loginRequired, contatoController.editIndex);
route.post('/contato/edit/:id', loginRequired, contatoController.edit);


module.exports = route;
