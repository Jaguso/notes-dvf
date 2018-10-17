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
// clase 3
const logIn = async(req, res) => {
    
    let user = await Users.find({where: {email: req.body.email}})
    if(!user) return res.status(404).json({"message": "User does not exist"})

    user.comparePassword(req.body.password).then((result) => {
        if(result) {

        } else {
            return res.status(400).json({"message": "Password is incorrect"})
        }
        
    }).catch((err) => console.log(err))
}
//


module.exports = {
    signUp 
}
