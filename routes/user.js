const express = require('express');
const router = express.Router();
const models = require('../models');
const crypto = require('crypto');




// 로그인
router.get('/login', function(req, res, next) {
  res.render('user/login');
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
    res.cookie('user', body.useremail,{
      expires: new Date(Date.now() + 900000),
      httponly: true
    });


    res.redirect('/');
  }
  else{
    console.log("비밀번호 불일치");
    res.redirect('/user/login');
  }

})




// 회원가입
router.get('/sign_up', function(req, res, next) {
  res.render('user/signup');
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
