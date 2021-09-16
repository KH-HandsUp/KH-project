var express = require('express');
var router = express.Router();
var Class = require("../models/Class")

/* GET home page. */
router.get('/:id', async (req, res, next) => {
  const classData = await Class.findAll({
    where:{
      id : req.params.id
    }
  });
  res.render('classin', {
    name: req.session.name,
    isStudent: req.session.isStudent,
    val: {
      user_code: classData[0].code,
      teacher_name:classData[0].teacherName,
      class_name:classData[0].name,
    },
    list:[{className : "소프트웨어 공학", classDate:"10/16"},]
  });
});

module.exports = router;
