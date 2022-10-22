require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connectionDB } = require('./database/connection')

const app = express()

app.use(cors())

connectionDB()


app.use('/api/usuarios',require('./routes/usuarios'))

app.listen(process.env.PORT , ()=> {
    console.log(`Servidor corriendo desde el puerto ${process.env.PORT}`)
})
