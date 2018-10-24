const {Users, Houses, Bookings, Addresses, Facilities, Comments} = require('../models'); //traemos todas las tablas de la DB


//obs: truncate elimina toda la información de la tabla
module.exports = () =>{
    Users.truncate({
        cascade:true
    })
    Houses.truncate({
        cascade:true
    })
    Facilities.truncate({
        cascade:true
    })
    Addresses.truncate({
        cascade:true
    })
    Bookings.truncate({
        cascade:true
    })
    Comments.truncate({
        cascade:true
    })
 
 }
