const {Users} = require('../models');


const signUp = async(req, res) => { 
    
    let user = await Users.create(req.body)

    // la linea de arriba es lo mismo que las 4 siguientes
    // var user = null //obs: aquí usamos var para que su scope incluya la funcion siguiente (con let no reconoceria la variable)
    // Users.create(req.body).then((new_user) => {
    //     user = new_user
    // })

    if(!user) res.status(400).json({message: "Couldn't create user"})

    return res.status(201).json({message: "User created", id: user.id})
}


module.exports = {
    signUp 
}
