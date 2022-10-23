const Usuario = require('../models/usuarios')


const getUsuario = (req, res) => {
    res.json('get')
    console.log('get')
}


const crearUsuario = async(req, res) => {
        const {email, password} = req.body;
        try {
            
            const emailExistente = await Usuario.findOne({email})
            res.json(req.body)
        
        } catch (error) {
            console.log(error)
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