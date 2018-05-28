let express = require('express');
let passport = require('passport');
let router = express.Router();

router.post('/',passport.authenticate(['local.Startup','local.Investor'],{failureRedirect: '/'}),function (req,res) {
    if(req.user.Type==='Startup'){
        return res.redirect('/StartupDashboard');
    }
    if(req.user.Type==='Investor') {
        res.redirect('/InvestorDashboard.html');
    }
});

module.exports = router;