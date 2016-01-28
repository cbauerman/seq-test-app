/* global belongsTo */
"use strict";

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: DataTypes.STRING
        }, {
            classMethods: {
                associate: function (models) {
                    User.belongsToMany(models.User, { through: 'friend_user', as: 'friends'});
                }
            }
    });
    
    return User;
};