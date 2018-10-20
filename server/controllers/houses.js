const {Houses, Facilities, Addresses, Users} = require("../models");


const createHouse = async(req, res) => {
    try {
        req.body.userId = req.user.id //aquí estamos definiendo req.body.UsersId
        const house = await Houses.create(req.body)
        if(!house) res.status(400).json({"message": "Error to create house"})
        const address = await Addresses.create({...req.body.address, houseId: house.id})
        //lo de arriba agrega houseId: house.id, al objeto Adress

        if(!address) res.status(400).json({"message": "Error to create adress"})
        const facilities = await Facilities.create({...req.body.facilities, houseId: house.id})
       
        if(!facilities) res.status(400).json({"message": "Error to create facilities"})
        return res.status(200).json({"message": "House created successfully", "id": house.id})
    } catch(e) {
        console.log(e)
        return res.status(400).json(e)
    }
}


// con include hacemos que nos traiga también los datos del usuario, facilities y address
const getAllHouses = async(req, res) => {
    let allHouses = await Houses.findAll({where: {}, include: [
        {
            model: Users,
            as: "user"
        },
        {
            model: Facilities,
            as: "facilities"
        },
        {
            model: Addresses,
            as: "address"
        }
    ]})
// los as son para que regrese los nombres con ese alias en el json
    return res.status(200).json(allHouses);
}


const getOneHouse = async(req, res) => {
    let getHouse = await Houses.findOne({where: {id: req.params.id}, include: [
        {
            model: Users,
            as: "user"
        },
        {
            model: Facilities,
            as: "facilities"
        },
        {
            model: Addresses,
            as: "address"
        }
    ]})
    
    return res.status(200).json(getHouse)
}


module.exports = {
    createHouse,
    getAllHouses,
    getOneHouse
}

//try catch es que intente hacer las opciones de try y si no funcionan, usar catch