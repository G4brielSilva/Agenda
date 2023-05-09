const Contato = require('../model/ContatoModel');

exports.index = async (req, res) => {
    const contatos = await Contato.getContatos();
    res.render('index', { contatos });
}