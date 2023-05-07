exports.index = (req, res, next) => {
    res.render('login');
    next();
};