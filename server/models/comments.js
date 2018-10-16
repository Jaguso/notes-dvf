'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    comment_guest: DataTypes.TEXT,
    comment_host: DataTypes.TEXT
  }, {});
  
  Comments.associate = function(models) {
    Comments.belongsTo(models.Bookings);
  };
  return Comments;
};