const Login = require('../model/LoginModel');

exports.index = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();

        if(login.hasErrors()) {
            req.flash('errors', login.getErrors());
            req.session.save(function() {
                const backUrl = /*res.headers.referer ||*/ '/auth';
                return res.redirect(backUrl);
            });
            return;
        }

        req.flash('success', 'Login Realizado');
        req.session.user = login.user;
        req.session.save(function() {
            const backUrl = /*res.headers.referer ||*/ '/auth';
            return res.redirect(backUrl);
        });
    }catch(err) {
        console.log(err);
        return res.render('404');
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}