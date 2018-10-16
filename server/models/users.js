'use strict';
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: {
                args: true,
                msg: "Email must be provided"
            }
        }
    },
    password: DataTypes.STRING, 
    gender: {type: DataTypes.ENUM, values: ["M", "F"]}, //tambien modificamos esto comon en migrations/...
    birth_date: DataTypes.DATE,
    paypal_id: DataTypes.STRING,
    type: {type: DataTypes.ENUM, values: ["guest", "owner", "both"]} //lo mismo que el ENUM de arriba
  }, {});

let cryptPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if(err) reject(err)
      bcrypt.hash(password, salt, (err, new_hash) => {
        if(err)reject(err)
        resolve(new_hash)
      })
    }) 
  })
}

Users.beforeCreate((user, options) => {

  return cryptPassword(user.password).then((new_hash) => {
    user.password = new_hash
  }).catch(e => console.log(e))

})

  Users.associate = function(models) {
    Users.hasMany(models.Houses);
    Users.hasMany(models.Bookings);
  };
  return Users;
};