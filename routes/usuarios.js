const {Router} = require('express')
const { getUsuario, crearUsuario } = require('../controllers/usuarios')

const router = Router()

router.get('/',getUsuario)


router.post('/',crearUsuario)

module.exports = router