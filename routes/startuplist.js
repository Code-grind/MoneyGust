let express = require('express');
let router = express.Router();
let Schema = require('../database/schema');

router.get('/', function(req, res, next) {
    Schema.startup.find({},function (err,startups) {
        if (err) {
            return done(err);
        }
        if(startups===null)
        {
            res.sendStatus(404);
        }
        let userMap = {};
        startups.forEach(function(user) {
            userMap[user._id] = user;
        });
        res.send(userMap);
    })
});

module.exports = router;
