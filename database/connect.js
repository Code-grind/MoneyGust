const mongoose = require('mongoose');
const databaseName = 'moneygustdb';
const url = 'mongodb://localhost/'+databaseName;

function connect() {
    mongoose.connect(url)
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