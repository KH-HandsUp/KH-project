var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('choose',{
    isLogin: req.session.isLogin,
    user_name: req.session.name,
  });

});

router.post('/', (req, res) => {
  res.render('choose', {
    isLogin: req.session.isLogin,
    user_name: req.session.name,
  })
})

module.exports = router;
