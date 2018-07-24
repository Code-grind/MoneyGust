const mongoose = require('mongoose');
require('dotenv/config');
///const databaseName = 'moneygustdb';
///const url = 'mongodb://localhost/'+databaseName;
///mLab Database
const url = process.env.MONGOURI;

function connect() {
    mongoose.connect(url,{ useNewUrlParser: true })
        .then(function (db) {
            console.log("database port: " + db['connections'][0]['port'])
        });
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('Connected to database')
    });
}

module.exports = connect;