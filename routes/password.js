var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("password", {
    isLogin: req.session.isLogin,
    name: req.session.name,
  });
});

router.get("/check_question", function (req, res, next) {
  res.render("password2", {
    isLogin: req.session.isLogin,
    name: req.session.name,
  });
});

router.get("/new_pwd", function (req, res, next) {
  res.render("password3", {
    isLogin: req.session.isLogin,
    name: req.session.name,
  });
});

router.get("/complete", function (req, res, next) {
  res.render("password4", {
    isLogin: req.session.isLogin,
    name: req.session.name,
  });
});

module.exports = router;
