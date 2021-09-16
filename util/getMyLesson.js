const Lesson = require('../models/Lesson')
const getMyLesson = async (classId) => {
  const Numbers = await Lesson.findAll({
    where : {
      ClassId : classId
    }
  });
  var list = [];
  for (var i = 0; i < Numbers.length; i++) {
    ele = Numbers[i];
    
    list[i] = {className: ele.name, classDate: ele.createdAt};
  }
  console.log(list);
  return list;
}

module.exports = getMyLesson;