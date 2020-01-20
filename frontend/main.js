import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modulos/Login';
const login = new Login('.form-login');
const register = new Login('.form-register');
login.init();
register.init();

import Contato from './modulos/Contato';
const contatoEdit = new Contato('.form-contato-edit');
const contatoRegistro = new Contato('.form-contato-registro');
contatoEdit.init();
contatoRegistro.init();

//import './assets/css/style.css';

console.log('Olá mundo 3');
