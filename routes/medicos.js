const {Router} = require('express')
const { check } = require('express-validator')
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos')
const { validarCampos } = require('../middlewares/validar-campo')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()

router.get('/',getMedicos)

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('hospital','El hospital debe de ser un Id de mongo valido').isMongoId(),
    validarCampos
    ],crearMedico)

router.put('/:id',actualizarMedico)

router.delete('/:id',borrarMedico)

module.exports = router