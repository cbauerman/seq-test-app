var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    
    models.User.findAll({
        include: [{
           model: models.User,
           as: 'friends' 
        }]
    }).then(function(users) {
        res.render('users', {
            users: users
        });
    });
  
  
});

router.get('/reset', function(req, res, next) {
    
    models.User.truncate().then(function() {
        return models.User.create({ name: 'John'}).then(function(user1) {
            return models.User.create({ name: 'Amy'}).then(function(user2) {
                return models.User.create({ name: 'Henry'}).then(function(user3) {
                    return models.User.create({ name: 'Jane'}).then(function(user4) {
                        return user1.setFriends([user3, user4]).then(function() {
                            return user2.setFriends([user3]);
                        });
                    });
                });
            });
        });
    }).then(function() {
        return models.User.findAll();
    }).then(function(users) {
        res.render('users', {
            users: users
        });
    });
  
  
});

module.exports = router;
