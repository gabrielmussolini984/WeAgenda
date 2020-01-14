const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body){
    this.body = body; 
    this.errors = [];
    this.user = null;
  }
  // Verificações para a inserção.
  async register(){
    this.valida(); // Chamando a validação.
    if (this.errors.length > 0) return; 
    
    
    await this.existeUsuario();     // Verificando se ja existe registro.
    if (this.errors.length > 0) return;
    
    // Tornando a senha em hash
    const salt = bcryptjs.genSaltSync();
    this.body.password  = bcryptjs.hashSync(this.body.password, salt);
    try {
      // Gravando no banco
      this.user = await LoginModel.create(this.body);  
    } catch (error) {
      console.log(error);
    }
  }
  valida(){
    this.cleanUp()
    // Email ser valido
    if (!validator.isEmail(this.body.email)) this.errors.push('Email Inválido');
    // A senha deve ter 6 a 20
    if (this.body.password.length < 6 || this.body.password.length > 20) this.errors.push('A senha precisa ter entre 6 e 20 caracteres');
  }
  cleanUp(){
    // Tendo a certeza que todo corpo é uma string.
    for (const key in this.body) {
      if (typeof this.body[key] != 'string'){
        this.body[key] = '';
      } 
    }
    // Confirmação do email e password
    this.body = {
      email: this.body.email,
      password: this.body.password
    };
  }
  async existeUsuario(){
    const user = await LoginModel.findOne({email: this.body.email});
    if (user){
      this.errors.push('Email ja cadastrado em nossa base de dados!');
    }
  }
}

module.exports = Login;
