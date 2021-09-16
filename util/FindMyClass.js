const { Lesson } = require("../models");
const Class = require("../models/Class");
const ClassUser = require("../models/ClassUser");

const FindMyClass = async (userId) => {
    const Numbers = await ClassUser.findAll({
      where: {
        UserId: userId,
      },
    });
  
    var list = [];
    for (var i = 0; i < Numbers.length; i++) {
      ele = Numbers[i];
      const element = await Class.findAll({
        where: {
          id: ele.ClassId,
        },
      });
      list[i] = {class_name: element[0].name, teacher_name: element[0].room, how_many_stu: element[0].limitMember, class_id: element[0].id};
    }
  
    return list;
  };



  module.exports = FindMyClass;