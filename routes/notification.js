let express = require('express');
let router = express.Router();
let Schema = require('../database/schema');
/* GET home page. */
router.post('/', function(req, res) {
    console.log(req.user);
    let notif = Schema.notif({
        RecevID: req.body.recv_id,
        Type: "Startup",
        Subject: "Something",
        Sender: req.user.CompanyName,
        Messages: "He has Shown interest in your Startup"
    });

    notif.save(function (err,data) {
        if(err) throw err;
        Schema.startup.findOne({_id: req.body.recv_id},function (err,startup) {
            if (err) {
                return done(err);
            }
            if(startup===null)
            {
                res.sendStatus(404);
            }
            startup.Notification.push(data._id);
            startup.save(function (err,data) {
                if(err) throw err;
            });
            console.log(data)
        });
    });
    res.send("done");
});

router.delete('/:notification_id', function (req,res) {
    console.log(req.params.notification_id);
    Schema.notif.findById( req.params.notification_id, function (err, user) {
        if (err)
            return done(err);
        if(user.Type==='Startup')
        {
            Schema.startup.updateOne({_id: user.RecevID},
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
        if(user.Type==='invester')
        {
            Schema.investor.updateOne({_id: user.RecevID},
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

router.get('/UnreadMessages',function (req,res) {
    let count = 0;
    let itemsProcessed = 0;
    req.user.Notification.forEach(function (value,index,array) {
        Schema.notif.findById( value,function (err,data) {
            if (err) return done(err);
            if(data.UnRead===true)
                count++;
            itemsProcessed++;
            if(itemsProcessed === array.length) {
                callback();
            }
        })
    });

    function callback() {
        res.send(count.toString());
    }
});
module.exports = router;
