let express = require('express');
let router = express.Router();
let Schema = require('../database/schema');
/* GET home page. */
router.get('/', function(req, res, next) {
    let notif = Schema.notif({
        RecevID: {type: Schema.Types.ObjectId, ref: 'startupSchema'},
        Type: String,
        Messages: "he has poked you"
    });
});

module.exports = router;
