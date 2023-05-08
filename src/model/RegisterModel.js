const { Auth, AuthSchema } = require('./AuthModel');

const mongoose = require('mongoose');
const bcryptJs = require('bcryptjs');

// const RegisterSchema = new mongoose.Schema({
//     email: { type: String, required: true },
//     password: { type: String, required: true }
// });

const RegisterModel = mongoose.model('Auth', AuthSchema);

class Register extends Auth{
    constructor(body) {
        super(body);
    }

    async register() {
        this.validate();

        if(this.hasErrors()) return;

        await this.createUser();
    }

    async createUser() {
        if (await this.userExists()) return;
        this.hashingPassword();

        this.user = await RegisterModel.create(this.body);
    }

    async userExists() {
        const user = await RegisterModel.findOne({ email: this.body.email });
        if(user) {
            this.errors.push('Usuário já cadastrado.')
            return true
        } 
        return false
    }

    hashingPassword() {
        const salt = bcryptJs.genSaltSync();
        this.body.password = bcryptJs.hashSync(this.body.password, salt);
    }
}

module.exports = Register;