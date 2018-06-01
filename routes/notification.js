let express = require('express');
let router = express.Router();
let Schema = require('../database/schema');

/**Route to store Startup Notifications*/
router.post('/startup', function(req, res) {
    let notif = Schema.notif({
        RecevID: req.body.recv_id,
        Type: "Startup",
        Subject: "Something",
        Sender: req.user.CompanyName,
        Messages: "He has Shown interest in your Startup"
    });

    notif.save(function (err, data) {
        if (err) throw err;
        Schema.startup.findOne({_id: req.body.recv_id}, function (err, startup) {
            if (err) {
                return done(err);
            }
            if (startup === null) {
                res.sendStatus(404);
            }
            startup.Notification.push(data._id);
            startup.save(function (err, data) {
                if (err) throw err;
            });
            console.log(data)
        });
    });
    res.send("done");
});

/**Route to store Investor Notifications*/
router.post('/investor', function(req, res) {
    let notif = Schema.notif({
        RecevID: req.body.recv_id,
        Type: "Investor",
        Subject: "Something",
        Sender: req.user.CompanyName,
        Messages: "Startup is now following you"
    });

    notif.save(function (err, data) {
        if (err) throw err;
        Schema.investor.findOne({_id: req.body.recv_id}, function (err, investor) {
            if (err) {
                return done(err);
            }
            if (investor === null) {
                res.sendStatus(404);
            }
            investor.Notification.push(data._id);
            investor.save(function (err, data) {
                if (err) throw err;
            });
        });
    });
    res.send("done");
});

/**Route to Delete a notification*/
router.delete('/:notification_id', function (req,res) {
    console.log(req.params.notification_id);
    Schema.notif.findById( req.params.notification_id, function (err, recipient) {
        if (err)
            return done(err);
        if(recipient.Type==='Startup')
        {
            Schema.startup.updateOne({_id: recipient.RecevID},
                { $pull: { 'Notification': req.params.notification_id } },function (err) {
                if(err)
                    return done(err);
                console.log('Startup updated');
                Schema.notif.deleteOne({_id: req.params.notification_id},function (err) {
                        if(err)
                            return done(err);
                        res.send('Deletion done');
                    });
            })
        }
        if(recipient.Type==='Investor')
        {
            Schema.investor.updateOne({_id: recipient.RecevID},
                { $pull: { 'Notification': req.params.notification_id } },function (err) {
                if(err)
                    return done(err);
                console.log('Investor updated');
                Schema.notif.deleteOne({_id: req.params.notification_id},function (err) {
                        if(err)
                            return done(err);
                        res.send('Deletion done');
                    });
            })
        }
    });
});

/**Route to Get count of Unread messages for User*/
router.get('/UnreadMessages',function (req,res) {
    let count = 0;
    let itemsProcessed = 0;
    if(req.user.Notification.length!==0) {
        req.user.Notification.forEach(function (value, index, array) {
            Schema.notif.findById(value, function (err, data) {
                if (err) return done(err);
                if (data.UnRead === true)
                    count++;
                itemsProcessed++;
                if (itemsProcessed === array.length) {
                    callback();
                }
            })
        });
    }
    else {
        if(itemsProcessed===0)
          callback();
    }
    function callback() {
        res.send(count.toString());
    }
});

module.exports = router;
