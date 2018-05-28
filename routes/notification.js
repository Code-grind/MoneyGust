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

module.exports = router;
