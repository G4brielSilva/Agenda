const Register = require('../model/RegisterModel')

exports.index = async (req, res) => {
    try {
        const register = new Register(req.body);
        await register.register();

        if(register.hasErrors()) {
            req.flash('errors', register.getErrors());
            req.session.save(function() {
                const backUrl = /*res.headers.referer ||*/ '/auth';
                return res.redirect(backUrl);
            });
            return;
        }

        req.flash('success', 'Usuário criado com sucesso');
        req.session.save(function() {
            const backUrl = /*res.headers.referer ||*/ '/auth';
            return res.redirect(backUrl);
        });
    }catch(err) {
        console.log(err);
        return res.render('404');
    }
};