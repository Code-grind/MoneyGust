let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
    res.redirect('/Home.html');
});

module.exports = router;
