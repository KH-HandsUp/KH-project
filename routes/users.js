var express = require('express');
var router = express.Router();
var User = require('../models/User');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.post('/login', async (req, res, next) => {
  if(req.body.id && req.body.password) {
    const data = await User.findAll({
      where: {
        user_id: req.body.id
      }
    });
    if(!data[0]){
      res.send({msg: "존재하지 않는 사용자 입니다."});
      return;
    }
    const comparePassword = bcrypt.compare(req.body.password , data.password);
    if(comparePassword){
      console.log('로그인 성공');
      const token = jwt.sign(
        {
          name: data.name,
          id: data.id,
        },
        "jwt-secret-key",
        {
          expiresIn: "7d",
        }
      );
      res.json({ token });
    }else{
      res.send({msg: "비밀번호가 잘못되었습니다."})
    }
  }else {
    res.send({msg: "불완전한 요청"});
  }
});

router.post("/signup", async (req, res, next) => {
  console.log(req.body);
  if (req.body.name && req.body.id && req.body.password&&req.body.question&&req.body.answer) {
    const data = await User.findAll({
      where: {
        user_id: req.body.id,
      },
    });

    if (data[0]) {
      console.log("해당 유저가 존재!");
      res.send({ error: "이미 존재하는 이메일" });
    } else {
      const encryptedPassword = bcrypt.hashSync(req.body.password, 10);
      const user = await User.create({
        name: req.body.name,
        user_id: req.body.id,
        password: encryptedPassword,
        question: req.body.question,
        answer: req.body.answer,
      });
      console.log("회원가입 완료");
      //회원가입 완료후 토큰 생성
      const token = jwt.sign(
        {
          name: user.name,
          id: user.id,
        },
        "jwt-secret-key",
        {
          expiresIn: "7d",
        }
      );
      res.json({ token });
    }
  } else {
    res.send({ msg: "불완전한 데이터" });
  }
});

module.exports = router;
