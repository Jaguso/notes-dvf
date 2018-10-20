const {Houses, Bookings} = require('../models')

const calculatePrice = async(req, res) => {
    const {date_init, date_due, houseId} = req.body //los tres nombres de la izquierda vienen en req.body


    const date1 = new Date(date_init);
    const date2 = new Date(date_due);
    let timeDiff = Math.abs(date2.getTime() - date1.getTime());
    let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const house = await Houses.findById(houseId);
    if(!house) res.status.json({message: "House does not exist"});

    const count_booking = await Bookings.count({where: {
        start_date: {
            $between: [date_init, date_due]
        },
        houseId: houseId // lo de la derecha es lo mismo que house.id
    }})

    if(count_booking != 0) res.status(400).json({message: "The house is already booked"})

    let price = dayDiff * house.price

    res.status(200).json({price: price, message: "Booking price calculated correctly"})
}

const createBooking = async(req, res) => {

    req.body.userId = req.user.id 
    const booking = await Bookings.create(req.body)
        .catch(e => res.status(400).json(e))
    if(!booking) res.status(400).json({message: "Problems to create booking"})

    res.status(200).json({message: "Booking created", id:booking.id})
}


module.exports = {
    calculatePrice,
    createBooking
}