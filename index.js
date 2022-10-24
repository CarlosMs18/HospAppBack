require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connectionDB } = require('./database/connection')

const app = express()

connectionDB()

app.use(cors())


app.use(express.json())



app.use('/api/usuarios',require('./routes/usuarios'))

app.use('/api/hospitales',require('./routes/hospitales'))
app.use('/api/medicos',require('./routes/medicos'))
app.use('/api/todo',require('./routes/busquedas'))
app.use('/api/login',require('./routes/auth'))
app.use('/api/uploads',require('./routes/uploads'))


app.listen(process.env.PORT , ()=> {
    console.log(`Servidor corriendo desde el puerto ${process.env.PORT}`)
})
