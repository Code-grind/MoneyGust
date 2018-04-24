let express = require('express');
let router = express.Router();
let Schema = require('../database/schema');

router.get('/', function(req, res, next) {
    Schema.investor.find({},function (err,investors) {
        if (err) {
            return done(err);
        }
        if(investors===null)
        {
            res.sendStatus(404);
        }
        let userMap = {};
        investors.forEach(function(user) {
            userMap[user._id] = user;
        });
        res.send(userMap);
    })
});

module.exports = router;
