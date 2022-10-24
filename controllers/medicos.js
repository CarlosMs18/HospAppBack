const Medico = require("../models/medico");

const getMedicos = async(req, res) => {
    const medicos = await Medico.find({})
                                    .populate('usuario','nombre')
                                    .populate('hospital','nombre')

    res.json({
        medicos
    })
}

const crearMedico = async(req, res) => {
    const uid = req.uid;

    const medico = new Medico({
        usuario : uid,
        ...req.body
    })

    try {
        
        const medicoDB = await medico.save()

        res.json({
            ok : true,
            medico : medicoDB
        })

    } catch (error) {
        res.status(500).json({
            ok : false,
            msg : 'Hable con el administrador'
        })
    }
  
}


const actualizarMedico = async(req, res) => {
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    })
}

const borrarMedico = async(req, res) => {
    res.json({
        ok: true,
        msg: 'borrarMedico'
    })
}


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}