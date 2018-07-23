let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.user);
    if(req.user)
        res.render('Under Construction', { title: 'Your Account'});
    else
        res.render('404 not found');
});


module.exports = router;
