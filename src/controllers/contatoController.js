const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
  res.render('contato',{contato: ''})
  return;
};
exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();
    if (contato.errors.length > 0){
      req.flash('errors',contato.errors);
      req.session.save(()=> res.redirect('back'));
      return;
    }
    req.flash('success', 'Contato cadastrado com sucesso!');
    req.session.save(()=> res.redirect('back'));
    return;  
  } catch (error) {
    console.log(error);
    res.render('404');
    return;
  }
};
exports.editIndex = async (req,res)=>{
  if (!req.params.id) return res.render('404');
  const contato = await Contato.buscaPorId(req.params.id);
  if (!contato) return res.render('404');
  res.render('contato',{contato});
}
exports.edit = async(req,res)=>{
  const contato = new Contato(req.body);
  try {   
    if (!req.params.id) return res.render('404');
    await contato.edit(req.params.id);
    if (contato.errors.length > 0){
      req.flash('errors',contato.errors);
      req.session.save(()=> res.redirect('back'));
      return;
    }
    req.flash('success', 'Contato editado com sucesso!');
    req.session.save(()=> res.redirect(`/contato/index/${contato.contato.id}`));
    return;  
  } catch (error) {
    console.log(error);
    res.render('404');
    return;
  }
}
exports.delete = async(req,res)=>{
  if (!req.params.id) return res.render('404');
  const contato = await Contato.delete(req.params.id);
  if (!contato) return res.render('404');
  req.flash('success', 'Contato Apagado com sucesso!');
  req.session.save(()=> res.redirect('back'));
}