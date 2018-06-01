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
    InvestmentFocusSector: String,
    CompanyCity: Number,
    AboutCompany: String,
    AmountToInvest: Number,

    // User Information
    UserID: String,
    Password: String,
    Type: String,
    //Notification
    Notification: [{type: Schema.Types.ObjectId, ref: 'notificationSchema'}]
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
    Password: String,
    Type: String,
    //Notification
    Notification: [{type: Schema.Types.ObjectId, ref: 'notificationSchema'}]
});

let notificationSchema = new Schema({
    RecevID: {type: Schema.Types.ObjectId, ref: 'startupSchema'},
    Type: String,
    Date: { type: Date, default: Date.now },
    Subject: String,
    Sender: String,
    Messages: String,
    UnRead: {type: Boolean,default: true}
});

let investor = mongoose.model('investorDetails',investorSchema);
let startup = mongoose.model('startupDetails',startupSchema);
let notif = mongoose.model('Notification',notificationSchema);

module.exports = {
    investor,
    startup,
    notif
};