let express = require('express');
let router = express.Router();
let Schema = require('../database/schema');
router.post('/',function (req,res){
    console.log(req.body);
    let startupSchema = Schema.startup({
        // Founder Information
        NoCofounder: req.body.NoCofounder,
        FullName: req.body.FullName,
        Email: req.body.Email,
        LinkedInUrl: req.body.LinkedInUrl,

        // Startup Information
        CompanyName: req.body.CompanyName,
        StartupStage: req.body.StartupStage,
        StartupCorporated: req.body.StartupCorporated,
        CompanyWebsite: req.body.CompanyWebsite,
        StartupFocusSector: req.body.StartupFocusSector,
        CompanyCity: req.body.CompanyCity,
        AboutCompany: req.body.AboutCompany,
        AmountToRaise: req.body.AmountToRaise,

        // User Information
        UserID: req.body.UserID,
        Password: req.body.Password,
        Type: "Startup",
        //Notification
        Notification: []
    });

    startupSchema.save(function (err,data) {
        if(err) throw err;
    });
    res.send("done");
});

module.exports = router;