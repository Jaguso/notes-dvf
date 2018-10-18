const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const {signUp, logIn} = require("../controllers/users");
const {createHouse} = require("../controllers/houses");

//router.use('/users', require('./user'));

router.post('/users/signup', signUp);
router.post('/users/login', logIn);

// podemos tener mas middlewares además de isAuthenticated (los tenemos que poner en lista si son varios)
router.post('/houses', isAuthenticated, createHouse);

module.exports = router;