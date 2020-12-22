const express = require('express');
const router = express.Router();
const models = require('../../models');
const crypto = require('crypto');


const jwt = require('jsonwebtoken');
const secretObj = require('../../config/jwt');

exports.loginPage = async function(req,res,next){
    let token = await req.cookies.user;
    res.render("user/login", {
      token : token,
      pass : true
  });
};

exports.tryLogin = async function(req, res, next){
  let body = req.body;
  try{
    let result = await models.user.findOne({
      where: {
        email: body.useremail
      }
    });

    let token;
    let dbPassword = result.dataValues.password;
    let salt = result.dataValues.salt;
    let inputPassword = body.userpassword;
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("base64");


    if(dbPassword === hashPassword){
      // db pw 와 input Pw가 일치하면 이메일로 토큰 생성
      console.log(result.JSON);
        token = jwt.sign({
        email: result.email
      },secretObj.secret,{
        expiresIn: '5m'
      });

      res.cookie('token', token);
      res.render('user/login',{
        token: token,
        pass : true
      });

    }
    else{ // 에러 페이지로 이동 또는 경고창 띄우고 login 화면 redirect
      console.log("db에 일치하는 데이터가 없음");
      res.render('user/login' ,{
        token: token,
        pass : false
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};


exports.tryLogout = async function(req,res,next){
  res.clearCookie('token');
  res.redirect('/');
};


exports.signupPage = async function(req,res,next){
  let token = req.cookies.user;
  res.render("user/signup", {
    token : token
  });
};


exports.trySignup = async function(req,res,next){
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
};