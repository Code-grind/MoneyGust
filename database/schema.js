const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let investorSchema = new Schema({
    FirstName: String,
    LastName: String,
    DateOfBirth: Date,
    Country: String,
    MobileNumber: Number,
    Gender: String,
    Address: String,
    UserName: String,
    Email: String,
    Password: String
});

let startupSchema = new Schema({

});

let investor = mongoose.model('investorDetails',investorSchema);
let startup = mongoose.model('startupDetails',startupSchema);

module.exports = {
    investor,
    startup
};