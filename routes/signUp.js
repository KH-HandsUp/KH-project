var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("signUp", {
    isLogin: req.session.isLogin,
    user: {
      name: "천중호",
    },
  });
});

module.exports = router;
