let express = require('express');
let moment = require('moment');
let router = express.Router();
let Schema = require('../database/schema');

/** GET InvestorList.*/
router.get('/', function(req, res, next) {
    if(req.user)
        res.render('InvestorDashboard', { title: 'Dashboard' , choice: 'Suggested Startup'});
    else
        res.render('404 not found');
});

router.get('/Notification',function (req,res) {
    res.render('InvestorDashboard', { title: 'Notification' , choice: 'Notifications'});
});
/** GET Investor Notifications*/
router.get('/GetNotification',function (req,res) {
    if(req.user) {
        let itemsProcessed = 0;
        let AllMessages = [];
        console.log(AllMessages[0]);
        req.user.Notification.forEach(function (value, index, array) {
            Schema.notif.findOne({_id: value}).lean().exec(function (err, msg) {
                if (err) return done(err);
                if (msg === null) res.sendStatus(404);
                AllMessages.push(msg);
                itemsProcessed++;
                if (itemsProcessed === array.length) {
                    AfterAllDataReceived();
                }
            })
        });

        function AfterAllDataReceived() {
            req.user.Notification.forEach(function (value, index, array) {
                Schema.notif.updateOne({_id: value}, {$set: {UnRead: false}}, function (err) {
                    if (err) return done(err);
                })
            });
            /**To Calculate the duration of time elapsed from Send time of notification*/
            let now = moment();
            for (let i = 0; i < AllMessages.length; i++) {
                let SendDate = moment(AllMessages[i].Date);
                AllMessages[i].Earlier = (now.diff(SendDate, 'days', true) >= 2.0);
                AllMessages[i].Duration = moment.duration(SendDate.diff(now)).humanize(true);
            }
            /**Render the template with notifications*/
            res.send(AllMessages);
        }
    }
    else {
        res.render('404 not found');
    }
});

module.exports = router;