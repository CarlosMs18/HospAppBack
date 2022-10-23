const bcrypt = require('bcryptjs')

const Usuario = require('../models/usuarios')


const getUsuario = (req, res) => {
    res.json('get')
    console.log('get')
}


const crearUsuario = async(req, res) => {
        const {email, password} = req.body;
        try {
            
            const emailExistente = await Usuario.findOne({email})
            if(emailExistente){
                return res.status(400).json({
                    ok : false,
                    msg : 'El correo ya se encuentra registrado'
                })
            }

            const usuario = new Usuario(req.body)
            
           

            const salt = bcrypt.genSaltSync()
            usuario.password = bcrypt.hashSync(password, salt);


            await usuario.save()
            
            res.json({
                ok : 'true',
                msg : usuario
            })


        
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok : false,
                msg : 'Error Inesperado ... Hablar con el Administrador'
            })
        }

}


const actualizarUsuario = (req, res) => {
    console.log('actualizar')
}



const borrarUsuario = (req, res) => {
    console.log('borrar')
}


module.exports = {
    getUsuario,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}