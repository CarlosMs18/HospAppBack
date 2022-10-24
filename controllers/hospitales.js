const Hospital = require("../models/hospital")



const getHospital = async(req, res) =>{
    const hospitales = await Hospital.find()
                                        .populate('usuario','nombre img')
    res.json({
        ok : true,
        hospitales
    })
}


const crearHospital = async(req, res) => {
    const uid = req.uid
    const hospital = new Hospital({
        usuario : uid,
        ...req.body
    })
    
    try {
        const hospitalDB = await hospital.save()

        res.status(201).json({
            ok : true,
            hospitalDB
        })
    } catch (error) {
        return res.status(500).json({
            ok : 'false',
            msg : 'Hable con el administrador!'
        })
    }
}


const actualizarHospital = async(req, res) => {
    res.json('actualizar!!')
}


const borrarHospital = async(req, res) => {
    res.json('eliminar!')
}
module.exports = {
    crearHospital,
    getHospital,
    actualizarHospital,
    borrarHospital
}