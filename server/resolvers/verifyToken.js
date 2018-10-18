const {Users} = require("../models");
const jwt = require('jsonwebtoken');

const SECRET_KEY = "textorandom";

const tokenPrefix = "JWT";

module.exports = (token) => {
    if(!token) throw new Error("No token provided")
    const [prefix, recivedToken] = token.split(' ');  // token.split(' ') es una lista con dos elementos, el primero se llama prefix y el segundo recivedToken
    if(!recivedToken) throw new Error("No Tokenn Provided")


    if(prefix != tokenPrefix) throw new Error("Invalid header format")

    let payload = jwt.verify(recivedToken, SECRET_KEY)

    return Users.findOne({where: {id:payload.id}})
    
}