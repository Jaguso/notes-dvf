const express = require("express");
const router = express.Router();
const {signUp, logIn} = require("../controllers/users");

//router.use('/users', require('./user'));

router.post('/users/signup', signUp);
router.post('/users/login', logIn);

module.exports = router;