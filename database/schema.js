const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let investorSchema = new Schema({
    // Investor Information

    NoActiveMember: Number,
    FullName: String,
    Email: String,
    LinkedInUrl: String,

    // Investor's Company Information
    CompanyName: String,
    InvestorGroupType: Number,
    RoleInCompany: Number,
    CompanyWebsite: String,
    InvestmentFocusSector: [Number],
    CompanyCity: Number,
    AboutCompany: String,
    AmountToInvest: Number,

    // User Information
    UserID: String,
    Password: String
});

let startupSchema = new Schema({
    // Founder Information

    NoCofounder: Number,
    FullName: String,
    Email: String,
    LinkedInUrl: String,

    // Startup Information
    CompanyName: String,
    StartupStage: Number,
    StartupCorporated: Number,
    CompanyWebsite: String,
    StartupFocusSector: String,
    CompanyCity: Number,
    AboutCompany: String,
    AmountToRaise: Number,

    // User Information
    UserID: String,
    Password: String
});

let investor = mongoose.model('investorDetails',investorSchema);
let startup = mongoose.model('startupDetails',startupSchema);

module.exports = {
    investor,
    startup
};