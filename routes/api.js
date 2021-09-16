var express = require("express");
const { User } = require("../models");
const Class = require("../models/Class");
const ClassUser = require("../models/ClassUser");
var router = express.Router();

router.post("/makeClass", async (req, res, next) => {
  console.log(req.body);
  if (req.body.name && req.body.room && req.body.limitMember) {
    const user = await User.findAll({
      where: {
        id: req.session.user_id,
      },
    });

    var code = Math.random().toString(36).substr(2, 11);
    const cls = await Class.create({
      name: req.body.name,
      room: req.body.room,
      member: 1,
      limitMember: req.body.limitMember,
      code: code,
    });

    const clsdata = await Class.findAll({
      where: {
        code: code,
      },
    });

    const classUser = ClassUser.create({
      UserId: user[0].id,
      ClassId: clsdata[0].id,
    });

    res.send({ msg: "완료" });
  } else {
    res.send("잘못된 정보");
  }
});

router.post("/joinClass", async (req, res) => {
  console.log(req.body);
  if (req.body.code) {
    const cls = await Class.findAll({
      where: {
        code: req.body.code,
      },
    });

    if (!cls[0]) {
      res.send("존재하지 않는 코드");
      return;
    }
    const user = await User.findAll({
      where: {
        id: req.session.user_id,
      },
    });

    const make = await ClassUser.create({
      UserId: user[0].id,
      ClassId: cls[0].id,
    });

    res.send({ msg: "성공" });
  }
});

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
    list[i] = element[0];
  }

  console.log(list);
  return list;
};

router.post("/findPost", async (req, res) => {
  const data = await FindMyClass(req.body.userid);
  console.log(data);
  res.json(data);
});

module.exports = router;
