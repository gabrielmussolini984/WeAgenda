import validator from 'validator'
export default class Login {
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
    const passwordInput = el.querySelector('input[name="password"]');
    let erros = false;
    if (!validator.isEmail(emailInput.value)){
      alert('Email Invalido');
      erros = true;
    }
    if (passwordInput.value.length < 6 || passwordInput.value.length > 20 ){
      alert('Senha deve ter mais que 6 caracteres e menos que 20');
      erros = true;
    }
    if (!erros) el.submit();
  }
  
}