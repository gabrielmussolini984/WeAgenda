const Login = require('../models/LoginModel');
exports.index = (req, res) => {
  if (!req.session.user){
    res.render('login');
    return;
  }
  res.render('painel-admnistrativo');
  
};
exports.register = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.register();
    if (login.errors.length > 0){
      req.flash('errors',login.errors);
      req.session.save(function(){
        return res.redirect('back');
      });
      return;
    }  
    req.flash('success', 'Seu usuario foi criado com sucesso!')
    req.session.save(function(){
      return res.redirect('back');
    });
  }catch (error) {
    console.log(error);
    return res.render('404');
  }
};
exports.entrar = async (req,res) => {
  const login = new Login(req.body);
  try {
    await login.entrar();
    if (login.errors.length > 0){
      req.flash('errors',login.errors);
      req.session.save(function(){
        return res.redirect('back');
      });
      return;
    }  
    req.flash('success', 'Você entrou no sistema!');
    req.session.user = login.user;
    req.session.save(function(){
      return res.redirect('back');
    });
  }catch (error) {
    console.log(error);
    return res.render('404');
  }  
}
exports.sair = async (req,res) => {
  if (req.session.user){
    //req.flash('success', 'Você acabou de encerrar sua sessão');
    req.session.destroy();
    res.redirect('back')
    return ;
  }
  res.render('404')
  return;
}
