const { Auth, AuthSchema } = require('./AuthModel');

const mongoose = require('mongoose');
const bcryptJs = require('bcryptjs');

const LoginModel = mongoose.model('Auth', AuthSchema);

class Login extends Auth{
    constructor(body) {
        super(body)
    }

    async login() {
        this.validate();

        if(this.hasErrors()) return;

        await this.checkUserEntries();
    }

    async userExists() {
        this.user = await LoginModel.findOne({ email: this.body.email });
        return (this.user) ? true: false
    }

    checkPassword() {
        return (bcryptJs.compareSync(this.body.password, this.user.password))? true: false;
    }

    async checkUserEntries() {
        if (!(await this.userExists() && this.checkPassword())) {
            this.user = null;
            this.errors.push('Senha ou Usuário inválido(s)');
        }
    }
}

module.exports = Login;