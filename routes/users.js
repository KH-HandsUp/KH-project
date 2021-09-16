var express = require("express");
var router = express.Router();
var User = require("../models/User");
var bcrypt = require("bcrypt");

/* GET users listing. */
router.post("/login", async (req, res, next) => {
  console.log(req.body);
  if (req.body.user_id && req.body.password) {
    const data = await User.findAll({
      where: {
        user_id: req.body.user_id,
      },
    });
    if (!data[0]) {
      res.send({ msg: "존재하지 않는 사용자 입니다." });
      return;
    }
    const comparePassword = bcrypt.compare(data.password, req.body.password, () => {});
    if (comparePassword) {
      console.log("로그인 성공");
      req.session.isLogin = true;
      req.session.user_id = data[0].user_id;
      req.session.name = data[0].name;
      res.redirect("/");
    } else {
      res.send({ msg: "비밀번호가 잘못되었습니다." });
    }
  } else {
    res.send({ msg: "불완전한 요청" });
  }
});

router.post("/signup", async (req, res, next) => {
  console.log(req.body);
  if (
    req.body.name &&
    req.body.id &&
    req.body.password &&
    req.body.question &&
    req.body.answer
  ) {
    const data = await User.findAll({
      where: {
        user_id: req.body.id,
      },
    });

    if (data[0]) {
      console.log("해당 유저가 존재!");
      res.send({ error: "이미 존재하는 이메일" });
    } else {
      var isStudent;
      if (req.body.student) {
        isStudent = true;
      } else {
        isStudent = false;
      }
      const encryptedPassword = bcrypt.hashSync(req.body.password, 10);
      const user = await User.create({
        name: req.body.name,
        user_id: req.body.id,
        password: encryptedPassword,
        question: req.body.question,
        answer: req.body.answer,
        isStudent: isStudent,
      });
      console.log("회원가입 완료");
      //회원가입 완료후 토큰 생성
      req.session.isLogin = true;
      req.session.user_id = user.user_id;
      req.session.name = user.name;
      req.session.isStudent = user.isStudent;
      res.redirect("/");
    }
  } else {
    res.send({ msg: "불완전한 데이터" });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect("/");
})

module.exports = router;
