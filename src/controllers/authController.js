exports.index = (req, res, next) => {
    if(req.session.user) return res.render('logado');
    res.render('auth');
    next();
};