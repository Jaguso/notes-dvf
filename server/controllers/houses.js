const {Houses, Facilities, Addresses} = require("../models");



const createHouse = async(req, res) => {
    try {
        req.body.UsersId = req.user.id //aquí estamos definiendo req.body.UsersId
        const house = await Houses.create(req.body)
        if(!house) res.status(400).json({"message": "Error to create house"})
        const address = await Addresses.create({...req.body.address, HousesId: house.id})
        //lo de arriba agrega HousesId: house.id, al objeto Adress

        if(!adress) res.status(400).json({"message": "Error to create adress"})
        const facilities = await Facilities.create({...req.body.facilities, HousesId: house.id})
       
        if(!facilities) res.status(400).json({"message": "Error to create facilities"})
        return res.status(200).json({"message": "House created successfully", "id": house.id})
    } catch(e) {
        return res.status(400).json(e)
    }
}

module.exports = {
    createHouse
}

//try catch es que intente hacer las opciones de try y si no funcionan, usar catch