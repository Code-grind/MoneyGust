let express = require('express');
let router = express.Router();
let Schema = require('../database/schema');

/* GET InvestorList. */
router.get('/', function(req, res, next) {
    function callback() {
        console.log(AllMessages);
        res.render('StartupDashboar', { title: 'Dashboard' , choice: 'Suggested Investor', AllMessages: AllMessages});
    }
    let itemsProcessed = 0;
    let AllMessages = [];

    req.user.Notification.forEach(function (value,index,array) {
        Schema.notif.findOne({_id: value}, function (err,msg) {
            if (err) return done(err);
            if(msg===null) res.sendStatus(404);
            AllMessages.push(msg);
            itemsProcessed++;
            if(itemsProcessed === array.length) {
                callback();
            }
        })
    });
});

/* GET StartupNotification */
router.use('/Notification',function (req,res) {
    function callback() {
        console.log(AllMessages);
        res.render('StartupDashboar', { title: 'Notification' , choice: 'Notifications', AllMessages: AllMessages});
    }
    let itemsProcessed = 0;
    let AllMessages = [];

    req.user.Notification.forEach(function (value,index,array) {

        Schema.notif.findOne({_id: value}, function (err,msg) {
            if (err) return done(err);

            if(msg===null) res.sendStatus(404);

            AllMessages.push(msg);
            itemsProcessed++;
            if(itemsProcessed === array.length) {
                callback();
            }
        })
    });
});

module.exports = router;