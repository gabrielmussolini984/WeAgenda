const Contato = require('../models/ContatoModel');

exports.home = async(req, res) => {
  const contatos = await Contato.buscaContatos();
  res.render('home', {contatos});
  return;
};
