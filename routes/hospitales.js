const {Router} = require('express')
const { check } = require('express-validator')
const { crearHospital, getHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales')
const { validarCampos } = require('../middlewares/validar-campo')
const { validarJWT } = require('../middlewares/validar-jwt')


const router = Router()


router.get('/',getHospital)

router.post('/',[
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        validarCampos
        ],
    crearHospital)


router.put('/:id',[
    validarJWT,
    check('nombre','El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
], actualizarHospital)

router.delete('/:id',validarJWT,borrarHospital)
module.exports = router