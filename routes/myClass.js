var express = require('express');
var router = express.Router();
var User = require('../models/User');
var FindMyClass = require("../util/utils");

/* GET home page. */
router.get('/',async (req, res, next) => {
  const user = await User.findAll({
    where: {
      user_id: req.session.user_id,
    },
  });

  // console.log(user[0]);
  
  const list = await FindMyClass(user[0].id);
  console.log(list);
  res.render('myClass',{
    isLogin: req.session.isLogin,
    val: {
      user_name: req.session.name,
      total_class:list.length,
      teacher_name:"김은애",
      how_many_stu:"18"
    },
    list:list
  });
});

module.exports = router;
