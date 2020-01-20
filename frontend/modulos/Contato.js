import validator from 'validator'
export default class Contato {
  constructor(formClass){
    this.form = document.querySelector(formClass);
  }
  
  init(){
    this.events();
  }
  events(){
    if (!this.form) return;
    this.form.addEventListener('submit', e =>{
      e.preventDefault();
      this.validate(e);
    })
  }
  validate(e){
    const el = e.target;
    const emailInput = el.querySelector('input[name="email"]');
    const telefoneInput = el.querySelector('input[name="telefone"]');
    let erros = false;
    if (emailInput.value == '' && telefoneInput.value == ''){
      alert('Digite pelo menos um email ou um numero de telefone');
      erros = true;
    }
    if (emailInput.value != ''){
      if (!validator.isEmail(emailInput.value)){
        alert('Email Invalido');
        erros = true;
      }
    }
    /*
    if (passwordInput.value.length < 6 || passwordInput.value.length > 20 ){
      alert('Senha deve ter mais que 6 caracteres e menos que 20');
      erros = true;
    }*/
    if (!erros) el.submit();
  }
  
}