


const getUsuario = (req, res) => {
    res.json('get')
    console.log('get')
}


const crearUsuario = (req, res) => {
    console.log('crear')
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