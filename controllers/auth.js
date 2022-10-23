const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt')

const Usuario = require("../models/usuarios")


const login = async(req, res) => {

    const {email, password} = req.body

    try {

        const emailExiste = await Usuario.findOne({email})

        if(!emailExiste){
            return res.status(404).json({
                ok : false,
                msg : 'El email ingresado no existe'
            })
        }


        const validPassword = bcrypt.compareSync(password, emailExiste.password)
        if(!validPassword){
            return res.status(400).json({
                ok : false,
                msg : 'Contraseña Invalida'
            })
        }


        const token = await generarJWT(emailExiste.id)



        res.json({
            ok : 'false',
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
             ok : 'false',
             msg: 'Hable con el administrador'
        })
    }
    

 
}





module.exports = {
    login
}