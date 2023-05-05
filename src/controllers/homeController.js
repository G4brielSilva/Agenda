// const HomeModel = require('../model/HomeModel');

// HomeModel.create({
//     // titulo: 'Um titulo de teste',
//     // descricao: 'Uma descricao de teste'
// }).then(dados => console.log(dados));

exports.homePage = (req, res, next) => {
    // res.send(`
    //     <form action="/" method="POST"> 
    //         Nome: <input type="text" name="nome">
    //         <button>Send</button>
    //     </form>`
    // );
    res.render('index', {
        titulo: 'este será o título da página',
        numeros: [0,1,2,3,4,5,6,7,8,9]
    });
    console.log(req.session);
    next();
}

exports.postData = (req, res, next) => {
    res.send(req.body);
    next();
}