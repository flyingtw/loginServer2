const express = require('express');
const router = express.Router();
const models = require('../models');

const usersController = require('./controllers/users.controllers');



// controller 폴더로 관리
router.get('/login', usersController.loginPage);
router.post('/login', usersController.tryLogin);

router.get('/logout', usersController.tryLogout);

router.get('/sign_up', usersController.signupPage);
router.post('/sign_up', usersController.trySignup);







// 로그인
// 세션사용
/* 
router.get('/login', function(req, res, next) {
  let session = req.session;
  console.log(session);

  res.render("user/login", {
    session : session
  });
});
*/


/*
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
*/

/*
router.get('/login', function(req, res, next) {
  let token = req.cookies.user;
  //console.log(token);

  res.render("user/login", {
    user : token
  });
});
*/



/*
router.post('/login',  async function(req,res,next){
  let body = req.body;
  try{
    let result = await models.user.findOne({
      where: {
        email: body.useremail
      }
    });

    if(result){
      console.log(result.JSON);
      let token = jwt.sign({
        email: result[0]
      },secretObj.secret,{
        expiresIn: '5m'
      });

      res.cookie('user', token);
      res.render('user/login',{
        user: token
      });

    }
    else{
      console.log("db에서 못찾는중");
      res.render('user/login',{
        user: token
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});
*/




/*
// 로그아웃
router.get('/logout', function(req,res,next){
  res.clearCookie('user');
  res.redirect('/');
});
*/

/*
// 회원가입
router.get('/sign_up', function(req, res, next) {
  let token = req.cookies.user;

  res.render("user/signup", {
    user : token
  });
});
*/
/*
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
    res.redirect("/user/login");
  })
  .catch( err => {
    console.log(err)
  })
})
*/


module.exports = router;
