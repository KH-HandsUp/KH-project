var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('myClass',{
    isLogin: req.session.isLogin,
    val: {
      user_name: req.session.name,
      total_class:"8",
      teacher_name:"김은애",
      how_many_stu:"18"
    },
    list:[{class_name: "dd", teacher_name: "asd", how_many_stu:"dd"}, {class_name: "dd", teacher_name: "asd", how_many_stu:"dd"},]
  });
});

module.exports = router;
