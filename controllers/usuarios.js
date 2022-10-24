const bcrypt = require('bcryptjs')

const Usuario = require('../models/usuarios')


const getUsuario = async(req, res) => {
    const desde = Number(req.query.desde) || 0


  
   


    const [usuarios, total] = await Promise.all([
                        Usuario.find()
                            .skip(desde)
                            .limit(2),


                        Usuario.countDocuments()
    ])
    res.json({
        ok : true,
        usuarios,
        total
    })
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
                usuario
            })


        
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok : false,
                msg : 'Error Inesperado ... Hablar con el Administrador'
            })
        }

}


const actualizarUsuario = async(req, res) => {
    const uid = req.params.id

    try {
        console.log(uid)
        const usuarioDB  = await Usuario.findById(uid)
        console.log(usuarioDB)

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        const { password, google, email, ...campos } = req.body;


        if ( usuarioDB.email !== email ) {

            const existeEmail = await Usuario.findOne({ email });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}



const borrarUsuario = async(req, res) => {
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Usuario.findByIdAndDelete( uid );

        
        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}


module.exports = {
    getUsuario,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}