var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("signUp", {
    isLogin: req.session.isLogin,
    name: req.session.name
  });
});

module.exports = router;
