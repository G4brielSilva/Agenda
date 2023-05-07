exports.myMiddleware = (req, res, next) => {
    console.log();

    // if(req.body.cliente) {
    //     console.log(req.body.cliente);
    // }

    next();
}

exports.checkCsrfError = (err, req, res, next) => {

    if (err) {
        return res.render('404');
    }

    next();
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}