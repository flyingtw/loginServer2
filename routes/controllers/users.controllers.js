const express = require('express');
const router = express.Router();
const models = require('../../models');
const crypto = require('crypto');


const jwt = require('jsonwebtoken');
const secretObj = require('../../config/jwt');

exports.loginPage = async function(req,res,next){
    let token = await req.cookies.user;
    res.render("user/login", {
      token : token
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

    if(result){
      console.log(result.JSON);
      let token = jwt.sign({
        email: result.email
      },secretObj.secret,{
        expiresIn: '5m'
      });

      res.cookie('token', token);
      res.render('user/login',{
        token: token
      });

    }
    else{
      console.log("db에서 못찾는중");
      res.render('user/login',{
        token: token
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