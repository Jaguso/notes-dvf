'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bookings = sequelize.define('Bookings', {
    start_date: DataTypes.DATE,
    due_date: DataTypes.DATE,
    status: {type: DataTypes.ENUM, values: ["CF", "CC", "PN"]},
    total_price: DataTypes.DECIMAL(10, 2),
    num_guest: DataTypes.INTEGER,
    paypal_confirmation: DataTypes.STRING
  }, {});

  Bookings.associate = function(models) {
    Bookings.belongsTo(models.Users);
    Bookings.belongsTo(models.Houses);
    Bookings.hasOne(models.Houses);
  };
  return Bookings;
};