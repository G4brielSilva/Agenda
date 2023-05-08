const mongoose = require('mongoose');
const validator = require('validator');
const bcryptJs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register() {
        this.validate();

        if(this.hasErrors()) return;

        await this.createUser();
    }

    async createUser() {
        if (await this.userExists()) return;
        try {
            this.user = await LoginModel.create(this.body);
        } catch(error) {
            console.log(error);
        }
    }

    async userExists() {
        const user = await LoginModel.findOne({ email: this.body.email });
        if(user) {
            this.errors.push('Usuário já cadastrado.')
            return true
        } 
        return false
    }

    getBody() {
        return this.body;
    }

    getErrors() {
        return this.errors;
    }

    hasErrors() {
        return (this.errors.length > 0)? true: false;
    }

    isValidEmail() {
        if(!validator.isEmail(this.body.email)) {
            this.errors.push('Invalid E-mail!')
        }
    }

    isValidPassword() {
        const passwordLength = this.body.password.length;
        
        if( passwordLength < 3 || passwordLength > 50) {
            this.errors.push('The password must have between 3 and 50 characters.')
        } else {
            this.bcryptPassword();
        }
            
    }

    validate() {
        this.cleanBodyData();

        this.isValidEmail();
        this.isValidPassword();
    }

    cleanBodyData() {
        for(let key in this.body) {
            if(typeof(this.body[key]) !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }

    bcryptPassword() {
        const salt = bcryptJs.genSaltSync();
        this.body.password = bcryptJs.hashSync(this.body.password, salt);
    }
}

module.exports = Login;