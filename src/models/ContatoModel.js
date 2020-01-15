const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  telefone: { type: String, required: false, default: '' },
  criadoEm: { type: Date, default: Date.now}
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

// Treinando funções construtoras
function Contato(body){
  this.body = body;
  this.errors = [];
  this.contato = null;
}
// Registrando
Contato.prototype.register = async function(){
  this.valida();
  if (this.errors.length > 0) return;
  this.contato = await ContatoModel.create(this.body);
}
// Editando
Contato.prototype.edit = async function(id){
  if (typeof id !== 'string') return;
  this.valida();
  if (this.errors.length > 0) return;
  this.contato = await ContatoModel.findOneAndUpdate(id, this.body), {new: true};
}
// Validação Function
Contato.prototype.valida = function(){
  this.cleanUp()
  // Email ser valido
  if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email Inválido');
  // A senha deve ter 6 a 20
  if (!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
  // Deve ter pelo menos 1 contato, email ou telefone
  if(!this.body.email && !this.body.telefone) {
    this.errors.push('Pelo menos um contato deve ser enviado: Email ou Telefone.');
  }
}
// Verifica Corpo String Function
Contato.prototype.cleanUp = function(){
  // Tendo a certeza que todo corpo é uma string.
  for (const key in this.body) {
    if (typeof this.body[key] != 'string'){
      this.body[key] = '';
    } 
  }
  // Confirmação do email e password
  this.body = {
    nome: this.body.nome,
    sobrenome: this.body.sobrenome,
    email: this.body.email,
    telefone: this.body.telefone
  }
}
// Métodos Estásticos
Contato.buscaPorId = async function(id) {
  if (typeof id !== 'string') return;
  const contato = await ContatoModel.findById(id);
  return contato._doc;
}
Contato.buscaContatos = async function(){
  const contatos = await ContatoModel.find()
    .sort({criadoEm: -1});

  let a = [];
  contatos.map(item=>{
    a.push({
      nome: item.nome,
      sobrenome: item.sobrenome,
      email: item.email,
      telefone: item.telefone,
      _id: item._id
    })
  });
  return a;
}
Contato.delete = async function(id){
  if (typeof id !== 'string') return; 
  const contato = await ContatoModel.findOneAndDelete({_id:id});
  return contato;

}
// Export
module.exports = Contato;
