'use strict';
module.exports = (sequelize, DataTypes) => {
  const Houses = sequelize.define('Houses', {
    id: { 
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4 
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    type: {type: DataTypes.ENUM, values: ["R", "A", "H"]},
    rate: DataTypes.DECIMAL(5, 1),
    description: DataTypes.TEXT,
    photos: DataTypes.ARRAY(DataTypes.STRING),
    status: {type: DataTypes.ENUM, values: ["B", "A"]}
  }, {});

  Houses.associate = function(models) {
    Houses.belongsTo(models.Users, {foreignKey: "userId", as: "user"}); //también tenemos que poner acá los alias
    Houses.hasOne(models.Addresses, {foreignKey: "houseId", as: "address"});
    Houses.hasOne(models.Facilities, {foreignKey: "houseId", as: "facilities"});
    Houses.hasMany(models.Bookings, {foreignKey: "houseId"});
  }
  return Houses;
};