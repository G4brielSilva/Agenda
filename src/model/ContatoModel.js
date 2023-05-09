const mongoose = require('mongoose');
const validator = require('validator');

ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    createdAt: { type: Date, default: Date.now }
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
     constructor(body) {
        this.body = body;
        this.errors = [];
        this.contato = null;
    }

    async register() {
        this.validate();

        if(this.hasErrors()) return;

        this.contato = await ContatoModel.create(this.body);
    }

    getErrors() {
        return this.errors;
    }

    getBody() {
        return this.body;
    }

    hasErrors() {
        return (this.errors.length > 0)? true: false;
    }

    isValidEmail() {
        if(this.body.email && !validator.isEmail(this.body.email)) {
            this.errors.push('Invalid E-mail!')
        }
    }

    hasContact() {
        if(!this.body.email && !this.body.telefone) {
            this.errors.push('Um contato deve ter pelo menos uma forma de contato: email ou telefone')
        }
    }

    hasName() {
        if(!this.body.nome) {
            this.errors.push('Nome é um campo obrigatório!')
        }
    }

    validate() {
        this.cleanBodyData();

        this.isValidEmail();
        this.hasName();
        this.hasContact();
    }

    cleanBodyData() {
        for(let key in this.body) {
            if(typeof(this.body[key]) !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone
        };
    }

    async edit(id) {
        // console.log("opa1")
        if(typeof id !==  'string') return;
        // console.log("opa2")
        this.validate();
        // console.log("opa3")
        if(this.hasErrors()) return;
        // console.log("opa4")

        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
        // console.log("opa5")
        // if (!this.contato) this.contato = {};
    }

    static async getById(id) {
        if(typeof id !==  'string') return;
        return await ContatoModel.findById(id);
    }

    static async getContatos() {
        const contatos = await ContatoModel.find()
            .sort({ createdAt: -1 });
        return contatos;
    }
    
};

module.exports = Contato;