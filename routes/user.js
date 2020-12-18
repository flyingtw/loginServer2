const express = require('express');
const router = express.Router();
const models = require('../models');
const crypto = require('crypto');




// 로그인
router.get('/login', function(req, res, next) {
  let session = req.session;
  console.log(session);

  res.render("user/login", {
    session : session
  });
});

router.post('/login',async function(req,res,next){
  let body = req.body;

  let result = await models.user.findOne({
    where: {
      email : body.useremail
    }
  });

  let dbPassword = result.dataValues.password;
  let inputPassword = body.userpassword;
  let salt = result.dataValues.salt;
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("base64");

  if(dbPassword === hashPassword){
    console.log("비밀번호 일치!");
    req.session.email = body.useremail;
    res.redirect('/user/login');
  }
  else{
    console.log("비밀번호 불일치");
    res.redirect('/user/login');
  }
});

// 로그아웃
router.get('/logout', function(req,res,next){
  req.session.destroy();
  res.clearCookie('sid');

  res.redirect('/');
})




// 회원가입
router.get('/sign_up', function(req, res, next) {
  let session = req.session;

  res.render("user/signup", {
    session : session
  });
});

router.post("/sign_up", function(req,res,next){
  let body = req.body;

  let inputPassword = body.password;
  let salt = Math.round((new Date().valueOf() * Math.random())) + "";
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("base64");

  let result = models.user.create({
    name: body.userName,
    email: body.userEmail,
    password: hashPassword,
    salt: salt
  })
  .then( result => {
    res.redirect("/user/sign_up");
  })
  .catch( err => {
    console.log(err)
  })
})



module.exports = router;
