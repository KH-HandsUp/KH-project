var express = require('express');
var router = express.Router();
var Class = require("../models/Class");
var getMyLesson = require("../util/getMyLesson");

/* GET home page. */
router.get('/:id', async (req, res, next) => {
  const classData = await Class.findAll({
    where:{
      id : req.params.id
    }
  });
  const list = await getMyLesson(req.params.id);

  console.log(list);

  res.render('classin', {
    name: req.session.name,
    isStudent: req.session.isStudent,
    val: {
      user_code: classData[0].code,
      teacher_name:classData[0].teacherName,
      class_name:classData[0].name,
    },
    list:list,
  });
});

module.exports = router;
