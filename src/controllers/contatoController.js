const Contato = require('../model/ContatoModel');

exports.index = (req, res) => {
    res.render('contato', {
        contato: {}
    });
}

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();

        if(contato.hasErrors()) {
            req.flash('errors', contato.getErrors());
            req.session.save(() => {
                res.redirect('/contato');
            });
            return;
        }

        req.flash('success', 'Contato registrado com sucesso!');
        req.session.save(() => {
            res.redirect(`/contato/${contato.contato._id}`);
        });
    } catch(err) {
        res.render('404');
    }
}

exports.editIndex = async (req, res) => {
    if(!req.params.id) return res.render('404');

    const contato = await Contato.getById(req.params.id);

    if(!contato) return res.render('404');

    res.render('contato', { contato });
}

exports.edit = async (req, res) => {
    try {
        if(!req.params.id) return res.render('404');

        const contato = new Contato(req.body);
        await contato.edit(req.params.id);

        if(contato.hasErrors()) {
            req.flash('errors', contato.getErrors());
            req.session.save(() => {
                
                res.redirect(`/`);
            });
            return;
        }
        
        req.flash('success', 'Contato alterado com sucesso!');
        req.session.save(() => {
            res.redirect(`/contato/${contato.contato._id}`);
        });
        return;
    } catch (err) {
        console.log(err);
        res.render('404');
    }
}