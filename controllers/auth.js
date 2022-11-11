const bcrypt = require('bcryptjs')
const { googleVerify } = require('../helpers/google-verify')
const { generarJWT } = require('../helpers/jwt')
const {getMenuFrontend} = require('../helpers/menu-frontend')
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
            ok : true,
            token,
            menu : getMenuFrontend(emailExiste.role)
            
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
             ok :false,
             msg: 'Hable con el administrador'
        })
    }
    

 
}


const googleSignIn = async(req, res) => {

    try {
     
        const {email,name, picture} = await googleVerify(req.body.token);

        const usuarioDB = await Usuario.findOne({email});
        let usuario;

        if(!usuarioDB){
            usuario = new Usuario({
                nombre : name,
                email,
                password : '@@@',
                img : picture,
                google : true
            })
        }else{
            usuario = usuarioDB;
            usuario.google = true
        }

        await usuario.save()


        const token = await generarJWT(usuario.id)

        res.json({
            ok : true,
            email,
            name,
            picture,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok : true,
            msg: 'Token de google no es correcto '
       })
    }

    
    
}



const renewToken = async(req, res) => {
    const uid = req.uid

    const usuario = await Usuario.findById(uid)

    const token = await generarJWT(uid)

    res.json({
        ok : true,
        token,
        usuario,
        menu : getMenuFrontend(usuario.role)
    })
}



module.exports = {
    login,
    googleSignIn,
    renewToken
}