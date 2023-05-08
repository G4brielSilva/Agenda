const Login = require('../model/LoginModel')

exports.index = async (req, res) => {
    const login = new Login(req.body);
    try {
        const login = new Login(req.body);
        await login.register();

        if(login.hasErrors()) {
            req.flash('errors', login.getErrors());
            req.session.save(function() {
                const backUrl = /*res.headers.referer ||*/ '/login/index';
                return res.redirect(backUrl);
            });
            return;
        }

        req.flash('success', 'Usuário criado com sucesso');
        req.session.save(function() {
            const backUrl = /*res.headers.referer ||*/ '/login/index';
            return res.redirect(backUrl);
        });
    }catch(err) {
        console.log(err);
        return res.render('404');
    }
};