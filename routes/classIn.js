var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('classin', {
    name: req.session.name,
    isStudent: req.session.isStudent,
    val: {
      user_code: "fxxmn6r",
      teacher_name:"김은애",
      class_name:"2학년 3반과 함께하는 소프트웨어 공학"
    },
    list:[{className : "소프트웨어 공학", classDate:"10/16"},]
  });
});

module.exports = router;
