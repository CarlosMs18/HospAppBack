const {Schema, model} = require('mongoose')

const usuarioSchema = Schema({
    nombre : {
        type : String,
        required :true
    },
    email : {
        type : String,
        unique : true,
        required: true
    },
    password : {
        type : String,
        required : true
    },
    img : {
        type : String
    },
    role : {
        type : String,
        required : true,
        default : 'USER_ROLE'
    },
    google : {
        type : Boolean,
        default : false
    }
})

module.exports  = model('Usuario',usuarioSchema)