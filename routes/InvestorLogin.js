let express = require('express');
let passport = require('passport');
let router = express.Router();

router.post('/',passport.authenticate('local.investor',{failureRedirect: '/failure'}),function (req,res) {
    console.log(req.body);
    if(req.user.Type==='Startup'){
        return res.redirect('/StartupDashboard.html');
    }
    if(req.user.Type==='Investor') {
        res.redirect('/InvestorDashboard.html');
    }
});

module.exports = router;