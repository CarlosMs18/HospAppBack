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


router.put('/:id',[], actualizarHospital)

router.delete('/:id',[],borrarHospital)
module.exports = router