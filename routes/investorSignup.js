let express = require('express');
let router = express.Router();
let Schema = require('../database/schema');
router.post('/',function (req,res) {
    console.log(req.body);
    let investorSchema = Schema.investor({
        NoActiveMember: req.body.NoActiveMember,
        FullName: req.body.FullName,
        Email: req.body.Email,
        LinkedInUrl: req.body.LinkedInUrl,

        //Investor's Company Information
        CompanyName: req.body.CompanyName,
        InvestorGroupType: req.body.InvestorGroupType,
        RoleInCompany: req.body.RoleInCompany,
        CompanyWebsite: req.body.CompanyWebsite,
        InvestmentFocusSector: req.body.InvestmentFocusSector,
        CompanyCity: req.body.CompanyCity,
        AboutCompany: req.body.AboutCompany,
        AmountToInvest: req.body.AmountToInvest,

        //User Information
        UserID: req.body.UserID,
        Password: req.body.Password
    });
    investorSchema.save(function (err,data) {
        if(err) throw err;
    });
    res.send("done");

});

module.exports = router;