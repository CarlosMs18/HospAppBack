const {Router} = require('express')
const { check } = require('express-validator')
const { getUsuario, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios')
const { validarCampos } = require('../middlewares/validar-campo')

const router = Router()

router.get('/',getUsuario)


router.post('/',[
            check('nombre','El nombre es obligatorio').not().isEmpty(),
            check('password','El password es obligatorio').not().isEmpty(),
            check('password','El password debe de tener un minimo de 5 digitos').isLength({min: 5}),
            check('email','El email es obligatorio').isEmail(),
            validarCampos       
                ]
        ,crearUsuario)


router.put('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('password','El password debe de tener un minimo de 5 digitos').isLength({min: 5}),
    check('email','El email es obligatorio').isEmail(),
    validarCampos       
        ]
,actualizarUsuario)


router.delete('/',borrarUsuario)

module.exports = router