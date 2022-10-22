const {Router} = require('express')
const { getUsuario } = require('../controllers/usuarios')

const router = Router()

router.get('/',getUsuario)

module.exports = router